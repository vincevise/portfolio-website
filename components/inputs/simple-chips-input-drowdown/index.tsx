import Chip from "@/components/chip";
import { useEffect, useRef, useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";

interface IList {

  id: string,
  value: string,
  label: string
}
type Props = {
  list?: IList[],
};





const cities = 
    [
        {
          "id": "1",
          "value": "Monday",
          "label": "Monday"
        },
        {
          "id": "2",
          "value": "Tuesday",
          "label": "Tuesday"
        },
        {
          "id": "3",
          "value": "Wednesday",
          "label": "Wednesday"
        },
        {
          "id": "4",
          "value": "Thursday",
          "label": "Thursday"
        },
        {
          "id": "5",
          "value": "Friday",
          "label": "Friday"
        },
        {
          "id": "6",
          "value": "Saturday",
          "label": "Saturday"
        },
        {
          "id": "7",
          "value": "Sunday",
          "label": "Sunday"
        }
      ]


export default function SimpleChipsInputDropdown({ list=cities }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [show, setShow] = useState(false);
 

  const timeoutRef = useRef<number | null>(null);

 

  const handleSelect = (choice: string) => {
    console.log(choice, 'choice')
    const doesExist = selected.find((x) => x === choice);
    if (doesExist) {
      setSelected(selected.filter((x) => x !== choice))
    } else {
      setSelected([...selected, choice])
    }
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


   

  useEffect(() => {
    // Cleanup the timeout when the component unmounts
    const timeoutId = timeoutRef.current;
    return () => {
      clearTimeout(timeoutId as number);
    };
  }, []);


  return (
    <>
      <div className="relative w-full  " ref={containerRef}>
        <button
          className=" block w-full rounded-md border-gray-300 border px-1 py-1 focus:border-brand-orange-main focus:ring-brand-orange-main sm:text-sm text-left ring-2 ring-transparent cursor-pointer    focus:border-brand-orange-main focus:ring-brand-orange-main  "
          onClick={() => setShow(!show)}
          style={{ minHeight: '40px' }}
        >
          <div className="truncate flex flex-wrap gap-1 ">
            {selected.map((x, ind) => {
              return (
                <Chip
                  key={`${x}-option-${ind}`}
                  onClick={() => setShow(show)}
                  value={x}
                  onClose={()=>{
                    setSelected([...selected.filter((select) => (select !== x))])
                  }} 
                />
                  
              );
            })}
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </button>

        {show && (
          <div className="absolute z-10 mt-1   w-full  rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm   flex flex-col">
            
            <div className="overflow-auto max-h-60 customscroll pr-1 ">
              { list.map((choice: IList, newInd: number) => {
                return (
                   
                  <button
                    key={`option-key-${choice.id}-${newInd}`}
                    className={
                      "relative text-gray-900 select-none py-2 w-full rounded-md px-3   hover:bg-gray-100 cursor-pointer"
                    }
                    onClick={() => {
                      handleSelect(choice.value)
                    }}
                  >
                    <div className="flex items-center gap-2 w-full justify-between cursor-pointer">
                      <span className={"block truncate"}>{choice.label}
                      </span>
                      {selected.find((x) => x === choice.value) && <button className="p-0.5 rounded-full bg-indigo-500"><IoCheckmark className="w-3 h-3 text-white" /></button>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
