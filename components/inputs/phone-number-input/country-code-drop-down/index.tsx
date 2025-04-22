/* eslint-disable react-hooks/exhaustive-deps */
import { Country, ICountry } from "country-state-city";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FixedSizeList as List } from "react-window";
import CommonPopover from "../../../common-popover";
import { IoCheckmark } from "react-icons/io5";

const DEBOUNCE_DELAY = 300; // Adjust the delay as needed

type Props = {
  initphoneCodeValue: string;
  className: string;
  setPhoneCode: (value: string) => void;
};

const CountryCodeDropdown = ({
  initphoneCodeValue,
  className,
  setPhoneCode,
}: Props) => {
  const [selected, setSelected] = useState<ICountry>(
    Country.getCountryByCode(initphoneCodeValue) ?? Country.getAllCountries()[0]
  );

  useEffect(() => {
    setSelected(
      Country.getCountryByCode(initphoneCodeValue) ??
        Country.getAllCountries()[0]
    );
  }, [initphoneCodeValue]);

  useEffect(() => {
    setPhoneCode(`+${selected.phonecode}`);
  }, [selected]);

  // input state for searching the country code
  const [inputValue, setInputValue] = useState("");

  // for opening the modal

  const timeoutRef = useRef<number | null>(null);

  const [filtered, setFiltered] = useState<ICountry[]>([]);

  useEffect(() => {
    const query = inputValue.trim().toLowerCase();
    const countries = Country.getAllCountries();
    if (countries) {
      setFiltered(() => {
        return query === ""
          ? countries
          : countries.filter(
              (country: ICountry) =>
                country.name.toLowerCase().includes(query) ||
                country.phonecode.toLowerCase().includes(query) ||
                country.isoCode.toLowerCase().includes(query)
            );
      });
    }
  }, [inputValue]);

  const handleSelect = (choice: ICountry) => {
    setSelected(choice);
  };


   

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

  // List Component
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div
      style={style}
      className="hover:bg-gray-100 p-1 cursor-pointer flex items-center justify-between rounded-md px-2"
      onClick={() => handleSelect(filtered[index])}
    >
      <div className="flex items-center divide-x-2">
        <span className="w-16">{filtered[index].phonecode}</span>
        <span className="w-8 text-center">{filtered[index].isoCode}</span>
        <span className="px-2">{filtered[index].name}</span>
      </div>
      {filtered[index].name === selected.name &&
        filtered[index].phonecode === selected.phonecode && (
          <button className="p-1 bg-brand-orange-main rounded-full">
            <IoCheckmark className="w-3 h-3 bg-brand-orange-main text-white rounded-full " />
          </button>
        )}
    </div>
  );

  return (
    <>
      <CommonPopover
        Trigger={
          <input
            className={`ring-transparent cursor-pointer ${className}`}
            style={{ width: "100px" }} 
            value={`${selected.isoCode} ${selected.phonecode}`}
            readOnly
          ></input>
        }
        className="w-96 overflow-y-auto h-fit customscroll p-2"
      >
          <div className="  h-10 pb-1 px-1  w-full  relative flex flex-col">
            <div className="mb-1">
              <div className="flex items-center w-full justify-between pl-0.5 pr-1 py-2">
                <p className="text-base text-gray-400">Search Country....</p>
               
              </div>
              <div className="flex relative">
                <input
                  type="text"
                  className="py-1 pl-2 pr-8 w-full rounded-md border  focus:ring-2 focus:ring-brand-orange-main focus:border-brand-orange-main"
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
      </CommonPopover>
    </>
  );
};

export default CountryCodeDropdown;
