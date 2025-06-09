
import { useEffect, useRef } from 'react';

interface SplashCursorProps {
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  BACK_COLOR?: { r: number; g: number; b: number };
  TRANSPARENT?: boolean;
}

function SplashCursor({
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  BACK_COLOR = { r: 0, g: 0, b: 0 }, // Changed to black
  TRANSPARENT = true,
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (!gl) {
      console.warn('WebGL not supported, SplashCursor disabled');
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0); // Always transparent

    const splashes: Array<{
      x: number;
      y: number;
      time: number;
      intensity: number;
    }> = [];

    const addSplash = (x: number, y: number) => {
      splashes.push({
        x: x / canvas.width,
        y: 1.0 - (y / canvas.height),
        time: 0,
        intensity: Math.random() * 0.5 + 0.5
      });
      
      if (splashes.length > 10) {
        splashes.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (Math.random() < 0.1) {
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
      
      if (Math.random() < 0.1) {
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

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });

    let animationId: number;
    const animate = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      for (let i = splashes.length - 1; i >= 0; i--) {
        const splash = splashes[i];
        splash.time += 0.016;
        
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
          background: 'transparent' // Always transparent
        }}
      />
    </div>
  );
}

export default SplashCursor;
