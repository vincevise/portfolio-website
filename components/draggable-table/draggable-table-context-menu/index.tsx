import React from 'react'
import { useDraggableTableContext } from '../table';


const DraggableTableContextMenu = ( ) => {
    const { rowContextActions, contextMenuSelect, contextMenuPosition ,rowContextRef } = useDraggableTableContext();
  return (
    <>
        {rowContextActions && contextMenuSelect && (
        <div
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
          className="absolute bg-gray-50 drop-shadow-md w-52 max-h-64 py-1"
          ref={rowContextRef}
        >
          {rowContextActions?.map((x) => {
            return (
              <div
                key={`row_action_key_${x.name}`}
                onClick={() => {
                  x.action(contextMenuSelect)
                }}
                className="bg-gray-50  p-1 px-2 text-sm hover:bg-gray-200 cursor-pointer"
              >
                {x.name}
              </div>
            );
          })}
        </div>
      )}
    </>
  )
}

export default DraggableTableContextMenu