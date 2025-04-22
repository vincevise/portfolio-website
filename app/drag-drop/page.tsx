'use client'
import React, { useState, useEffect, useRef } from 'react';

interface Shape {
  id: number;
  x: number;
  y: number;
  color: string;
}

const shapesData: Shape[] = [
  { id: 1, x: 50, y: 50, color: 'red' },
  { id: 2, x: 150, y: 50, color: 'blue' },
  { id: 3, x: 250, y: 50, color: 'green' },
];

const detectCollision = (shape1: Shape, shape2: Shape) => {
  const dx = shape1.x - shape2.x;
  const dy = shape1.y - shape2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < 50; // Assuming each shape is 50x50
};

const deflectShapes = (shape1: Shape, shape2: Shape) => {
  const angle = Math.atan2(shape2.y - shape1.y, shape2.x - shape1.x);
  const speed = 5; // Speed of deflection
  return [
    {
      ...shape1,
      x: shape1.x - speed * Math.cos(angle),
      y: shape1.y - speed * Math.sin(angle),
    },
    {
      ...shape2,
      x: shape2.x + speed * Math.cos(angle),
      y: shape2.y + speed * Math.sin(angle),
    },
  ];
};

const DragDropPage: React.FC = () => {
  const [shapes, setShapes] = useState<Shape[]>(shapesData);
  const [dragging, setDragging] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes((prevShapes) => {
        const newShapes = prevShapes.map((shape) => {
          const containerHeight = containerRef.current?.clientHeight || 0;
          const newY = shape.y + 5; // Increase the increment value to make the fall faster
          return {
            ...shape,
            y: newY + 50 > containerHeight ? containerHeight - 50 : newY,
          };
        });

        for (let i = 0; i < newShapes.length; i++) {
          for (let j = i + 1; j < newShapes.length; j++) {
            if (detectCollision(newShapes[i], newShapes[j])) {
              const [deflectedShape1, deflectedShape2] = deflectShapes(newShapes[i], newShapes[j]);
              newShapes[i] = deflectedShape1;
              newShapes[j] = deflectedShape2;
            }
          }
        }

        return newShapes;
      });
    }, 16); // Keep the interval the same for smooth animation

    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (id: number) => {
    setDragging(id);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging !== null) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (containerRect) {
        setShapes((prevShapes) =>
          prevShapes.map((shape) =>
            shape.id === dragging
              ? {
                  ...shape,
                  x: e.clientX - containerRect.left,
                  y: e.clientY - containerRect.top,
                }
              : shape
          )
        );
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid black',
      }}
    >
      {shapes.map((shape) => (
        <div
          key={shape.id}
          onMouseDown={() => handleMouseDown(shape.id)}
          style={{
            width: 50,
            height: 50,
            backgroundColor: shape.color,
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            cursor: 'grab',
          }}
        />
      ))}
    </div>
  );
};

export default DragDropPage;