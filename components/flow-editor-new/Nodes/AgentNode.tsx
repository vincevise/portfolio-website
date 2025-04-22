import { Edge, Handle, Node, NodeProps, NodeToolbar, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { CustomNodeType, useLayoutedElements } from '../Mainflow';
import NodeHeader from '../NodeTitle';
import { createEdge, createNode } from '../utils/utils';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

 


function AgentNode({ id,  isConnectable }: NodeProps) {
  const {  getEdges, getNodes, setNodes, setEdges, deleteElements, getNode } = useReactFlow();
  const {getLayoutedElements} = useLayoutedElements()
  const [hasChild, setHasChild] = useState(false);

  const nodes = getNodes();
  const edges = getEdges();
  useEffect(() => {
    const childEdges = edges.filter(edge => edge.source === id);
    setHasChild(childEdges.length > 0);
  }, [id, nodes]);


  const handleAddNode = () => {
     

    const newNode = createNode(CustomNodeType.CHILD_NODE)
 

    const newEdge = createEdge(id, newNode.id)

    const newNodes = [newNode, ...nodes, ];
    const newEdges = [newEdge, ...edges, ];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges, 'TB');

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);

    setHasChild(true);
  };

  const findAllChildNodes = (nodeId: string, nodes: Node[], edges: Edge[]):Node[]  => {
    const childEdges = edges.filter(edge => edge.source === nodeId);
    let childNodes = childEdges.map(edge => nodes.find(node => node.id === edge.target));

    childNodes.forEach(childNode => {
      if (childNode) {
        const nestedChildNodes = findAllChildNodes(childNode.id, nodes, edges);
        childNodes = [...childNodes, ...nestedChildNodes];
      }
    });


    return childNodes.filter((x)=>x!==undefined) ?? [];
  };

  const handleDeleteNode = () => {
    const nodeToDelete = getNode(id);
    const edgesToDelete = edges.filter(edge => edge.source === id || edge.target === id);
  
    const childNodes = findAllChildNodes(id, nodes, edges) ?? [];
  
    if (nodeToDelete && edgesToDelete.length > 0) {
      const childEdges = childNodes.flatMap((childNode: Node) => {
        return edges.filter((edge: Edge) => edge.source === childNode.id || edge.target === childNode.id);
      });
  
      const remainingNodes = nodes.filter(node => ![nodeToDelete, ...childNodes].map((x)=>x.id).includes(node.id));
      const remainingEdges = edges.filter(edge => !edgesToDelete.includes(edge) && !childEdges.includes(edge));
  
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(remainingNodes, remainingEdges, 'TB', true);
  
      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
  
      deleteElements({ nodes: [nodeToDelete, ...childNodes], edges: [...edgesToDelete, ...childEdges] });
    }
  };
  
  

  const handleStyle = { width: '8px', height: '8px', background: 'white', border: '1px solid black' };

  return (
    <div className="text-updater-node border bg-gray-100 p-1" style={{ borderRadius: '4px', border: '1px solid black', width: '200px', height: '68px' }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={handleStyle}
      />

      <NodeToolbar position={Position.Right}>
        <button onClick={handleDeleteNode} className='text-red-500'>
          <IoMdTrash className='w-5 h-5' />
        </button>
      </NodeToolbar>

      <div className='w-full space-y-0.5 pr-1 border-r-4 border-yellow-400'>
        <NodeHeader icon={FaUser} title='Agent' />
        <div className='flex p-0.5 rounded-sm items-center gap-2 w-full'>
          <p className='uppercase h-6 bg-white w-full rounded px-1'>Conversation</p>
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
          <button onClick={handleAddNode} className='absolute w-6 h-6 flex items-center justify-center rounded-full left-1/2 -translate-x-1/2 translate-y-10'>
            <BiPlus />
          </button>
        </Handle>
      )}
    </div>
  );
}

export default AgentNode;
