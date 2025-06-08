import { useEffect, useRef } from 'react';

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: number[];
}

function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function pointerPrototype(this: Pointer) {
      this.id = -1;
      this.texcoordX = 0;
      this.texcoordY = 0;
      this.prevTexcoordX = 0;
      this.prevTexcoordY = 0;
      this.deltaX = 0;
      this.deltaY = 0;
      this.down = false;
      this.moved = false;
      this.color = [0, 0, 0];
    }

    let config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    };

    let pointers: Pointer[] = [new (pointerPrototype as any)()];

    const { gl, ext } = getWebGLContext(canvas);
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      let gl = canvas.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          canvas.getContext('webgl', params) ||
          canvas.getContext('experimental-webgl', params);
      let halfFloat: any;
      let supportLinearFiltering: any;
      if (isWebGL2) {
        gl!.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl!.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl!.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl!.getExtension(
          'OES_texture_half_float_linear'
        );
      }
      gl!.clearColor(0.0, 0.0, 0.0, 1.0);
      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : halfFloat && halfFloat.HALF_FLOAT_OES;
      let formatRGBA: any;
      let formatRG: any;
      let formatR: any;

      if (isWebGL2) {
        const gl2 = gl as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl!, gl!.RGBA, gl!.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl!, gl!.RGBA, gl!.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl!, gl!.RGBA, gl!.RGBA, halfFloatTexType);
      }

      return {
        gl: gl!,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        const gl2 = gl as WebGL2RenderingContext;
        switch (internalFormat) {
          case gl2.R16F:
            return getSupportedFormat(gl, gl2.RG16F, gl2.RG, type);
          case gl2.RG16F:
            return getSupportedFormat(gl, gl2.RGBA16F, gl2.RGBA, type);
          default:
            return null;
        }
      }
      return {
        internalFormat,
        format,
      };
    }

    function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        4,
        4,
        0,
        format,
        type,
        null
      );
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    }

    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: { [key: number]: WebGLProgram } = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: { [key: string]: WebGLUniformLocation | null } = {};

      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);
        let program = this.programs[hash];
        if (program == null) {
          let fragmentShader = compileShader(
            gl.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader);
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }

      bind() {
        gl.useProgram(this.activeProgram);
      }
    }

    class Program {
      uniforms: { [key: string]: WebGLUniformLocation | null } = {};
      program: WebGLProgram;

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }

      bind() {
        gl.useProgram(this.program);
      }
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      let program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program: WebGLProgram) {
      let uniforms: { [key: string]: WebGLUniformLocation | null } = {};
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i)!.name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type: number, source: string, keywords?: string[]) {
      source = addKeywords(source, keywords);
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source: string, keywords?: string[]) {
      if (!keywords) return source;
      let keywordsString = '';
      keywords.forEach((keyword) => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `
    );

    const blurVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            float offset = 1.33333333;
            vL = vUv - texelSize * offset;
            vR = vUv + texelSize * offset;
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `
    );

    const blurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        uniform sampler2D uTexture;

        void main () {
            vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
            sum += texture2D(uTexture, vL) * 0.35294117;
            sum += texture2D(uTexture, vR) * 0.35294117;
            gl_FragColor = sum;
        }
    `
    );

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
    `
    );

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
    `
    );

    const colorShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        uniform vec4 color;

        void main () {
            gl_FragColor = color;
        }
    `
    );

    const checkerboardShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float aspectRatio;

        #define SCALE 25.0

        void main () {
            vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));
            float v = mod(uv.x + uv.y, 2.0);
            v = v * 0.1 + 0.8;
            gl_FragColor = vec4(vec3(v), 1.0);
        }
    `
    );

    const displayShaderSource = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        uniform sampler2D uBloom;
        uniform sampler2D uSunrays;
        uniform sampler2D uDithering;
        uniform vec2 ditherScale;
        uniform vec2 texelSize;

        vec3 linearToGamma (vec3 color) {
            color = max(color, vec3(0));
            return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
        }

        void main () {
            vec3 c = texture2D(uTexture, vUv).rgb;

        #ifdef SHADING
            vec3 lc = texture2D(uTexture, vL).rgb;
            vec3 rc = texture2D(uTexture, vR).rgb;
            vec3 tc = texture2D(uTexture, vT).rgb;
            vec3 bc = texture2D(uTexture, vB).rgb;

            float dx = length(rc) - length(lc);
            float dy = length(tc) - length(bc);

            vec3 n = normalize(vec3(dx, dy, length(texelSize)));
            vec3 l = vec3(0.0, 0.0, 1.0);

            float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
            c *= diffuse;
        #endif

        #ifdef BLOOM
            vec3 bloom = texture2D(uBloom, vUv).rgb;
            float noise = texture2D(uDithering, vUv * ditherScale).r;
            noise = noise * 2.0 - 1.0;
            bloom += noise / 255.0;
            bloom = linearToGamma(bloom);
            c += bloom;
        #endif

        #ifdef SUNRAYS
            float sunrays = texture2D(uSunrays, vUv).r;
            c *= sunrays;
        #endif

            gl_FragColor = vec4(c, 1.0);
        }
    `;

    const bloomPrefilterShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform vec3 curve;
        uniform float threshold;

        void main () {
            vec3 c = texture2D(uTexture, vUv).rgb;
            float br = max(c.r, max(c.g, c.b));
            float rq = clamp(br - curve.x, 0.0, curve.y);
            rq = curve.z * rq * rq;
            c *= max(rq, br - threshold) / max(br, 0.0001);
            gl_FragColor = vec4(c, 0.0);
        }
    `
    );

    const bloomBlurShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;

        void main () {
            vec4 sum = vec4(0.0);
            sum += texture2D(uTexture, vL);
            sum += texture2D(uTexture, vR);
            sum += texture2D(uTexture, vT);
            sum += texture2D(uTexture, vB);
            sum *= 0.25;
            gl_FragColor = sum;
        }
    `
    );

    const bloomFinalShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        uniform float intensity;

        void main () {
            vec4 sum = vec4(0.0);
            sum += texture2D(uTexture, vL);
            sum += texture2D(uTexture, vR);
            sum += texture2D(uTexture, vT);
            sum += texture2D(uTexture, vB);
            sum *= 0.25;
            gl_FragColor = sum * intensity;
        }
    `
    );

    const sunraysMaskShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            vec4 c = texture2D(uTexture, vUv);
            float br = max(c.r, max(c.g, c.b));
            c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
            gl_FragColor = c;
        }
    `
    );

    const sunraysShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform float weight;

        #define ITERATIONS 16

        void main () {
            float Density = 0.3;
            float Decay = 0.95;
            float Exposure = 0.7;

            vec2 coord = vUv;
            vec2 dir = vUv - 0.5;

            dir *= 1.0 / float(ITERATIONS) * Density;
            float illuminationDecay = 1.0;

            float color = texture2D(uTexture, vUv).a;

            for (int i = 0; i < ITERATIONS; i++)
            {
                coord -= dir;
                float col = texture2D(uTexture, coord).a;
                color += col * illuminationDecay * weight;
                illuminationDecay *= Decay;
            }

            gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
        }
    `
    );

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
    `
    );

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;

            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
        #ifdef MANUAL_FILTERING
            vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
            vec4 result = bilerp(uSource, coord, dyeTexelSize);
        #else
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
        #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }`,
      ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']
    );

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
    `
    );

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
    `
    );

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
    `
    );

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
    `
    );

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
    `
    );

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl.STATIC_DRAW
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 0, 2, 3]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return (target: WebGLFramebuffer | null, clear = false) => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target);
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    function initFramebuffers() {
      let simRes = getResolution(config.SIM_RESOLUTION);
      let dyeRes = getResolution(config.DYE_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const rg = ext.formatRG;
      const r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      gl.disable(gl.BLEND);

      if (dye == null)
        dye = createDoubleFBO(
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
      else
        dye = resizeDoubleFBO(
          dye,
          dyeRes.width,
          dyeRes.height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );

      if (velocity == null)
        velocity = createDoubleFBO(
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering
        );

      divergence = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      curl = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
      pressure = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST
      );
    }

    function getResolution(resolution: number) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;

      let min = Math.round(resolution);
      let max = Math.round(resolution * aspectRatio);

      if (gl.drawingBufferWidth > gl.drawingBufferHeight)
        return { width: max, height: min };
      else return { width: min, height: max };
    }

    function createFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      gl.activeTexture(gl.TEXTURE0);
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null
      );

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      let texelSizeX = 1.0 / w;
      let texelSizeY = 1.0 / h;

      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(value) {
          fbo1 = value;
        },
        get write() {
          return fbo2;
        },
        set write(value) {
          fbo2 = value;
        },
        swap() {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        },
      };
    }

    function resizeFBO(
      target: any,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      let newFBO = createFBO(w, h, internalFormat, format, type, param);
      copyProgram.bind();
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO.fbo);
      return newFBO;
    }

    function resizeDoubleFBO(
      target: any,
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(
        target.read,
        w,
        h,
        internalFormat,
        format,
        type,
        param
      );
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w;
      target.height = h;
      target.texelSizeX = 1.0 / w;
      target.texelSizeY = 1.0 / h;
      return target;
    }

    function createTextureAsync(url: string) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGB,
        1,
        1,
        0,
        gl.RGB,
        gl.UNSIGNED_BYTE,
        new Uint8Array([255, 255, 255])
      );

      let obj = {
        texture,
        width: 1,
        height: 1,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };

      let image = new Image();
      image.onload = () => {
        obj.width = image.width;
        obj.height = image.height;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          image
        );
      };
      image.src = url;

      return obj;
    }

    function updateKeywords() {
      let displayKeywords: string[] = [];
      if (config.SHADING) displayKeywords.push('SHADING');
      displayMaterial.setKeywords(displayKeywords);
    }

    updateKeywords();
    initFramebuffers();

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;
    let ditheringTexture = createTextureAsync(
      'https://raw.githubusercontent.com/PavelDoGreat/WebGL-Fluid-Simulation/master/LDR_LLL1_0.png'
    );

    const copyProgram = new Program(baseVertexShader, copyShader);
    const clearProgram = new Program(baseVertexShader, clearShader);
    const colorProgram = new Program(baseVertexShader, colorShader);
    const checkerboardProgram = new Program(baseVertexShader, checkerboardShader);
    const displayMaterial = new Material(baseVertexShader, displayShaderSource);
    const splatProgram = new Program(baseVertexShader, splatShader);
    const advectionProgram = new Program(baseVertexShader, advectionShader);
    const divergenceProgram = new Program(baseVertexShader, divergenceShader);
    const curlProgram = new Program(baseVertexShader, curlShader);
    const vorticityProgram = new Program(baseVertexShader, vorticityShader);
    const pressureProgram = new Program(baseVertexShader, pressureShader);
    const gradientSubtractProgram = new Program(
      baseVertexShader,
      gradientSubtractShader
    );

    const bloomPrefilterProgram = new Program(
      baseVertexShader,
      bloomPrefilterShader
    );
    const bloomBlurProgram = new Program(baseVertexShader, bloomBlurShader);
    const bloomFinalProgram = new Program(baseVertexShader, bloomFinalShader);
    const sunraysMaskProgram = new Program(baseVertexShader, sunraysMaskShader);
    const sunraysProgram = new Program(baseVertexShader, sunraysShader);
    const blurProgram = new Program(blurVertexShader, blurShader);

    const dye: any = null;
    const velocity: any = null;
    const divergence: any = null;
    const curl: any = null;
    const pressure: any = null;

    function update() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      if (!config.PAUSED) step(dt);
      render(null);
      requestAnimationFrame(update);
    }

    function calcDeltaTime() {
      let now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      let width = scaleByPixelRatio(canvas.clientWidth);
      let height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    }

    function updateColors(dt: number) {
      if (!config.COLORFUL) return;

      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => {
          p.color = generateColor();
        });
      }
    }

    function applyInputs() {
      if (splatStack.length > 0) multipleSplats(splatStack.pop()!);

      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocity.read.attach(0)
      );
      blit(divergence.fbo);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressure.write.fbo);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressure.read.attach(1)
        );
        blit(pressure.write.fbo);
        pressure.swap();
      }

      gradientSubtractProgram.bind();
      gl.uniform2f(
        gradientSubtractProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.uPressure,
        pressure.read.attach(0)
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.uVelocity,
        velocity.read.attach(1)
      );
      blit(velocity.write.fbo);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY
      );
      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY
        );
      let velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.VELOCITY_DISSIPATION
      );
      blit(velocity.write.fbo);
      velocity.swap();

      if (!ext.supportLinearFiltering)
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dye.texelSizeX,
          dye.texelSizeY
        );
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        config.DENSITY_DISSIPATION
      );
      blit(dye.write.fbo);
      dye.swap();
    }

    function render(target: WebGLFramebuffer | null) {
      if (config.BLOOM) applyBloom(dye.read, bloom);
      if (config.SUNRAYS) {
        applySunrays(dye.read, dye.write, sunrays);
        blur(sunrays, sunraysTemp, 1);
      }

      if (target == null || !config.TRANSPARENT) {
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
      } else {
        gl.disable(gl.BLEND);
      }

      if (!config.TRANSPARENT)
        drawColor(target, normalizeColor(config.BACK_COLOR));
      if (target == null && config.TRANSPARENT) drawCheckerboard(target);
      drawDisplay(target);
    }

    function drawColor(target: WebGLFramebuffer | null, color: number[]) {
      colorProgram.bind();
      gl.uniform4f(
        colorProgram.uniforms.color,
        color[0],
        color[1],
        color[2],
        1
      );
      blit(target);
    }

    function drawCheckerboard(target: WebGLFramebuffer | null) {
      checkerboardProgram.bind();
      gl.uniform1f(
        checkerboardProgram.uniforms.aspectRatio,
        canvas.width / canvas.height
      );
      blit(target);
    }

    function drawDisplay(target: WebGLFramebuffer | null) {
      let width = target == null ? gl.drawingBufferWidth : target.width;
      let height = target == null ? gl.drawingBufferHeight : target.height;

      displayMaterial.bind();
      if (config.SHADING)
        gl.uniform2f(
          displayMaterial.uniforms.texelSize,
          1.0 / width,
          1.0 / height
        );
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
      if (config.BLOOM) {
        gl.uniform1i(displayMaterial.uniforms.uBloom, bloom.attach(1));
        gl.uniform1i(
          displayMaterial.uniforms.uDithering,
          ditheringTexture.attach(2)
        );
        let scale = getTextureScale(ditheringTexture, width, height);
        gl.uniform2f(displayMaterial.uniforms.ditherScale, scale.x, scale.y);
      }
      if (config.SUNRAYS)
        gl.uniform1i(displayMaterial.uniforms.uSunrays, sunrays.attach(3));
      blit(target);
    }

    function applyBloom(source: any, destination: any) {
      if (bloomFramebuffers.length < 2) return;

      let last = destination;

      gl.disable(gl.BLEND);
      bloomPrefilterProgram.bind();
      let knee = config.BLOOM_THRESHOLD * config.BLOOM_SOFT_KNEE + 0.0001;
      let curve0 = config.BLOOM_THRESHOLD - knee;
      let curve1 = knee * 2;
      let curve2 = 0.25 / knee;
      gl.uniform3f(
        bloomPrefilterProgram.uniforms.curve,
        curve0,
        curve1,
        curve2
      );
      gl.uniform1f(
        bloomPrefilterProgram.uniforms.threshold,
        config.BLOOM_THRESHOLD
      );
      gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
      blit(last.fbo);

      bloomBlurProgram.bind();
      for (let i = 0; i < bloomFramebuffers.length; i++) {
        let dest = bloomFramebuffers[i];
        gl.uniform2f(
          bloomBlurProgram.uniforms.texelSize,
          last.texelSizeX,
          last.texelSizeY
        );
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        blit(dest.fbo);
        last = dest;
      }

      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);

      for (let i = bloomFramebuffers.length - 2; i >= 0; i--) {
        let baseTex = bloomFramebuffers[i];
        gl.uniform2f(
          bloomBlurProgram.uniforms.texelSize,
          last.texelSizeX,
          last.texelSizeY
        );
        gl.uniform1i(bloomBlurProgram.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, baseTex.width, baseTex.height);
        blit(baseTex.fbo);
        last = baseTex;
      }

      gl.disable(gl.BLEND);
      bloomFinalProgram.bind();
      gl.uniform2f(
        bloomFinalProgram.uniforms.texelSize,
        last.texelSizeX,
        last.texelSizeY
      );
      gl.uniform1i(bloomFinalProgram.uniforms.uTexture, last.attach(0));
      gl.uniform1f(
        bloomFinalProgram.uniforms.intensity,
        config.BLOOM_INTENSITY
      );
      blit(destination.fbo);
    }

    function applySunrays(source: any, mask: any, destination: any) {
      gl.disable(gl.BLEND);
      sunraysMaskProgram.bind();
      gl.uniform1i(sunraysMaskProgram.uniforms.uTexture, source.attach(0));
      blit(mask.fbo);

      sunraysProgram.bind();
      gl.uniform1f(sunraysProgram.uniforms.weight, config.SUNRAYS_WEIGHT);
      gl.uniform1i(sunraysProgram.uniforms.uTexture, mask.attach(0));
      blit(destination.fbo);
    }

    function blur(target: any, temp: any, iterations: number) {
      blurProgram.bind();
      for (let i = 0; i < iterations; i++) {
        gl.uniform2f(
          blurProgram.uniforms.texelSize,
          target.texelSizeX,
          0.0
        );
        gl.uniform1i(blurProgram.uniforms.uTexture, target.attach(0));
        blit(temp.fbo);

        gl.uniform2f(
          blurProgram.uniforms.texelSize,
          0.0,
          target.texelSizeY
        );
        gl.uniform1i(blurProgram.uniforms.uTexture, temp.attach(0));
        blit(target.fbo);
      }
    }

    function splatPointer(pointer: Pointer) {
      let dx = pointer.deltaX * config.SPLAT_FORCE;
      let dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    }

    function multipleSplats(amount: number) {
      for (let i = 0; i < amount; i++) {
        const color = generateColor();
        color[3] = 1.0;
        const x = Math.random();
        const y = Math.random();
        const dx = 1000 * (Math.random() - 0.5);
        const dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvas.width / canvas.height
      );
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(
        splatProgram.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100.0)
      );
      blit(velocity.write.fbo);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2]);
      blit(dye.write.fbo);
      dye.swap();
    }

    function correctRadius(radius: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) radius *= aspectRatio;
      return radius;
    }

    function generateColor() {
      let c = HSVtoRGB(Math.random(), 1.0, 1.0);
      c[0] *= 0.15;
      c[1] *= 0.15;
      c[2] *= 0.15;
      return c;
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);

      switch (i % 6) {
        case 0:
          (r = v), (g = t), (b = p);
          break;
        case 1:
          (r = q), (g = v), (b = p);
          break;
        case 2:
          (r = p), (g = v), (b = t);
          break;
        case 3:
          (r = p), (g = q), (b = v);
          break;
        case 4:
          (r = t), (g = p), (b = v);
          break;
        case 5:
          (r = v), (g = p), (b = q);
          break;
        default:
          (r = 0), (g = 0), (b = 0);
          break;
      }

      return [r, g, b];
    }

    function normalizeColor(input: { r: number; g: number; b: number }) {
      let output = {
        r: input.r / 255,
        g: input.g / 255,
        b: input.b / 255,
      };
      return [output.r, output.g, output.b];
    }

    function wrap(value: number, min: number, max: number) {
      let range = max - min;
      if (range === 0) return min;
      return ((value - min) % range) + min;
    }

    function getTextureScale(texture: any, width: number, height: number) {
      return {
        x: width / texture.width,
        y: height / texture.height,
      };
    }

    function scaleByPixelRatio(input: number) {
      let pixelRatio = window.devicePixelRatio || 1;
      return Math.floor(input * pixelRatio);
    }

    function hashCode(s: string) {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    let bloom: any = null;
    let sunrays: any = null;
    let sunraysTemp: any = null;
    let bloomFramebuffers: any[] = [];
    let splatStack: number[] = [];

    function initBloomFramebuffers() {
      let res = getResolution(config.BLOOM_RESOLUTION);

      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      bloom = createFBO(
        res.width,
        res.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
      sunrays = createFBO(
        res.width,
        res.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );
      sunraysTemp = createFBO(
        res.width,
        res.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering
      );

      bloomFramebuffers.length = 0;
      for (let i = 0; i < config.BLOOM_ITERATIONS; i++) {
        let width = res.width >> (i + 1);
        let height = res.height >> (i + 1);

        if (width < 2 || height < 2) break;

        let fbo = createFBO(
          width,
          height,
          rgba.internalFormat,
          rgba.format,
          texType,
          filtering
        );
        bloomFramebuffers.push(fbo);
      }
    }

    function updatePointerDownData(pointer: Pointer, id: number, posX: number, posY: number) {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    }

    function updatePointerMoveData(pointer: Pointer, posX: number, posY: number) {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function updatePointerUpData(pointer: Pointer) {
      pointer.down = false;
    }

    function correctDeltaX(delta: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }

    function correctDeltaY(delta: number) {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    function getPointerByID(id: number) {
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].id === id) return pointers[i];
      }
      return null;
    }

    function getPointerIndex(pointer: Pointer) {
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].id === pointer.id) return i;
      }
      return -1;
    }

    function getMousePos(e: MouseEvent) {
      let rect = canvas.getBoundingClientRect();
      return [
        e.clientX - rect.left,
        e.clientY - rect.top
      ];
    }

    function getTouchPos(e: TouchEvent, i: number) {
      let rect = canvas.getBoundingClientRect();
      return [
        e.touches[i].clientX - rect.left,
        e.touches[i].clientY - rect.top
      ];
    }

    function handleMouseDown(e: MouseEvent) {
      let posX = scaleByPixelRatio(getMousePos(e)[0]);
      let posY = scaleByPixelRatio(getMousePos(e)[1]);
      let pointer = pointers[0];
      if (!pointer.down) {
        updatePointerDownData(pointer, -1, posX, posY);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      let pointer = pointers[0];
      if (pointer.down) {
        let posX = scaleByPixelRatio(getMousePos(e)[0]);
        let posY = scaleByPixelRatio(getMousePos(e)[1]);
        updatePointerMoveData(pointer, posX, posY);
      }
    }

    function handleMouseUp() {
      updatePointerUpData(pointers[0]);
    }

    function handleTouchStart(e: TouchEvent) {
      e.preventDefault();
      const touches = e.targetTouches;
      while (touches.length >= pointers.length)
        pointers.push(new (pointerPrototype as any)());
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(getTouchPos(e, i)[0]);
        let posY = scaleByPixelRatio(getTouchPos(e, i)[1]);
        updatePointerDownData(pointers[i + 1], touches[i].identifier, posX, posY);
      }
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        let pointer = pointers[i + 1];
        if (!pointer.down) continue;
        let posX = scaleByPixelRatio(getTouchPos(e, i)[0]);
        let posY = scaleByPixelRatio(getTouchPos(e, i)[1]);
        updatePointerMoveData(pointer, posX, posY);
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      const touches = e.changedTouches;
      for (let i = 0; i < touches.length; i++) {
        let pointer = getPointerByID(touches[i].identifier);
        if (pointer == null) continue;
        updatePointerUpData(pointer);
      }
    }

    function handleMouseWheel(e: WheelEvent) {
      if (e.deltaY > 0) {
        config.SPLAT_RADIUS *= 0.9;
      } else {
        config.SPLAT_RADIUS *= 1.1;
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === ' ') {
        splatStack.push(parseInt((Math.random() * 20).toString()) + 5);
      }
    }

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('touchstart', handleTouchStart as EventListener);
    canvas.addEventListener('touchmove', handleTouchMove as EventListener);
    window.addEventListener('touchend', handleTouchEnd as EventListener);
    window.addEventListener('wheel', handleMouseWheel);
    window.addEventListener('keydown', handleKeyDown);

    initBloomFramebuffers();
    multipleSplats(parseInt((Math.random() * 20).toString()) + 5);

    update();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('touchstart', handleTouchStart as EventListener);
      canvas.removeEventListener('touchmove', handleTouchMove as EventListener);
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
      window.removeEventListener('wheel', handleMouseWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
  ]);

  return (
    <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full">
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen block opacity-30"></canvas>
    </div>
  );
}

export default SplashCursor;
