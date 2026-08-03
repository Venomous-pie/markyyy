'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ImagePositionControlProps {
  src: string;
  position?: string; // format: "X% Y% ZOOM"
  onChange: (pos: string) => void;
  aspectRatio?: string;
}

export default function ImagePositionControl({ 
  src, 
  position = '50% 50% 1', 
  onChange,
  aspectRatio = '16/9'
}: ImagePositionControlProps) {
  const parts = (position || '50% 50% 1').trim().split(' ');
  const [x, setX] = useState(parseFloat(parts[0]) || 50);
  const [y, setY] = useState(parseFloat(parts[1]) || 50);
  const [zoom, setZoom] = useState(parts.length > 2 && !isNaN(parseFloat(parts[2])) ? parseFloat(parts[2]) : 1);
  
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  
  // Use a ref to track immediate state during drag to prevent stale closures
  const currentPos = useRef({ x, y, zoom });

  // Sync state if props change (e.g. initial load)
  useEffect(() => {
    const p = (position || '50% 50% 1').trim().split(' ');
    const initX = parseFloat(p[0]) || 50;
    const initY = parseFloat(p[1]) || 50;
    const initZoom = p.length > 2 && !isNaN(parseFloat(p[2])) ? parseFloat(p[2]) : 1;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setX(initX);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setY(initY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoom(initZoom);
    currentPos.current = { x: initX, y: initY, zoom: initZoom };
  }, [position]);
  
  const update = useCallback((newX: number, newY: number, newZoom: number) => {
    setX(newX);
    setY(newY);
    setZoom(newZoom);
    currentPos.current = { x: newX, y: newY, zoom: newZoom };
    onChange(`${newX.toFixed(2)}% ${newY.toFixed(2)}% ${newZoom.toFixed(2)}`);
  }, [onChange]);
  
  const lastPointer = useRef({ x: 0, y: 0 });

  const startDrag = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setHasMoved(false);
    lastPointer.current = { x: clientX, y: clientY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); 
    startDrag(e.clientX, e.clientY);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  
  const endDrag = () => {
    setIsDragging(false);
    if (!hasMoved) {
      setIsFullscreen(true);
    }
  };

  const handleMouseUp = endDrag;
  const handleTouchEnd = endDrag;
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  const onDragMove = (clientX: number, clientY: number, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!isDragging || !ref.current) return;
    setHasMoved(true);
    
    const deltaX = clientX - lastPointer.current.x;
    const deltaY = clientY - lastPointer.current.y;
    lastPointer.current = { x: clientX, y: clientY };
    
    const rect = ref.current.getBoundingClientRect();
    const moveX = -(deltaX / rect.width) * 200;
    const moveY = -(deltaY / rect.height) * 200;
    
    const newX = Math.max(0, Math.min(100, currentPos.current.x + (moveX / currentPos.current.zoom)));
    const newY = Math.max(0, Math.min(100, currentPos.current.y + (moveY / currentPos.current.zoom)));
    
    update(newX, newY, currentPos.current.zoom);
  };

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    onDragMove(e.clientX, e.clientY, ref);
  };

  const handleTouchMove = (e: React.TouchEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    if (e.touches.length === 1) {
      onDragMove(e.touches[0].clientX, e.touches[0].clientY, ref);
    }
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value);
    update(x, y, newZoom);
  };

  const renderCropArea = (ref: React.RefObject<HTMLDivElement | null>) => (
    <div 
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={(e) => handleMouseMove(e, ref)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={(e) => handleTouchMove(e, ref)}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none'
      }}
      title="Click to expand, drag to pan"
    >
      {/* Background (Dimmed image showing what is cut) */}
      <Image 
        src={src} 
        alt="" 
        fill 
        style={{ 
          objectFit: 'cover', 
          objectPosition: `${x}% ${y}%`,
          transform: `scale(${zoom})`,
          transformOrigin: 'center',
          opacity: 0.25,
          pointerEvents: 'none' 
        }} 
        sizes="(max-width: 1400px) 100vw, 1400px" 
        draggable={false}
      />

      {/* Foreground (Crop Box) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        border: '2px solid rgba(255,255,255,0.9)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.4)',
        borderRadius: '6px',
        pointerEvents: 'none'
      }}>
        <Image 
          src={src} 
          alt="Crop Preview" 
          fill 
          style={{ 
            objectFit: 'cover', 
            objectPosition: `${x}% ${y}%`,
            transform: `scale(${zoom})`,
            transformOrigin: 'center'
          }} 
          sizes="(max-width: 1400px) 100vw, 1400px" 
          draggable={false}
        />
        
        {/* Grid */}
        <div style={{ position: 'absolute', top: '33.33%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', top: '66.66%', left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', left: '33.33%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.2)' }} />
        <div style={{ position: 'absolute', left: '66.66%', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.2)' }} />
      </div>
      
      {/* Expand icon on thumbnail */}
      {!isFullscreen && (
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', padding: '4px', borderRadius: '4px', pointerEvents: 'none', display: 'flex' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ width: '100%', userSelect: 'none' }}>
      
      {/* THUMBNAIL VIEW */}
      <div style={{ width: '100%', aspectRatio }}>
        {renderCropArea(containerRef)}
      </div>
      
      {/* Zoom Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(252,252,254,0.4)', fontFamily: 'var(--mono)' }}>1x</span>
        <input 
          type="range" 
          min="1" 
          max="3" 
          step="0.05" 
          value={zoom} 
          onChange={handleZoomChange}
          style={{ flex: 1, accentColor: 'var(--blue)', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.65rem', color: 'rgba(252,252,254,0.4)', fontFamily: 'var(--mono)' }}>3x</span>
      </div>
      <div style={{ textAlign: 'center', marginTop: '4px' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'rgba(252,252,254,0.3)' }}>
          {x.toFixed(0)}% {y.toFixed(0)}% &times; {zoom.toFixed(1)}
        </span>
      </div>

      {/* FULLSCREEN OVERLAY */}
      {isFullscreen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          overflow: 'hidden'
        }}>
          {/* Close button */}
          <button 
            onClick={() => setIsFullscreen(false)}
            style={{ 
              position: 'absolute', top: 24, right: 24, 
              background: 'rgba(255,255,255,0.1)', 
              border: 'none', color: '#fff', 
              width: '40px', height: '40px', 
              borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem'
            }}
          >
            ✕
          </button>
          
          <div style={{ marginBottom: '16px', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Adjust Crop & Position
          </div>

          <div style={{ 
            width: '100%', 
            maxWidth: '1200px', 
            maxHeight: '75vh',
            aspectRatio,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ width: '100%', height: '100%', maxWidth: `calc(75vh * (${aspectRatio.split('/')[0]} / ${aspectRatio.split('/')[1]}))` }}>
              {renderCropArea(fullscreenContainerRef)}
            </div>
          </div>

          <div style={{ width: '100%', maxWidth: '400px', marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}>1x</span>
              <input 
                type="range" 
                min="1" 
                max="3" 
                step="0.05" 
                value={zoom} 
                onChange={handleZoomChange}
                style={{ flex: 1, accentColor: 'var(--blue)', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}>3x</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
