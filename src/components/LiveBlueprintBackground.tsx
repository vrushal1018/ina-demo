'use client';

import React, { useEffect, useRef } from 'react';

interface LiveBlueprintBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  gridOpacity?: number;
  lineColor?: string;
}

export default function LiveBlueprintBackground({
  children,
  className = '',
  gridOpacity = 0.15,
  lineColor = '#2495D3',
}: LiveBlueprintBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Engineering nodes for live background movement
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numNodes = Math.floor((width * height) / 25000);

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Technical Grid
      const gridSize = 50;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = lineColor;
      ctx.globalAlpha = gridOpacity;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Update and Draw Nodes & Connectors
      ctx.globalAlpha = gridOpacity * 1.5;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 120) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = (1 - dist / 120) * gridOpacity * 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Minimalist Sine Wave / Tracer
      ctx.globalAlpha = gridOpacity * 2;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = height * 0.75 + Math.sin(x * 0.003 + time) * 45 + Math.cos(x * 0.005 - time * 0.5) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridOpacity, lineColor]);

  return (
    <div className={`relative min-h-screen w-full overflow-hidden bg-white text-slate-900 ${className}`}>
      {/* Live Animated Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
