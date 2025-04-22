import React, { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Define the shape of the context value
type ContextmenuType = {
  visible: boolean;
  position: { x: number; y: number };
  menuVisible: boolean;
  setMenuVisible: (visible: boolean) => void;
  triggerContextMenu: (event: MouseEvent) => void;
  menuItems: ReactNode;
  setMenuItems: (items: ReactNode) => void;
};

// Create the context
const Contextmenu = createContext<ContextmenuType | undefined>(undefined);

// Custom hook to use the context
export const useContextmenu = () => {
  const context = useContext(Contextmenu);
  if (!context) {
    // Return default values or handle the absence of the context gracefully
    return {
      visible: false,
      position: { x: 0, y: 0 },
      menuVisible: false,
      setMenuVisible: () => {},
      triggerContextMenu: () => {},
      menuItems: null,
      setMenuItems: () => {},
    } as ContextmenuType;
  }
  return context;
};

// Context provider component
export const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuItems, setMenuItems] = useState<ReactNode>(null);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    const handleContextMenu = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    // document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const triggerContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    setMenuVisible(false); // Close any currently open context menu

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const cursorX = event.clientX;
    const cursorY = event.clientY;
    const menuWidth = 200; // Approximate width of your menu
    const menuHeight = 200; // Approximate height of your menu

    let posX = cursorX;
    let posY = cursorY;

    // Check if the cursor is near the right edge of the screen
    if (cursorX + menuWidth > windowWidth) {
      posX = windowWidth - menuWidth;
    }

    // Check if the cursor is near the bottom edge of the screen
    if (cursorY + menuHeight > windowHeight) {
      posY = windowHeight - menuHeight;
    }

    setPosition({ x: posX, y: posY });
    setMenuVisible(true);
    setVisible(true);
  };

  const contextValue: ContextmenuType = {
    visible,
    position,
    menuVisible,
    setMenuVisible,
    triggerContextMenu,
    menuItems,
    setMenuItems,
  };

  return (
    <Contextmenu.Provider value={contextValue}>
      {children}
      {menuVisible && createPortal(
        <div
          className="min-w-64 max-w-96 h-fit bg-white flex flex-col p-1 rounded-md context-menu"
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            border: '1px solid #ccc',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()}
          ref={divRef}
        >
          {menuItems}
        </div>,
        document.body
      )}
    </Contextmenu.Provider>
  );
};

// ContextMenuTrigger component
type ContextMenuTriggerProps = {
  children: React.ReactNode;
};

export const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({ children }) => {
  const { triggerContextMenu } = useContextmenu();

  const handleContextMenu = (event: React.MouseEvent) => {
    triggerContextMenu(event.nativeEvent);
  };

  return (
    <span onContextMenu={handleContextMenu} className="contents">
      {children}
    </span>
  );
};

// ContextMenuContent component
export const ContextMenuContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setMenuItems } = useContextmenu();

  useEffect(() => {
    setMenuItems(children);
  }, [children, setMenuItems]);

  return null;
};

// ContextMenuItem component
type ContextMenuItemProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

export const ContextMenuItem: React.FC<ContextMenuItemProps> = ({ onClick, children, className }) => {
  const { setMenuVisible } = useContextmenu();

  const handleClick = () => {
    onClick();
    setMenuVisible(false);
  };

  return (
    <div onClick={handleClick} className={`py-1.5 pl-2 pr-4 rounded text-sm hover:bg-gray-200 cursor-default ${className}`}>
      {children}
    </div>
  );
};
