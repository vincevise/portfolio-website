 
import Chip from "@/components/chip";
import {
  useEffect,
  useRef,
  useState,
} from "react";
  
 export  type ListI = {
    id: string;
    value: string;
  };
  
  type Props = {
    val:ListI[]
    setVal:(val:ListI[])=>void;
    className?:string;
    onCurrentValueChange?:(val:string)=>void;
  };
  
  
 


  const ChipsInputWithoutDropDown = ({
    setVal, val, className, onCurrentValueChange 
  }: Props) => {
    const [tobeDeleted, setToBEDeleted] = useState<string | null>(null);
  
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('')
  
   
  
 

    useEffect(()=>{
       if(onCurrentValueChange) onCurrentValueChange(inputValue)
    },[inputValue])
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        inputRef.current &&
        inputRef.current.selectionStart === 0 &&
        e.key === "Backspace"
      ) {
        
        if (tobeDeleted) {
          setVal([...val.filter((x) => x.id !== tobeDeleted)]);
          setToBEDeleted(null);
        } else {
          setToBEDeleted(val[val.length - 1].id);
        }
      }else{
        if (tobeDeleted) setToBEDeleted(null)
        
      }
  
      if (e.key === "Enter") {
        const uniqueID = Math.floor(Math.random() * 10 ** 6).toString();
        setVal([
          ...val,
          {
            id: `chip_${uniqueID}`,
            value: inputValue,
          },
        ]);
        // e.target.value = "";
        setInputValue('')
      }
    };
  
    return (
      <div ref={containerRef} className="relative w-full"  >
        <div
          tabIndex={1}
          onClick={() =>{   inputRef.current?.focus()}}
          className={`relative  w-full cursor-default rounded-md  bg-white  h-auto min-h-10  px-1 py-1  flex flex-wrap items-center   text-left shadow-sm   sm:text-sm border border-gray-300  focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${className}`}
        >
          {/* Chips Input */}
          <div className="  truncate flex flex-wrap  items-center gap-0.5">
            {val.map((submenu) => (
               <Chip
                key={submenu.id}
                value={submenu.value}
                onClose={() =>{
                  setVal([
                    ...val.filter((x) => x.id !== submenu.id),
                  ])
                }}
                selected={submenu.id === tobeDeleted}
               />  
            ))}
  
            <input
              ref={inputRef}
              type="text"
              className="py-0 pl-1 text-sm rounded-full border-none w-full max-w-full focus:outline-none focus:ring-0"
              value={inputValue}
              onKeyDown={handleKeyDown}
              onChange={(e)=>{setInputValue(e.target.value)}} 
            />
          </div>
        
        </div>
       
      </div>
    );
  };
  
  export default ChipsInputWithoutDropDown;
  