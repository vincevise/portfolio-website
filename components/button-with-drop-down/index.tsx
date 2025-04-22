/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { GoChevronDown } from 'react-icons/go'
import { IconType } from 'react-icons/lib'
import { UI_SizeType, ui_styles, UI_VariantType } from '../ButtonN'
 

export type ButtonWithDropDownOptionProps = {
  name:string, 
  action:(data:any)=>void,
  icon?:React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>,'symbol'>> | IconType,
  option_variant?:'default' | 'danger' 
}

export interface ButtonWithDropDownProps {
  options:ButtonWithDropDownOptionProps[]; 
  size?:UI_SizeType;
  variant?:UI_VariantType;
  label?:string;
  postion?:'left' | 'right';
}
 

export default function ButtonWithDropDown({
    options, 
    size='md',
    variant='outline',
    label ,
    postion='right'
    
}:ButtonWithDropDownProps) {

  

  return (
       
      <Menu as="div" className="relative    ">
            
            {/* <Button iconRight={} variant={variant} size={size}>
              Actions
            </Button> */}
            <Menu.Button className={`${ui_styles.variant[variant]} ${ui_styles.size[size]}  `} >
                {label}
                <GoChevronDown className={'w-6 h-6'} aria-hidden="true" />
            </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className={`absolute z-[30] ${postion === 'right' ? 'right-0' : 'left-0'}   mt-2 -mr-1 min-w-24 w-fit  origin-top-right rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1`}>
              {options.map((item) => (
                <Menu.Item key={item.name}>
                  {({  }) => (
                    <div
                        onClick={item.action}
                        className={  ` text-gray-700
                            'block px-2 pr-3 py-2 text-xs font-medium whitespace-nowrap rounded flex items-center gap-2 cursor-pointer hover:bg-gray-100 active:bg-gray-20 ${item.option_variant === 'danger' && 'text-red-500'}`}
                    >
                        {item.icon && 
                             <item.icon className='w-5 h-5'/>
                        }
                        {item.name}
                    </div>
                  )}
                </Menu.Item>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
  )
}
