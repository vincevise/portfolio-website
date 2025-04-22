'use client'
import ChipsInput_Menu_Options from '@/components/inputs/chips-input-menu-options'
import ChipsInputSearch from '@/components/inputs/chips-input-search'
import ChipsInputWithoutDropDown, { ListI } from '@/components/inputs/chips-input-without-dropdown'
import Chips_with_input from '@/components/inputs/chips-with-input'
import ChipsWithInputSearch from '@/components/inputs/chips-with-input-search'
import ChipsWithInputSearchColor, { TagsI } from '@/components/inputs/chips-with-input-search-color'
import InputSearch from '@/components/inputs/input-search'
import PhoneNumberInput from '@/components/inputs/phone-number-input/number-input'
import SimpleChipsInputDropdown from '@/components/inputs/simple-chips-input-drowdown'
import ItemContainer from '@/components/item-container'
import { useState } from 'react'



const Page = () => {
  const [chipsInputValue, setChipsInputValue] = useState<ListI[]>([]);
  const [chipsWithInputSearch, setChipsWithInputSearch] = useState('');
  const [chipsWithInputSearchColor, setChipsWithInputSearchColor] = useState<TagsI[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  

  return (
    <div className='px-10 lg:px-0 space-y-4 mt-12 py-8'>
        <div className=' w-full px-4   max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-9 xl:grid-cols-12'>
          <ItemContainer   >
            <div className='p-4 w-full'>
              <ChipsInputSearch />
            </div>

          </ItemContainer>
          <ItemContainer>
            <div className='p-4 w-full'>
            <ChipsInputWithoutDropDown 
                    val={chipsInputValue} 
                    setVal={(val:ListI[])=>{
                      setChipsInputValue(val)
                    }} 
                    
                  />
            </div>
          </ItemContainer>
          <ItemContainer>
            <div className='p-4 w-full'>
            <ChipsWithInputSearch 
                  state={chipsWithInputSearch}
                  setState={(val:string)=>{
                    setChipsWithInputSearch(val)
                  }}
                  list={[
                    {
                      id:'1',
                      label:'Apple',
                      value:'apple'
                    },
                    {
                      id:'2',
                      label:'Banana',
                      value:'banana'
                    },
                    {
                      id:'3',
                      label:'Cherry',
                      value:'cherry'
                    }
                  ]}
                  
                />
            </div>
          </ItemContainer>
             
           
           <ItemContainer>
            <div className='w-full p-4'>
            <ChipsWithInputSearchColor
                val={chipsWithInputSearchColor}
                setVal={setChipsWithInputSearchColor}
                />
            </div>
           </ItemContainer>
            <ItemContainer>
                <div className={'w-full p-4'}>

                <InputSearch
                  value={inputValue}
                  setValue={setInputValue}
                  placeholder='Search'
                  searchOptions={[
                    'Apple',
                    'Banana',
                    'Cherry',
                    'Date',
                    'Eggplant',
                    'Zucchini',]} 
                />
                </div>

            </ItemContainer>
            <ItemContainer>

                <div className={'w-full p-4'}>

                <PhoneNumberInput
                  state={phonenumber}
                  setState={setPhoneNumber}
                  setPhoneCode={(val:string)=>{
                    console.log(val)
                  }} 
                />
                </div>

            </ItemContainer>
            <ItemContainer>
                <div className={'w-full p-4'}>

                  <Chips_with_input/>
              </div>
            </ItemContainer>
            <ItemContainer>
                <div className={'w-full p-4'}>

                  <SimpleChipsInputDropdown/>

              </div>
            </ItemContainer>
            <ItemContainer>

              <div className={'w-full p-4'}>

                <ChipsInput_Menu_Options/>
              </div>
            </ItemContainer>
            
        </div>
    </div>
  )
}

export default Page