import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'
import { MdImportExport } from 'react-icons/md'
import ButtonWithDropDown from '../../button-with-drop-down'
import Button, { ui_styles } from '../../ButtonN'
import { useDraggableTableContext } from '../table'
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb'


const TableNavbar = () => {
    const { SelectedItemsActions, pagination, data, currentPage, selectionOptions, selectedItems } = useDraggableTableContext()
  return (
    <>
        {/* Navbar */}
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 p-2 ">
          
          <div className="flex w-fit shrink-0 items-center space-x-2">
            {selectedItems.length > 0 ? (
            <>
              {SelectedItemsActions}
              <ButtonWithDropDown
                  label="Actions"
                  variant="default"
                  size="sm"
                  options={[
                    {
                      name: "Export Data",
                      action: () => {
                        // exportToExcel(populateDatafromIds());
                      },
                      icon: MdImportExport,
                      option_variant: "default",
                    },
                    ...selectionOptions?.map((x) => {
                      return {
                        name: x.name,
                        action: () => {
                          x.action(selectionOptions);
                        },
                        icon: x.icon,
                        option_variant: x.option_variant,
                      };
                    }),
                  ]}
                  postion="left"
                />
              <Button variant="outline" size="sm">
                Selected {selectedItems.length}{" "}
              </Button>
             
            </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Total {data.length}
                </Button>
              </div>
            )}
          </div>
          <div className="w-full   flex justify-end gap-4 items-center">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            {pagination.itemsPerPage * (currentPage - 1) + 1} - {pagination.itemsPerPage * currentPage} of {pagination.totalItems}
          </div>
            <div className="flex items-center gap-2">
            <select className={` px-2  py-0  ${ui_styles.size.sm} ${ui_styles.variant.outline} `} style={{width:'100px'}} value={pagination.itemsPerPage} onChange={(e)=>{
              if (pagination.onPageLimitChange) {
                pagination.onPageLimitChange(Number(e.target.value));
              }
            }}>
                <option value="10">10 Record</option>
                <option value="20">20 Record</option>
                <option value="30">30 Record</option>
                <option value="50">50 Record</option>
                <option value="100">100 Record</option>
              </select>
              <div className='flex items-center '>
                <Button
                  variant={"outline"}
                  size={"iconsm"}
                  className="shrink-0 hidden md:flex items-center justify-center disabled:opacity-50 rounded-r-none focus:ring-0 focus:outline-none"
                  disabled={currentPage === 1}
                  onClick={() => {
                    if (currentPage > 1) {
                      pagination.onPageChange(1);
                    }
                  }}
                  icon={LuChevronFirst}
                />

                <Button
                  variant={"outline"}
                  size={"iconsm"}
                  className="shrink-0 flex items-center justify-center disabled:opacity-50 md:rounded-none"
                  disabled={currentPage === 1}
                  onClick={() => {
                    if (currentPage > 1) {
                      pagination.onPageChange(currentPage - 1);
                    }
                  }}
                  icon={TbChevronLeft}
                  
                />
                <Button
                  className="shrink-0 flex items-center justify-center disabled:opacity-50 md:rounded-none"
                  variant={"outline"}
                  size={"iconsm"}
                  disabled={
                    currentPage ===
                    Math.ceil(pagination.totalItems / pagination.itemsPerPage)
                  }
                  onClick={() => {
                    if (currentPage < Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
                      pagination.onPageChange(currentPage + 1);
                    }
                  }}
                  icon={TbChevronRight}
                />
                <Button
                  className="shrink-0 hidden md:flex items-center justify-center disabled:opacity-50 rounded-l-none focus:ring-0 focus:outline-none"
                  variant={"outline"}
                  size={"iconsm"}
                  disabled={
                    currentPage ===
                    Math.ceil(pagination.totalItems / pagination.itemsPerPage)
                  }
                  onClick={() => {
                    const lastpage = Math.ceil(
                      pagination.totalItems / pagination.itemsPerPage
                    );
                    pagination.onPageChange(lastpage);
                  }}
                  icon={LuChevronLast}
                />
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default TableNavbar