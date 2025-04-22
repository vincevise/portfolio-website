 
import Chip from "@/components/chip";
import {
  KeyboardEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { BiChevronDown } from "react-icons/bi";
import { HiChevronUpDown } from "react-icons/hi2";
  
  
  type MenuI = {
    id:string,
      title:string,
      options:string[]
  }
  
  type SelectedI = {
    id:string,
    content:string
  }
  
  type Props = {
    lists?: {
      id: string,
      title:string,
      menus:MenuI[]
    }[]
  };
  
  
  const dummylists2 = [
    {
      id:'1',
      title: "PREVIOUS_NODE",
      menus: [],
    },
    {
      id:'2',
      title: "FUNCTION",
      menus: [
        {
          id:'sdf3',
          title:'response_agent',
          options:['option1', 'option2']
        }, 
        {
          id:'4rf3',
          title:'response_agent',
          options:['option1', 'option2']
        },
        {
          id:'ofgp',
          title:'response_agent',
          options:['option1', 'option2']
        }, 
      ],
    },
  ];
  
  const ChipsInput_Menu_Options = ({ lists = dummylists2 }: Props) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<SelectedI[]>([]);
    const [tab, setTab] = useState(lists[0]);
    const [tobeDeleted, setToBEDeleted] = useState<string | null>(null);
  
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
  
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
  
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (
        inputRef.current &&
        inputRef.current.selectionStart === 0 &&
        e.key === "Backspace"
      ) {
        if (tobeDeleted) {
          setSelected([...selected.filter((x) => x.id !== tobeDeleted)]);
          setToBEDeleted(null);
        } else {
          setToBEDeleted(selected[selected.length - 1].id);
        }
      }
  
      if (e.key === "Enter" && (e.target as HTMLInputElement).value !== '') {
        const uniqueID = Math.floor(Math.random() * 10 ** 6).toString();
        setSelected([
          ...selected,
          {
            id: `chip_${uniqueID}`,
            content: (e.target as HTMLInputElement).value,
          },
        ]);
        (e.target as HTMLInputElement).value = "";
      }
    };
  
    return (
      <div ref={containerRef} className="relative bg-white w-full" style={{ minHeight: "40px" }}>
        <div
          onClick={() => setShow(true)}
          className="relative  w-full cursor-default rounded-md border border-gray-300 bg-white  h-auto min-h-10  pl-2 pr-6 py-1  text-left shadow-sm focus:border-brand-orange-deski focus:outline-none focus:ring-1  focus:ring-brand-orange-deski sm:text-sm "
          style={{ minHeight: "40px" }}
        >
          {/* Chips Input */}
          <div className="  truncate flex flex-wrap  items-center gap-1">
            {selected.map((submenu) => (
              <Chip
                key={`chip-key-${submenu.id}`}
                selected={submenu.id === tobeDeleted}
                onClose={() =>
                  setSelected([
                    ...selected.filter((x) => x.id !== submenu.id),
                  ])
                }
                value={submenu.content}
              />
                 
            ))}
  
            <input
              ref={inputRef}
              type="text"
              className="flex-grow shrink inline-block border border-transparent py-1 px-1 text-sm focus:outline-none focus:ring-transparent focus:ring-0 focus:border-transparent"
              onKeyDown={handleKeyDown}
            />
          </div>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </div>
        {show && (
          <div className="w-full h-fit mt-1 rounded-md bg-white space-y-2 z-[10] shadow-md border absolute ">
            <div className="w-full flex items-center  text-sm p-1">
              {lists.map((menu) => {
                return (
                  <button
                    key={menu.title}
                    className={`${
                      menu.title === tab.title
                        ? "border-brand-orange-deski text-brand-orange-deski"
                        : "border-transparent"
                    }  hover:text-brand-orange-deski py-2 px-4 text-base border-b-2 font-medium transition-all `}
                    onClick={() => setTab(menu)}
                  >
                    {menu.title}
                  </button>
                );
              })}
            </div>
            <div className="p-2 space-y-2">
              {tab.menus.map((menu) => {
                return (
                  <Menu 
                    menu={menu} 
                    selected={selected} 
                    setSelected={setSelected} 
                    key={`menu_key_${menu.id}`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ChipsInput_Menu_Options;
  
  
  
  type MenuPropsI = {
    menu: MenuI,
    selected:SelectedI[],
    setSelected:(val:SelectedI[])=>void
  }
  
  const Menu = ({menu, selected, setSelected}:MenuPropsI) => {
    const [show, setShow] = useState(false)
    console.log(menu, 'menu')
    const handleParameters = (para: string) => {
      const uniqueID = Math.floor(Math.random() * 10 ** 6).toString();
      setSelected([
        ...selected,
        {
          id: `chip_${uniqueID}`,
          content: para,
        },
      ]);
    };
    return(
        <button onClick={()=>setShow(!show)} className="border w-full p-2  rounded-md hover:ring-2    hover:ring-brand-orange-deski focus:ring-2 ">
          <div className="flex items-center justify-between px-2">
            <span className="">{menu.title}</span>
            <BiChevronDown className={`w-5 h-5 ${show ? 'rotate-180' : 'rotate-0'}`}/>
          </div>
          {
            show && 
            <div className=" pb-1 pt-2 space-y-1">
                {menu.options.map((x)=>{
                  return(
                    <button key={x} className="block border   w-full py-1 px-2 text-sm rounded-md text-left hover:bg-gray-50" onClick={() => handleParameters(x)}>
                      {x}
                    </button>
                  )
                })}
            </div>
          }
        </button>
    )
  }
  