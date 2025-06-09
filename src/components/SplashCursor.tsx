
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
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Try to get WebGL context
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      console.warn('WebGL not supported, SplashCursor disabled');
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    console.log('SplashCursor WebGL context initialized successfully');

    // Set up WebGL viewport
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(BACK_COLOR.r, BACK_COLOR.g, BACK_COLOR.b, TRANSPARENT ? 0.0 : 1.0);

    // Simple splash effects
    const splashes: Array<{
      x: number;
      y: number;
      time: number;
      intensity: number;
    }> = [];

    const addSplash = (x: number, y: number) => {
      splashes.push({
        x: x / canvas.width,
        y: 1.0 - (y / canvas.height), // Flip Y coordinate
        time: 0,
        intensity: Math.random() * 0.5 + 0.5
      });
      
      // Limit number of active splashes
      if (splashes.length > 10) {
        splashes.shift();
      }
    };

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add splash on mouse movement
      if (Math.random() < 0.3) { // 30% chance to add splash on move
        addSplash(x, y);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addSplash(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      if (Math.random() < 0.3) {
        addSplash(x, y);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      addSplash(x, y);
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      // Update and remove old splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        splash.time += 0.016; // Assume 60fps
        
        // Remove splash after 2 seconds
        if (splash.time > 2.0) {
          splashes.splice(i, 1);
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      cancelAnimationFrame(animationId);
    };
  }, [SPLAT_RADIUS, SPLAT_FORCE, BACK_COLOR, TRANSPARENT]);

  return (
    <div className="fixed top-0 left-0 z-50 pointer-events-none w-full h-full">
      <canvas 
        ref={canvasRef} 
        id="fluid" 
        className="w-full h-full block pointer-events-auto"
        style={{ 
          background: TRANSPARENT ? 'transparent' : `rgb(${BACK_COLOR.r * 255}, ${BACK_COLOR.g * 255}, ${BACK_COLOR.b * 255})` 
        }}
      />
    </div>
  );
}

export default SplashCursor;
