import { Handle, MarkerType, NodeProps, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { BsFillLightbulbFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { CustomNodeType, useLayoutedElements } from '../Mainflow';
import NodeHeader from '../NodeTitle';


function UseCaseNode({ id, isConnectable }: NodeProps) {

  const {getLayoutedElements} = useLayoutedElements()
  const {   getEdges, getNodes, setNodes, setEdges } = useReactFlow();
  const [hasChild, setHasChild] = useState(false);

  useEffect(() => {
    const edges = getEdges();
    const childEdges = edges.filter(edge => edge.source === id);
    setHasChild(childEdges.length > 0);
  }, [id, getEdges(), getNodes()]);

  

  const nodes = getNodes();
  const edges = getEdges();

  const handleAddNode = () => {
    const newnode_id = uuidv4();
    const newNode = {
      id: `${newnode_id}`,
      data: { label: 'New Node' },
      position: { x: 0, y: 0 }, // Temporary position
      type: CustomNodeType.AGENT_NODE, // Make sure this type is defined in your nodeTypes
      draggable:false
    };

    const newEdge = {
      id: `e-${id}-${newNode.id}`,
      source: id,
      target: newNode.id,
      type:'custom-edge',
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#00002A',
      },
      style: {
        strokeWidth: 2,
        stroke: '#00002A',
      },
    };

    const newNodes = [...nodes, newNode];
    const newEdges = [...edges, newEdge];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    setHasChild(true);
  };

  const handleStyle = { width: '8px', height: '8px', background: 'white', border: '1px solid black' }

  return (
    <div className="text-updater-node border bg-gray-100 p-1 " style={{ borderRadius: '4px', border: '1px solid black'  , width: '200px', height: '68px' }}>
     
      <div className='w-full space-y-0.5 pr-1 border-r-4 border-blue-500'>
        <NodeHeader icon={BsFillLightbulbFill} title='Use Case' />
          
         <div className='flex p-0.5 rounded-sm items-center gap-2 w-full ' >
           
         <p className='uppercase h-6 px-1 bg-white w-full rounded'>Nove IVF  </p>
         </div>
      </div>

      {hasChild ? (
        <Handle
          style={handleStyle}
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        />
      ) : (
        <Handle
          style={handleStyle}
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
          className='relative'
        >
          <div className='h-7 border border-black absolute left-1/2 -translate-x-1/2 top-3 ' />

           
          <button onClick={handleAddNode} className=' absolute   w-6 h-6 flex items-center justify-center rounded-full left-1/2 -translate-x-1/2 translate-y-10'  ><BiPlus/></button>
        </Handle>
      )}
    </div>
  );
}

export default UseCaseNode;
