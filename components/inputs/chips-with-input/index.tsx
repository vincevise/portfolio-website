 
import Chip from "@/components/chip";
import {
  useEffect,
  useRef,
  useState
} from "react";
import { HiChevronUpDown } from "react-icons/hi2";
  
  type ListI = {
    title: string;
    submenu: string[];
  };
  
  type Props = {
    lists?: ListI[];
  };
  
  const dummylists = [
    {
      title: "PREVIOUS_NODE",
      submenu: [],
    },
    {
      title: "FUNCTION",
      submenu: ["response_agent", "Open AI LLM", "fetch params"],
    },
  ];
  
  const Chips_with_input = ({ lists = dummylists }: Props) => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<{ content: string; id: string | number }[]>([]);
    const [tab, setTab] = useState(lists[0]);
    const [tobeDeleted, setToBEDeleted] = useState<string | number | null>(null);
  
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
  
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  
      if (e.key === "Enter") {
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
      <div ref={containerRef} className="relative" style={{ minHeight: "40px" }}>
        <div
          tabIndex={0}
          onClick={() => setShow(true)}
          className="relative  w-full cursor-default rounded-md   bg-white    h-fit  pl-1 py-1 pr-10 text-left shadow-sm     sm:text-sm border border-gray-300  focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          style={{ minHeight: "40px" }}
        >
          {/* Chips Input */}
          <div className="truncate flex flex-wrap  items-center gap-1">
            {selected.map((submenu) => (
              <Chip
                value={submenu.content}
                key={`chip-key-${submenu.id}`}
                selected={submenu.id === tobeDeleted}
                onClose={() =>
                  setSelected([
                    ...selected.filter((x) => x.id !== submenu.id),
                  ])
                }
              />
                
            ))}
  
            <input
              ref={inputRef}
              type="text"
              className="flex-grow shrink inline-block border-none ring-0 py-1 px-1 text-sm focus:outline-none focus:ring-transparent focus:ring-0 focus:border-transparent"
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
          <div className="w-full h-fit mt-1 rounded-md  space-y-2  shadow-md border absolute bg-white z-20">
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
            <div className="p-2 space-y-1">
              {tab.submenu.map((sub) => {
                return (
                  <button
                    key={sub}
                    onClick={() => handleParameters(sub)}
                    className="flex items-center justify-between hover:ring-1 hover:ring-brand-orange-deski   w-full border text-left py-1 px-2 rounded-sm"
                  >
                    {sub}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Chips_with_input;
  