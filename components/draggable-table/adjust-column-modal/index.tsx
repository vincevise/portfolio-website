import Modal from '@/components/ModalN';
import React from 'react';
import { LuSettings2 } from 'react-icons/lu';
import { useDraggableTableContext } from '../table';


const AdjustColumnModal = () => {
    const { 
      columns, 
      showAdjustColumnModal, 
      setShowAdjustColumnModal, 
      manageColumns, 
      setManageColumns, 
      setColOrder
    } = useDraggableTableContext();

  return (
    <>
      {showAdjustColumnModal && (
        <Modal
          open={showAdjustColumnModal}
          setOpenModal={setShowAdjustColumnModal}
          height={500}
          maxwidth="500px"
        >
          <div className="w-full h-full  p-4 pr-6">
            <div className="font-medium text-lg flex items-center gap-3">
              <span className='bg-gray-200 p-1.5 rounded-md'>

              <LuSettings2 className='w-6 h-6'/> 
              </span>
              Adjust Column
            </div>
            <div className="space-y-2 mt-4 ml-2 text-gray-700">
              {columns.map((x) => {
                const exist = manageColumns.find(
                  (y) => y.accessor === x.accessor
                );
                return (
                  <div className="flex items-center justify-between" key={`column_key_${x.accessor} text-gray-400`}>
                    {typeof x.Header === "function"
                      ? React.createElement(x.Header)
                      : x.Header}
                    <input
                      type="checkbox"
                      className=" h-4 w-4 rounded-md border-gray-300 text-main bg-main focus:ring-main sm:left-6 z-[20] accent-main	"
                      checked={exist ? true : false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          const new_columns = [...manageColumns, x];
                          setManageColumns(new_columns);
                          setColOrder(new_columns.map((col, index) => index));
                        } else {
                          const newColumns = manageColumns.filter(
                            (y) => y.accessor !== x.accessor
                          );
                          setManageColumns(newColumns);
                          setColOrder(newColumns.map((col, index) => index));
                        }
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
           
        </Modal>
      )}
    </>
  )
}

export default AdjustColumnModal