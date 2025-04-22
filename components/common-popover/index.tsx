import React from "react";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  Trigger: ReactNode;
  className?: string; 
}

export default function CommonPopover({ children, Trigger, className, }: Props) {

  const [show, setShow] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CSSProperties>({});

  useEffect(() => {
    if (show && divRef.current && popoverRef.current) {
      const divRect = divRef.current.getBoundingClientRect();
      const popoverRect = popoverRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newPosition: CSSProperties = { 
        top: divRect.bottom + scrollTop,
      }; 

      // Adjust if popover goes beyond the right edge of the viewport
      if (divRect.left + popoverRect.width > windowWidth) {
        newPosition.right = windowWidth - scrollLeft - divRect.right ; // 10px padding from the edge
      }

      if(divRect.left + popoverRect.width < windowWidth){
        newPosition.left = divRect.left + scrollLeft;
      }

      // Adjust if popover goes beyond the bottom edge of the viewport
      if (divRect.bottom + popoverRect.height > windowHeight) {
        newPosition.top = divRect.top + scrollTop - popoverRect.height - 16; // 10px padding from the edge
      }

      setPosition(newPosition);
    }
  }, [show, children]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
          divRef.current && !divRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <div className="" ref={divRef} onClick={() => setShow(!show)}>
        {Trigger}
      </div>
      {show &&
        <>
        {createPortal(
          <div 
            className={`absolute mt-2 rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 min-w-fit focus:outline-none w-64 z-[9999] 
             ${show ? 'block' : 'hidden'}
              ${className}
            `} 
            ref={popoverRef}
            style={position}
          >
            {children}
          </div>
        , document.body)}
        </>
      }
    </>
  );
}