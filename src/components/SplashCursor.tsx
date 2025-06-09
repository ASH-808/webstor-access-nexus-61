
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

    function pointerPrototype(this: any) {
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

    let pointers = [new (pointerPrototype as any)()];

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      
      let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
      let isWebGL2 = false;

      // Try WebGL2 first
      const gl2Context = canvas.getContext('webgl2', params);
      if (gl2Context && gl2Context instanceof WebGL2RenderingContext) {
        gl = gl2Context;
        isWebGL2 = true;
      } else {
        // Fallback to WebGL1
        const gl1Context = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
        if (gl1Context && (gl1Context instanceof WebGLRenderingContext)) {
          gl = gl1Context;
          isWebGL2 = false;
        }
      }
      
      if (!gl) {
        return { gl: null, ext: {}, isWebGL2: false };
      }

      let halfFloat: any;
      let supportLinearFiltering: any;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }
      
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
        const gl1 = gl as WebGLRenderingContext;
        formatRGBA = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
        isWebGL2,
      };
    }

    function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if (gl instanceof WebGL2RenderingContext) {
          switch (internalFormat) {
            case gl.R16F:
              return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
            case gl.RG16F:
              return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
            default:
              return null;
          }
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

    const { gl, ext, isWebGL2 } = getWebGLContext(canvas);
    if (!gl) {
      console.warn('WebGL not supported, SplashCursor disabled');
      return;
    }
    
    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
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

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
      let program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.trace(gl.getProgramInfoLog(program));
      return program;
    }

    function getUniforms(program: WebGLProgram): { [key: string]: WebGLUniformLocation | null } {
      let uniforms: { [key: string]: WebGLUniformLocation | null } = {};
      let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        let uniformName = gl.getActiveUniform(program, i)!.name;
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type: number, source: string, keywords?: string[]): WebGLShader {
      source = addKeywords(source, keywords);
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.trace(gl.getShaderInfoLog(shader));
      return shader;
    }

    function addKeywords(source: string, keywords?: string[]): string {
      if (!keywords) return source;
      let keywordsString = '';
      keywords.forEach((keyword) => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    function hashCode(s: string): number {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    // Simplified shader creation with basic error handling
    let baseVertexShader: WebGLShader;

    try {
      baseVertexShader = compileShader(
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

      console.log('SplashCursor WebGL context initialized successfully');

    } catch (error) {
      console.warn('Failed to initialize SplashCursor shaders:', error);
      return;
    }

    // Simplified event handlers for now
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      console.log('Mouse down at:', x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Simple fluid effect would go here
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
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
      <canvas ref={canvasRef} id="fluid" className="w-screen h-screen block"></canvas>
    </div>
  );
}

export default SplashCursor;
