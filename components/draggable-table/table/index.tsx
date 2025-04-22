'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BsFillPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { LuSettings2 } from "react-icons/lu";
import { useInView } from "react-intersection-observer";
import { Column, Row, useTable } from "react-table";
import { ButtonWithDropDownOptionProps } from "../../button-with-drop-down";
import Button from "../../ButtonN";
 
import ActionMenu from "../action-menu";
import AdjustColumnModal from "../adjust-column-modal";
import DraggableHeader from "../draggable-header";
import DraggableTableContextMenu from "../draggable-table-context-menu";
import TableNavbar from "../table-navbar";

export type filterType = {
  sort?: {
      keys: string[];
      order: "asc" | "desc";
  };
  setSort?: (val: any) => void;
  search?: {
      key: string;
      query: string;
  };
  setSearch?: (val: any) => void;
  search_keys?: string[];
} | undefined


interface DraggableTableContextProps extends DraggableTableProps {
  // context menu states
  contextMenuSelect: any;
  setContextMenuSelect: Dispatch<SetStateAction<any>>;

  // action menu states
  actionMenuPostion: { x: number; y: number };
  setActionMenuPosition: Dispatch<SetStateAction<{ x: number; y: number }>>;
  actionMenuSelect: any;
  setActionMenuSelect: Dispatch<SetStateAction<any>>;
  actionMenuRef: React.RefObject<HTMLDivElement>;

  // selected items states 
  contextMenuPosition: { x: number; y: number }; 
  setContextMenuPosition:(val: { x: number; y: number }) => void;
  rowContextRef: React.RefObject<HTMLDivElement>;
  actionButonRefs: React.RefObject<any>;

  // adjust column states
  showAdjustColumnModal: boolean;
  setShowAdjustColumnModal: Dispatch<SetStateAction<boolean>>;
  manageColumns: Column<any>[];
  setManageColumns: Dispatch<SetStateAction<Column<any>[]>>;
  colOrder: number[];
  setColOrder: Dispatch<SetStateAction<number[]>>;

  selectedItems: string[];
  setSelectedItems: Dispatch<SetStateAction<string[]>>;

}

const DraggableTableContext = createContext<
  DraggableTableContextProps | undefined
>(undefined);

export const useDraggableTableContext = () => {
  const context = useContext(DraggableTableContext);
  if (!context) {
    throw new Error(
      "useDraggableTableContext must be used within a DraggableTableProvider"
    );
  }
  return context;
};
 

const actionsColumnWidth = "45px";
interface DraggableTableProps {
  columns: Column<any>[];
  data: any[];
  rowActions: {
    name: string;
    action: (item: any) => void;
    icon?:
      | React.ForwardRefExoticComponent<
          Omit<React.SVGProps<SVGSVGElement>, "symbol">
        >
      | IconType;
  }[];
  pagination: {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    onPageLimitChange?: (itemsPerPage: number) => void;
  };
  selectionOptions: ButtonWithDropDownOptionProps[];
  onRowDoubleClick?: (item: any) => void;
  isLoading: boolean;
  currentPage: number;
  filter?: filterType;
  onContextMenuSelect?: (item: any | null) => void;
  rowContextActions?: {
    name: string;
    icon: IconType;
    action: (item: any) => void;
  }[];
  SelectedItemsActions?: ReactNode;
  sort?:{key:string; order: "desc" | "asc"};
  setSort?: Dispatch<SetStateAction<{key:string; order: "desc" | "asc"}>>;
  disableColumnDrag?: boolean;
  headerIcons?:{
    accessor: string;
    icon: IconType;
  }[];
  Title?:string
}

const DraggableTable: FC<DraggableTableProps> = (props) => {
  const {
    columns,
    data,
    rowActions,
    onRowDoubleClick, 
    Title='Table UI'
  } = props;


  // context menu states
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [contextMenuSelect, setContextMenuSelect] = useState<any>(null);
  const rowContextRef = useRef<HTMLDivElement>(null);

  // action menu states 
  const [actionMenuPostion, setActionMenuPosition] = useState({x:0, y:0})
  const [actionMenuSelect, setActionMenuSelect] = useState<any>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);
  const actionButonRefs = useRef<any>({}); 
  const setRefs = (ref: any, id: string) => {
    if (ref) {
      actionButonRefs.current[id] = ref;
    }
  };

  const [showAdjustColumnModal, setShowAdjustColumnModal] = useState(false);
  const [manageColumns, setManageColumns] = useState(columns);

  // Draggable coloumn states
  const [colOrder, setColOrder] = useState(columns.map((col, index) => index));
  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...colOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, removed);
    setColOrder(newOrder);
  };

  const orderedColumns = useMemo(
    () => colOrder.map((index) => manageColumns[index]),
    [colOrder, manageColumns]
  );


  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,  } =
    useTable({ columns: orderedColumns, data });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        rowContextRef.current &&
        !rowContextRef.current.contains(e.target as Node)
      ) {
        setContextMenuSelect(null);
      } 
      
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(e.target as Node) &&
        ( 
        (actionMenuSelect && actionButonRefs.current[actionMenuSelect._id] &&
        !actionButonRefs.current[actionMenuSelect._id].contains(e.target as Node)))
      ) {
        setActionMenuSelect(null);
      }
 
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [actionMenuSelect]);


  // infinite scroll
  const [visibleData, setVisibleData] = useState<Row<any>[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setVisibleData((prevData) => [
        ...prevData,
        ...rows.slice(prevData.length, prevData.length + 20),
      ]);
    }
  }, [inView, rows]);

  useEffect(() => {
    setVisibleData(rows.slice(0, 20));
  }, [rows]);

  

   

   
   


 
  return (
    <DraggableTableContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        actionButonRefs,
        actionMenuRef,
        rowContextRef,
        actionMenuPostion,
        setActionMenuPosition,
        actionMenuSelect,
        setActionMenuSelect,
        contextMenuSelect,
        setContextMenuSelect,
        manageColumns,
        setManageColumns,
        colOrder,
        setColOrder,
        showAdjustColumnModal,
        setShowAdjustColumnModal,
        contextMenuPosition,
        setContextMenuPosition, 
        ...props
      }}
    >
    <>
      <div className="relative overflow-hidden w-full h-full border-2 border-gray-200 rounded-md ">
        {/* Navbar */}
        <div className="p-2 mb-4 flex items-center justify-between ">
          <div className="flex items-center space-x-3">
            <div className="w-[44px] h-[44px] p-2 rounded-lg bg-gray-200 flex items-center justify-center">
              <BsFillPersonFill className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-800 ">
              {Title}
              </h1>
              <p className="text-xs text-gray-600">
                List of all the items
              </p>
            </div>
          </div>
        </div>

        <TableNavbar/>
        <div className=" h-full overflow-auto pb-[50px] w-full  relative" >
          <DndProvider backend={HTML5Backend}>
            <table
              className="  min-w-full     border-b      relative w-full"
              {...getTableProps()}
            >
              <thead className="border-b    sticky top-0 z-[20]">
                {headerGroups.map((headerGroup) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <tr
                      className="divide-x divide-gray-300  "
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      <th
                        scope="col"
                        className="sticky inline-flex justify-center left-0 z-[30]   items-center  bg-gray-200  min-h-[40px]   w-[45px]"
                      >
                        <input
                          className=" h-4 w-4 rounded-md border-gray-300 text-main bg-main focus:ring-main sm:left-6 z-[20] accent-main	"
                          type="checkbox"
                          checked={
                            selectedItems.length === data.length &&
                            data.length > 0
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(
                                data.map((item) => item._id as string)
                              );
                            } else {
                              setSelectedItems([]);
                            }
                          }}
                        />
                      </th>
                      {headerGroup.headers.map((column, index) => (
                        <DraggableHeader
                          key={column.id}
                          column={column}
                          index={index}
                          moveColumn={moveColumn}
                          disableColumnDrag={props.disableColumnDrag}
                          icon={props.headerIcons?.find((x) => x.accessor === column.id)?.icon}
                        />
                      ))}
                      <th
                        scope="col"
                        className="min-h-[40px] text-center sticky right-0  bg-slate-200 text-xs font-semibold text-gray-900 drop-shadow "
                        style={{
                          minWidth: actionsColumnWidth,
                          width: actionsColumnWidth,
                        }}
                      >
                        <Button
                          tooltiplabel="Adjust Column"
                          onClick={() => {
                            setShowAdjustColumnModal(true);
                            // setOpenManageColumns(!openManageColumns)
                          }}
                          size="iconxs"
                          icon={LuSettings2}
                        />
                      </th>
                    </tr>
                  );
                })}
              </thead>
              <tbody
                className="relative divide-y  divide-gray-200 "
                {...getTableBodyProps()}
              >
                {visibleData.map((row) => {
                  prepareRow(row);
                  const is_selected = selectedItems.includes(row.original?._id as string) ? true : false;
                  return (
                    <>
                      <tr
                        className={`relative divide-x divide-gray-200 ${((contextMenuSelect?._id || actionMenuSelect?._id) === row.original._id) || is_selected ? 'bg-gray-100' : ''}`}
                        {...row.getRowProps()}
                        onDoubleClick={() => {
                          if (onRowDoubleClick) {
                            onRowDoubleClick(row.original);
                          }
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          const left = e.clientX;
                          const top = e.clientY;
                           
                          setContextMenuSelect(row.original);
                          setActionMenuSelect(null)
                          if (left + 208 > window.innerWidth) {
                            setContextMenuPosition({ x: left - 208, y: top });
                          } else if (top + 256 > window.innerHeight) {
                            setContextMenuPosition({ x: left, y: top - 256 });
                          } else {
                            setContextMenuPosition({ x: left, y: top });
                          }
                        }}
                      >
                        <td
                          className={`sticky left-0 bg-white  w-[45px] drop-shadow     cusrsor-pointer	min-h-[40px]   `}
                        >
                          <span className="w-full h-full  min-h-[40px] flex items-center justify-center">
                            <input
                              type="checkbox"
                              className="  cusrsor-pointer   h-4 w-4 rounded-md border-gray-300 text-main focus:ring-main  accent-main "
                              checked={selectedItems.includes(
                                row.original._id as string
                              )}
                              onChange={(e) => {
                                //   handleCheckboxChange(
                                //     item_id as string
                                //   );
                                if (e.target.checked) {
                                  setSelectedItems([
                                    ...selectedItems,
                                    row.original._id as string,
                                  ]);
                                } else {
                                  setSelectedItems(
                                    selectedItems.filter(
                                      (x) => x !== (row.original._id as string)
                                    )
                                  );
                                }
                              }}
                            />
                          </span>
                        </td>
                        {row.cells.map((cell) => (
                          // eslint-disable-next-line react/jsx-key
                          <td
                            className="py-1 text-sm font-medium text-gray-600 px-4 min-w-48 whitespace-nowrap"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                        <td
                          className={`sticky right-0 bg-white  w-[45px] drop-shadow      cusrsor-pointer   align-middle 	min-h-[40px]  `}
                        >
                          <span className="w-full h-full  min-h-[40px] flex items-center justify-center">
                          <button
                            ref={(ref)=>setRefs(ref, row.original._id)}
                            className="  rounded-md   p-1 hover:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            onClick={(e)=>{
                              setActionMenuSelect(row.original); 
                              const rect = (e.target as HTMLElement).getBoundingClientRect();
                              const left = rect.left ;
                              const top = rect.top + rect.height;
                              setActionMenuPosition(row.original);
                              if (left + 160 > window.innerWidth) {
                                setActionMenuPosition({ x: left - 160, y: top });
                              } else if (top + 256 > window.innerHeight) {
                                setActionMenuPosition({ x: left, y: top - 256 });
                              } else {
                                setActionMenuPosition({ x: left, y: top });
                              }
                            }}
                          >
                                  <BsThreeDotsVertical className="w-4 h-4 pointer-events-none" />

                                </button> 
                          </span>
                        </td>
                      </tr>
                    </>
                  );
                })}
                 {visibleData.length !== rows.length && 
                    <tr ref={ref} className="skelton-loading h-12 opacity-50">
                      <td colSpan={columns.length   + (rowActions ? 1 : 0)} className="text-center py-4 skelton-loading">
                        {visibleData.length < rows.length && ""}
                      </td>
                    </tr>
                    }
              </tbody>
            </table>
          </DndProvider>
        </div>
      </div>

      <ActionMenu/> 
      <DraggableTableContextMenu/> 
      <AdjustColumnModal/>
    </>
    </DraggableTableContext.Provider>
  );
};

export default DraggableTable;
