/* eslint-disable react-hooks/exhaustive-deps */
import { Country, ICountry } from "country-state-city";
import { ChangeEvent, useEffect, useState } from "react";
import CountryCodeDropdown from "../country-code-drop-down";


type PropsI = {
  state: string;
  setState: (value: string) => void;
  setPhoneCode: (value: string) => void
  className?: string
  placeholder?: string;
  initphoneCodeValue?:string
};

export default function PhoneNumberInput({
  state,
  setState,
  setPhoneCode,
  className = 'block w-full rounded-md border-gray-300 border px-2 py-2 focus:border-brand-orange-main focus:ring-brand-orange-main sm:text-sm text-left ring-2 ring-transparent cursor-pointer    focus:border-brand-orange-main focus:ring-brand-orange-main  ',
  placeholder = "9999-999999",
  initphoneCodeValue = "IN"
}: PropsI) {
  const [selected, setSelected] = useState<ICountry>(
    Country.getCountryByCode(initphoneCodeValue) ?? Country.getAllCountries()[0]
  );

  useEffect(() => {
    setSelected(Country.getCountryByCode(initphoneCodeValue) ?? Country.getAllCountries()[0])
  },[initphoneCodeValue])

  useEffect(() => {
    setPhoneCode(`+${selected.phonecode}`)
  }, [selected])

 
  const handleStateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  return (
    <div className="relative w-full" >
      <div className={`relative w-full rounded-md  flex items-center gap-2
        
      `}>
        <CountryCodeDropdown
          className={className}
          initphoneCodeValue={initphoneCodeValue}
          setPhoneCode={setPhoneCode}
        />
        
        <input
          type="number"
          name="phone-number"
          id="phone-number"
          min={0}
          className={className}
          placeholder={placeholder}
          value={state}
          onChange={handleStateChange}
        />
      </div>

    </div>
  );
}
