import React from 'react'
import { useDraggableTableContext } from '../table'


const ActionMenu = ( ) => {
    const { rowActions, actionMenuPostion, actionMenuSelect, actionMenuRef} = useDraggableTableContext()
  return (
    <>
        {rowActions && actionMenuSelect && (
        <div
        style={{
          top: actionMenuPostion.y,
          left: actionMenuPostion.x,
        }}
        className="absolute bg-white rounded drop-shadow-md w-40 max-h-64 py-1 border border-gray-200"
        ref={actionMenuRef}
      >
        {rowActions?.map((x) => {
          return (
            <div
              key={`row_action_key_${x.name}`}
              onClick={() => {
                x.action(actionMenuSelect)
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

export default ActionMenu