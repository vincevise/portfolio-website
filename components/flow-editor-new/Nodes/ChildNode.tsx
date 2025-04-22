import { Edge, Handle, Node, NodeProps, NodeToolbar, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import { AiOutlineFunction } from 'react-icons/ai';
import { BiPlus } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';
import { CustomNodeType, useLayoutedElements } from '../Mainflow';
import NodeHeader from '../NodeTitle';
import { createEdge, createNode } from '../utils/utils';

const handleStyle = { left: 10 };

function ChildNode({ id,  isConnectable }: NodeProps) {
  const {   getEdges, getNodes, setNodes, setEdges, deleteElements, getNode } = useReactFlow();
  const [hasChild, setHasChild] = useState(false);

  const {getLayoutedElements} = useLayoutedElements()

  useEffect(() => {
    const edges = getEdges();
    const childEdges = edges.filter(edge => edge.source === id);
    setHasChild(childEdges.length > 0);
  }, [id, getEdges]);

  const nodes = getNodes();
  const edges = getEdges();

  const handleAddNode = () => {
    const newNode = createNode(CustomNodeType.CHILD_NODE)

    const newEdge = createEdge(id, newNode.id)

    const newNodes = [...nodes, newNode];
    const newEdges = [...edges, newEdge];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

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




  return (
    <div className="text-updater-node border bg-gray-100 p-1" style={{ borderRadius: '4px', border: '1px solid black'  , width: '200px', height: '68px' }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={handleStyle}
      />
      <NodeToolbar
        position={Position.Right}
      >
        <button className='text-red-500' onClick={()=>{
          handleDeleteNode()
        }}><IoMdTrash  className='w-5 h-5'/></button> 
      </NodeToolbar>
      
      <div className='w-full space-y-0.5 pr-1 border-r-4 border-red-500'>
        <NodeHeader icon={AiOutlineFunction} title='Function' />
          
          <div className='flex p-0.5 rounded-sm items-center gap-2 w-full bg-white' >
          <img alt='zigment logo' width={100} height={100} src={'https://cdn.zigment.ai/assets/zigment.svg'} className='w-6 h-6 object-contain'/>
            <p className='uppercase h-6 px-1'>Run Any LLM  </p>
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

export default ChildNode;
