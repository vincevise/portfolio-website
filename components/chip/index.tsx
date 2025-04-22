import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  value: string;
  onClose: () => void;
  onClick?: () => void;
  selected?: boolean;
  color?: string;
};

const Chip = ({ value, onClose, onClick, selected = false, color }: Props) => {
  // Determine background color based on props
  let background = selected ? '#c7d2fe' : 'white';
  let textColor = 'text-black';
  let closeIconColor = 'text-black';
  
  // If custom color is provided, use it and ensure text is readable
  if (color) {
    background =  color;
    textColor = 'text-white';
    closeIconColor = 'text-white';
  }

  return (
    <div
      className={`
        flex w-fit p-0.5 pl-2 rounded-full gap-2 text-sm items-center border
        ${color ? 'border-transparent' : 'border-gray-300'}
        shadow
      `}
      style={{
        backgroundColor: background,
        opacity: (color && selected) ? 0.5 : 1
      }}
      onClick={onClick}
    >
      <span className={textColor}>{value}</span>
      <button
        className={`w-fit rounded-full p-1 ${color ? 'hover:bg-white/30 active:bg-white/50' : 'hover:bg-gray-200 active:bg-gray-300'}`}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering onClick of the parent div
          onClose();
        }}
      >
        <AiOutlineClose className={`${closeIconColor} w-[13px] h-[13px]`} />
      </button>
    </div>
  );
};

export default Chip;