/* eslint-disable react-hooks/exhaustive-deps */
import Chip from '@/components/chip';
import { createContext, CSSProperties, Dispatch, KeyboardEvent, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { HiOutlineChevronUpDown } from 'react-icons/hi2';
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

export interface TagsI {
  label: string;
  color: string;
};

type Props = {
  val: TagsI[],
  setVal: (val: TagsI[]) => void,
  position?: 'top' | 'bottom',
  disabled?: boolean,
  options?: TagsI[],
  label?: string
};

const default_tags = [
  { label: "JUNK", color: "#3C5B6F" },
  { label: "to be contacted", color: "#9A3B3B" },
  { label: "attention needed", color: "#FFA732" },
  { label: "bad chat", color: "#EF4040" },
  { label: "stopped AI", color: "#B70404" },
  { label: "good chat", color: "#A7D397" },
];

const colors = ['', '#C9C0D3', "#DDBEA9", "#BD7975", "#FF914D", "#42E6BF", "#97A0B2"];

interface ColorContextType {
  inputValue: string;
  setContent: Dispatch<SetStateAction<TagsI[]>>;
  openColorMenu: boolean;
  setOpenColorMenu: Dispatch<SetStateAction<boolean>>;
  content: TagsI[];
  setInputValue: Dispatch<SetStateAction<string>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  val: TagsI[];
  setVal: (arg: TagsI[]) => void;
  setRefs: (ref: HTMLDivElement | HTMLInputElement | null) => void;
}

const defaultContextValue: ColorContextType = {
  setInputValue: () => { },
  inputValue: "",
  setContent: () => { },
  openColorMenu: false,
  setOpenColorMenu: () => { },
  content: [],
  color: '',
  setColor: () => { },
  val: [],
  setVal: () => { },
  setRefs: () => { },
};

const ColorContext = createContext<ColorContextType>(defaultContextValue);

export default function ChipsWithInputSearchColor({
  val,
  setVal,
  disabled,
  options = default_tags,
  label = 'Add Tags...'
}: Props) {

   



 
  const [content, setContent] = useState<TagsI[]>([...options, ...val]);
  const [inputValue, setInputValue] = useState('');
  const [openColorMenu, setOpenColorMenu] = useState(false);
  const [color, setColor] = useState(colors[0]);
  const [toBeDeleted, setToBeDeleted] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const refs = useRef<(HTMLDivElement | HTMLInputElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [dropwDownPosition, setDropDownPosition] = useState<CSSProperties>({ top: 0, left: 0 });

  const setRefs = (ref: HTMLDivElement | HTMLInputElement | null) => {
    if (ref && !refs.current.includes(ref)) {
      refs.current.push(ref);
    }
  };

  const filtered = useMemo(() => {
    if (content) {
      const query = inputValue.trim().toLowerCase();
      return query === '' ? content : content.filter((city) => city.label.toLowerCase().includes(query));
    }
  }, [inputValue]);

  const handleSelect = (choice: TagsI) => {
    const city = val.find((x) => x.label === choice.label);
    if (city) {
      setVal([...val.filter((x) => x.label !== choice.label)]);
    } else {
      setVal([...val, choice]);
    }
  };

  const updatePosition = () => {
    if (dropdownRef.current && menuRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const popoverRect = menuRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const newPosition:CSSProperties = {
        left: rect.left + scrollLeft,
        top: rect.top + rect.height + scrollTop + 6,
        width: rect.width
      };

      // Adjust if popover goes beyond the bottom edge of the viewport
      if (rect.bottom + popoverRect.height > viewportHeight) {
        newPosition.top = rect.top + scrollTop - popoverRect.height - 10; // 10px padding from the edge
      }

      setDropDownPosition(newPosition);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (refs.current.every(ref => ref && !ref.contains(event.target as Node)) && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', updatePosition);
    };
  }, [dropdownRef, menuRef]);
 

  useEffect(() => {
    updatePosition();
  }, [menuRef, dropdownRef, show, val]); 
  
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (inputRef.current && e.key === 'Enter') {
      setVal([...val, { label: inputValue, color }]);
      setInputValue('');
    }
    if (
      inputRef.current &&
      inputRef.current.selectionStart === 0 &&
      e.key === "Backspace"
    ) {
      if (toBeDeleted) {
        setVal([...val.filter((x) => x.label !== toBeDeleted)]);
        setToBeDeleted(null);
      } else {
        if (val.length > 0) setToBeDeleted(val[val.length - 1].label);
      }
    } else if (e.key !== 'Backspace') {
      setToBeDeleted(null);
    }
  };

  return (
    <>
      <ColorContext.Provider value={{ inputValue, content, openColorMenu, setOpenColorMenu, setContent, setInputValue, color, setColor, val, setVal, setRefs }}>
        <div className="relative w-full text-xs" ref={setRefs}>
          <div
            className="relative flex w-full cursor-default rounded-md border border-gray-300 bg-white h-fit pl-1 py-1 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onClick={() => { if (!disabled) setShow(true); inputRef.current?.focus() }}
            style={{ minHeight: '40px' }}
            ref={dropdownRef}
          >
            <div className="truncate flex flex-wrap gap-1">
              {val && val.map((x) => {
                return (
                  <Chip 
                    key={`chip-key-${x.label}`} 
                    onClose={() => setVal([...val.filter((select) => (select.label !== x.label))])}
                    value={x.label}
                    selected={x.label === toBeDeleted}
                    color={x.color}
                  />
                  // <div
                  //   className={`border flex w-fit pl-2 bg-gray-200 pr-1 py-1 rounded-md gap-1 text-sm items-center ${x.label === toBeDeleted && 'opacity-50'}`}
                  //   key={`${x.label}`}
                  //   onClick={() => setShow(show)}
                  //   style={{ background: x.color }}
                  // >
                  //   <span className="flex text-white font-medium items-center">
                  //     {x.label}
                  //   </span>
                  //   <button
                  //     className="w-fit hover:bg-white/50 active:bg-gray-300 rounded-full p-0.5"
                  //     onClick={() => setVal([...val.filter((select) => (select.label !== x.label))])}
                  //   >
                  //     <AiOutlineClose className="w-4 h-4 text-white" />
                  //   </button>
                  // </div>
                )
              })}
              <input
                type="text"
                className="py-1 pl-1 text-sm w-20 rounded-md border-none focus:outline-none focus:ring-0"
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleKeyDown}
                ref={inputRef}
                placeholder={label}
                disabled={disabled}
              />
            </div>
            <button className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineChevronUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </button>
          </div>

          {show && ReactDOM.createPortal(
            <div className={`absolute w-full z-[20] 
              ${dropwDownPosition.top === 0 && 'opacity-0'}
            
            `}
              style={dropwDownPosition}
              ref={menuRef}
            >
              <div className="w-full rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
                <div className="overflow-auto max-h-60 customscroll   text-sm">
                  {filtered && filtered.map((choice: TagsI) => (
                    <button
                      key={`option-key-${choice.label}`}
                      className="relative text-gray-900 select-none py-2 w-full rounded-md px-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelect(choice)}
                    >
                      <div className="flex items-center gap-2 w-full cursor-pointer relative">
                        <span className="w-4 h-4 bg-gray-200 shrink-0 rounded-full" style={{ background: choice.color }}></span>
                        <div className="flex items-center justify-between w-full">
                          <span className="block truncate">{choice.label}</span>
                          {val.find((x) => x.label === choice.label) && <span className="p-0.5 rounded-full bg-indigo-500"><IoCheckmark className="w-3 h-3 text-white" /></span>}
                        </div>
                      </div>
                    </button>
                  ))}
                  <ColorButton />
                </div>
              </div>
              {openColorMenu && <ColorMenu />}
            </div>,
            document.body
          )}
        </div>
      </ColorContext.Provider>
    </>
  );
}

const ColorMenu = () => {
  const { setColor, setOpenColorMenu, setRefs } = useContext(ColorContext);

  return (
    <div className="w-[154px] p-2 absolute -bottom-16 left-4 flex flex-wrap items-center gap-2 bg-white drop-shadow-md border rounded-md" ref={setRefs}>
      {colors.map((x) => (
        <button key={`colors_key_${x}`} className="w-6 h-6 rounded-full border ring ring-white hover:ring-gray-100 focus:ring-gray-300" onClick={() => { setColor(x); setOpenColorMenu(false) }} style={{ background: x }}></button>
      ))}
    </div>
  );
}

const ColorButton = () => {
  const { inputValue, color, content, setRefs, openColorMenu, setOpenColorMenu, setContent, setInputValue, val, setVal } = useContext(ColorContext);

  return (
    <>
      {inputValue.trim().length > 0 && !content.find((x) => x.label.toLowerCase() === inputValue.toLowerCase()) &&
        <div id="color-button" className="text-gray-900 select-none w-full rounded-md px-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between relative" ref={setRefs}>
          <div className="bg-gray-100 border rounded-full">
            <button className="flex items-center gap-2 p-1" onClick={() => setOpenColorMenu(!openColorMenu)}>
              <span className="w-4 h-4 rounded-full border border-gray-500" style={{ background: color }}></span>
              <IoChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button className="w-full p-1 py-2 text-center"
            onClick={() => {
              const newtag = { label: inputValue.trim(), color };
              setInputValue('');
              setContent([...content, newtag]);
              setVal([...val, newtag]);
              setOpenColorMenu(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const newtag = { label: inputValue.trim(), color };
                setInputValue('');
                setContent([...content, newtag]);
                setVal([...val, newtag]);
                setOpenColorMenu(false);
              }
            }}
          >
            Create<strong>{`"{${inputValue}}"`}</strong>
          </button>
        </div>
      }
    </>
  );
}
