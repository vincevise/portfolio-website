'use client'
import { Edge, Handle, Node, NodeProps, NodeToolbar, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io';
import {  useLayoutedElements } from '../main-flow';
import { createEdge, createNode1 } from '../utils';

type CustomNodeDataType = {
    label: 'string'
}
 
 
 
export type CustomNodeType = Node<CustomNodeDataType, 'CHILD_NODE'>;


function CustomNode(props: NodeProps<CustomNodeType>) {

  const { id,  isConnectable, selected, data } = props;

  


  const {   getEdges, getNodes, setNodes, setEdges, getNode } = useReactFlow();
  const [hasChild, setHasChild] = useState(false);


  const {getLayoutedElements} = useLayoutedElements()
  const nodes = getNodes();
  const edges = getEdges();

  useEffect(() => {
    const childEdges = edges.filter(edge => edge.source === id);
    setHasChild(childEdges.length > 0);
  }, [id, edges, nodes]);

  

   


  const handleAddNode = () => {
    const thisNode = getNode(id) 
    
    if(thisNode){
      // Create New Child Node
      const newNode = createNode1(nodes.length);
 
  
      // Create NEw Edge
      const newEdge = createEdge(thisNode, newNode);

  
      // Layouting
      const newNodes = [...nodes, newNode];
      const newEdges = [...edges, newEdge];
  
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);
  
      setNodes(layoutedNodes as Node[]);
      setEdges(layoutedEdges);
  
      // To toggle false to this Node having Child
      setHasChild(true);
    }
  };

  const findAllChildNodes = (nodeId: string, nodes: Node[], edges: Edge[]): Node[] => {
    const childEdges = edges.filter(edge => edge.source === nodeId);
    let childNodes = childEdges
      .map(edge => nodes.find(node => node.id === edge.target))
      .filter((node): node is Node => node !== undefined); // Type guard to filter out undefined values
  
    childNodes.forEach(childNode => {
      const nestedChildNodes = findAllChildNodes(childNode.id, nodes, edges);
      childNodes = [...childNodes, ...nestedChildNodes];
    });
  
    return childNodes;
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
  
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(remainingNodes, remainingEdges, 'TB', { nodes: [nodeToDelete, ...childNodes], edges: [...edgesToDelete, ...childEdges] });
  
      setNodes(layoutedNodes as Node[]);
      setEdges(layoutedEdges);
      
     
    }
  };

  const handleStyle = { width: '8px', height: '8px', background: 'white', border: '1px solid black' }

 

  
  
  const is_first = data.label.split(' ')[1] === '1' ? true : false


  return (
    <div 
        className={`text-updater-node border bg-white p-1 ${selected && 'ring-4 ring-red-400'}`} 
        style={{ borderRadius: '4px', border: '1px solid black'  , width: '200px', height: '68px' }}
        onClick={()=>{
          console.log('clicked')
        }}
    >
        {!is_first 
        && 
        <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
            style={handleStyle}
        />
        }
        {!is_first && 
            <NodeToolbar
                position={Position.Right}
            >
                <button className='text-red-500' onClick={()=>{
                handleDeleteNode()
                }}><IoMdTrash  className='w-5 h-5'/></button> 
            </NodeToolbar>
        }
      
      
         
          
          <div className='flex py-1 px-1   rounded-sm items-center gap-2 w-full h-full justify-center' >
            {data.label}
        
          </div>

      {hasChild ? (
        <>
          <Handle
            style={handleStyle}
            type="source"
            position={Position.Bottom}
            id="a"
            isConnectable={isConnectable}
          />
           
        </>
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

export default CustomNode;