'use client'
import Chip from "@/components/chip";
import { City, Country, ICity, State } from "country-state-city";
import {
  ChangeEvent,
  CSSProperties,
  useEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";
import { FixedSizeList as List } from "react-window";



const DEBOUNCE_DELAY = 300; // Adjust the delay as needed

// const cityList =

export default function ChipsInputSearch() {

  const [selected, setSelected] = useState<ICity[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const [filtered, setFiltered] = useState<ICity[]>([]);
  const [menuRefPosition, setMenuRefPosition] = useState<CSSProperties>({})

 
  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    const citiess = City.getCitiesOfCountry("IN");
    if (citiess) {
      setFiltered(() => {
        return query === ""
          ? citiess
          : citiess.filter((city: ICity) =>
            city.name.toLowerCase().includes(query)
          );
      });
    }

  }, [inputValue]);

  const handleSelect = (choice: ICity) => {
    const city = selected.find((x) => x.name === choice.name);
    if (city) {
      setSelected([...selected.filter((x) => x.name !== choice.name)]);
    } else {
      setSelected([...selected, choice]);
    }
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleDebouncedChange = (value: string) => {
    setInputValue(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    clearTimeout(timeoutRef.current as number); // Clear any existing timeout
    timeoutRef.current = setTimeout(
      () => handleDebouncedChange(query),
      DEBOUNCE_DELAY
    ) as unknown as number;
  };

  useEffect(() => {
    // Cleanup the timeout when the component unmounts
    return () => {
      clearTimeout(timeoutRef.current as number);
    };
  }, []);

  const calculatePosition = () => {
    if (!containerRef.current) return;

    const buttonRect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Calculate initial position
    let top = buttonRect.top + buttonRect.height + window.scrollY + 5;
    let left = buttonRect.left + window.scrollX ;

    // Check if dropdown would go off the bottom of the screen
    if (menuRef.current) {
      const dropdownHeight = menuRef.current.offsetHeight;
      if (top + dropdownHeight > windowHeight + window.scrollY) {
        const diff = top + dropdownHeight - (windowHeight + window.scrollY);
        top = buttonRect.top - diff - 10;
      }
    }

    // Check if dropdown would go off the right of the screen
    if (menuRef.current) {
      const dropdownWidth = menuRef.current.offsetWidth;
      const spaceOnRight = windowWidth - buttonRect.left;
      const spaceOnLeft = buttonRect.left;

      // If there's not enough space on the right and more space on the left
      if (spaceOnRight < dropdownWidth && spaceOnLeft > spaceOnRight) {
        // Position dropdown to the left of the button
        left = buttonRect.left + window.scrollX - dropdownWidth;
      } else if (left + dropdownWidth > windowWidth + window.scrollX) {
        // If there's not enough space on either side, position below
        left = windowWidth + window.scrollX - dropdownWidth;
      }
    }

    setMenuRefPosition({ top, left });
  };
  

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    calculatePosition()

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);


  // List Component
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div
      key={`row-key-${filtered[index].name}`}
      style={style}
      className="hover:bg-gray-100 p-1 cursor-pointer flex items-center justify-between rounded-md px-2 space-x-1 w-full "
      onClick={() => handleSelect(filtered[index])}
    >
      <span className="flex gap-2 space-x-2">
        {filtered[index].name}
        {",  "}
        {
          State.getStateByCodeAndCountry(
            filtered[index].stateCode,
            filtered[index].countryCode
          )?.name
        }
        {", "}
        {Country.getCountryByCode(filtered[index].countryCode)?.name}
      </span>

      {selected.find((city) => city.name === filtered[index].name) && (
        <button className="p-1 bg-brand-orange-main rounded-full">
          <IoCheckmark  className="w-3 h-3 bg-brand-orange-main text-white rounded-full " />
        </button>
      )}
    </div>
  );
  return (
    <>
      <div className="relative w-full" ref={containerRef}>
        <div
          tabIndex={0}
          className={`relative w-full cursor-default rounded-md  bg-white p-1  pr-10 text-left border border-gray-300  focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm    `}
          onClick={() => setShow(true)}
          style={{ minHeight: "40px" }}
        >
          <div className="  truncate flex flex-wrap gap-1 ">
            {selected.map((x) => {
              return (
                <Chip
                  onClick={() => setShow(show)}
                  key={`${x.latitude}${x.longitude}${x.name}`}
                  value={x.name}
                  onClose={()=>{
                    setSelected([
                      ...selected.filter(
                        (select) =>
                          select.name !== x.name ||
                          select.stateCode !== x.stateCode
                      ),
                    ])
                  }}
                />
                   
              );
            })}
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiOutlineChevronUpDown 
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </div>

        {show && createPortal(
          <div
            style={menuRefPosition} 
            ref={menuRef} 
            className={`absolute z-[40] mt-1   w-[350px]  rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm   flex flex-col
              ${menuRefPosition.toString() === '{}' && 'opacity-0 pointer-events-none' }
            `}>
            <div className="  h-10 pb-1 px-1  w-full  relative flex flex-col">
              <div className="mb-1">
                <div className="flex items-center w-full justify-between pl-0.5 pr-1 py-2">
                  <p className="text-base text-gray-400">Search City....</p>
                  <button onClick={() => setShow(false)}>
                    <AiOutlineClose  className="w-5 h-5 text-gray-400 hover:text-black" />
                  </button>
                </div>
                <div className="flex relative">
                  <input
                    type="text"
                    className="py-1 pl-2 pr-8 w-full rounded-md border  focus:ring-2 focus:ring-brand-main focus:border-brand-main"
                    onChange={handleChange}
                  />{" "}
                  <BiSearch className="text-gray-600 absolute w-5 h-5 inset-y-0 my-auto right-2 " />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <List
                className="overflow-y-auto customscroll"
                height={150}
                itemCount={filtered.length}
                itemSize={35}
                width={330}
              >
                {Row}
              </List>
            </div>
          </div>
        , document.body )}
      </div>
    </>
  );
}
