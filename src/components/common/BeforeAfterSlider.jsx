import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  title,
  height = '280px'
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className="ba-slider-container"
      style={{ height }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After image (background) */}
      <img
        src={afterImage}
        alt={`${title} - Keyingi holati`}
        className="ba-image"
      />
      <span className="ba-badge ba-badge-after">Keyin (Natija)</span>

      {/* Before image (clipped overlay) */}
      <div
        className="ba-image-before"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Oldingi holati`}
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
        <span className="ba-badge ba-badge-before">Oldin (Boshlang'ich)</span>
      </div>

      {/* Divider line & handle */}
      <div
        className="ba-slider-divider"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="ba-slider-handle" title="Surish orqali taqqoslang">
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  );
}
