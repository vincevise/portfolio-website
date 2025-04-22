import { ChangeEvent, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
 
const handleStyle = { left: 10 };
 
export default function TextUpdaterNode() {
  const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className='border rounded-sm border-gray-800 p-2 w-[300px] h-[200px] bg-white' >
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
        <button className='' onClick={()=>console.log('clock')}>Add node</button>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
    </>
  );
}