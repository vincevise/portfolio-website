import { Country, ICountry } from "country-state-city";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

const DEBOUNCE_DELAY = 300; // Adjust the delay as needed

type Props = {
  state: string[];
  setState: (val: string[]) => void;
};

export default function ChipsInputSearchDropDown({ state, setState }: Props) {
  const [selected, setSelected] = useState<ICountry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null | number>(null);
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const selectedCountries = Country.getAllCountries().filter(country => state.includes(country.name));
    setSelected(selectedCountries);
  }, [state]);

  // Debouncing input change
  useEffect(() => {
    if(timeoutRef.current){

      // Clear any existing timeout to debounce the input
      clearTimeout(timeoutRef.current);
  
      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        const query = inputValue.trim().toLowerCase();
        const countries = Country.getAllCountries();
        const filtered = countries.filter(country => country.name.toLowerCase().includes(query));
        setFiltered(filtered);
      }, DEBOUNCE_DELAY);
  
      // Cleanup function to clear the timeout when the component unmounts or before the next effect runs
      return () => clearTimeout(timeoutRef.current as number);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && event.target && !dropdownRef.current.contains(event.target as Node)) {
        if (show) setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]); // Consider including 'show' in the dependency array if its changes are relevant


  const [filtered, setFiltered] = useState<ICountry[]>(Country.getAllCountries());


  const handleSelect = (choice: ICountry) => {
    const isSelected = selected.some(country => country.isoCode === choice.isoCode);
    const newSelected = isSelected ? selected.filter(country => country.isoCode !== choice.isoCode) : [...selected, choice];
    setSelected(newSelected);
    setState(newSelected.map(country => country.name));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      <div className="relative ">
        <div
          className="relative w-full cursor-default rounded-md border border-gray-300 bg-white p-1 pr-10 text-left shadow-sm focus:border-brand-orange-main focus:outline-none focus:ring-1 focus:ring-brand-orange-main sm:text-sm h-10 ring-2"
          onClick={() => setShow(true)}
          style={{ minHeight: "40px" }}
        >
          <div className="truncate flex flex-wrap gap-1  ">
            {selected.map((x) => (
              <div
                className="border flex w-fit py-1 pl-2 pr-1 bg-gray-50 rounded-md gap-1 items-center"
                key={x.isoCode}
                onClick={() => setShow(show)}
              >
                {x.name}
                <button
                  className="w-fit hover:bg-gray-200 active:bg-gray-300 rounded-full p-0.5"
                  onClick={() =>
                    setSelected([
                      ...selected.filter(
                        (select) => select.isoCode !== x.isoCode
                      ),
                    ])
                  }
                >
                  <AiOutlineClose className="w-4 h-4 text-black" />
                </button>
              </div>
            ))}
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiOutlineChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </div>

        {show && (
          <div className="absolute z-10 mt-1 w-[350px] rounded-md bg-white p-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm flex flex-col" ref={dropdownRef}>
            <div className="h-10 pb-1 px-1 w-full relative flex flex-col">
              <div className="mb-1">
                <div className="flex items-center w-full justify-between pl-0.5 pr-1 py-2">
                  <p className="text-base text-gray-400">Search Country...</p>
                  <button onClick={() => setShow(false)}>
                    <AiOutlineClose className="w-5 h-5 text-gray-400 hover:text-black" />
                  </button>
                </div>
                <div className="flex relative">
                  <input
                    type="text"
                    className="py-1 pl-2 pr-8 w-full rounded-md border focus:ring-2 focus:ring-brand-orange-main focus:border-brand-orange-main"
                    onChange={handleChange}
                  />
                  <BiSearch className="text-gray-600 absolute w-5 h-5 inset-y-0 my-auto right-2 " />
                </div>
              </div>
            </div>

            <div className="mt-10 h-64 overflow-y-scroll">
              {filtered.map((country, index) => (
                <div key={index} className="hover:bg-gray-100 p-1 cursor-pointer flex items-center justify-between rounded-md px-2 space-x-1" onClick={() => handleSelect(country)}>
                  <span className="flex gap-2 space-x-2">{country.name}</span>
                  {selected.find((c) => c.isoCode === country.isoCode) && (
                    <button className="p-1 bg-brand-orange-main rounded-full">
                      <AiOutlineClose className="w-3 h-3 bg-brand-orange-main text-white rounded-full " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
