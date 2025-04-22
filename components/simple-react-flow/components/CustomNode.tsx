'use client'
import { Handle, MarkerType, Node, NodeProps, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { getLayoutedElements } from '../main-flow';


function TextUpdaterNode({ id,  isConnectable }: NodeProps) {
  const {  getEdges, getNodes, setNodes, setEdges } = useReactFlow();
  const [hasChild, setHasChild] = useState(false);

  useEffect(() => {
    const edges = getEdges();
    const childEdges = edges.filter(edge => edge.source === id);
    setHasChild(childEdges.length > 0);
  }, [id, getEdges]);

  const nodes = getNodes();
  const edges = getEdges();

  const handleAddNode = () => {
    const newnode_id = uuidv4();
    const newNode = {
      id: `${newnode_id}`,
      data: { label: 'New Node' },
      position: { x: 0, y: 0 }, // Temporary position
      type: 'textUpdater', // Make sure this type is defined in your nodeTypes
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
        color: '#FF0072',
      },
      style: {
        strokeWidth: 2,
        stroke: '#FF0072',
      },
    };

    const newNodes = [...nodes, newNode];
    const newEdges = [...edges, newEdge];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

    setNodes(layoutedNodes as Node[]);
    setEdges(layoutedEdges);

    setHasChild(true);
  };

  return (
    <div className="text-updater-node border" style={{ borderRadius: '4px', border: '1px solid black', padding: '4px', width: '200px', height: '40px' }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ width: '10px', height: '10px', background: 'red', border: 'black' }}
      />
      <div className='w-full '>
         <div className='' style={{display:'flex', alignItems:'center', gap:'10px'}}>
         <FaLightbulb className='w-8 h-8'/> 
         <p>Use Case node</p>
         </div>
      </div>

      {hasChild ? (
        <Handle
          style={{ width: '10px', height: '10px', background: 'red', border: 'black' }}
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        />
      ) : (
        <Handle
          style={{ width: '10px', height: '10px', background: 'red', border: 'none' }}
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        >
          <button onClick={handleAddNode} className='' style={{ translate: '-6px 30px' }}>+</button>
        </Handle>
      )}
    </div>
  );
}

export default TextUpdaterNode;
