'use client'
import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  Node,
  useReactFlow
} from '@xyflow/react';
import { BiPlus } from 'react-icons/bi';
import { useLayoutedElements } from '../main-flow';
import { createEdge, createNode1 } from '../utils';
  
  
  
   
  
  export default function CustomEdge({ id, source, target, sourceX, sourceY, targetX, targetY }: EdgeProps) {
    const {getLayoutedElements} = useLayoutedElements()
    const { getNodes, setNodes, setEdges: setFlowEdges, getEdges, getNode } = useReactFlow();
    const bezierPath = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
 
  

    const handleInsertNode = () => {
      const nodes = getNodes();
      const edges = getEdges();
  
      // Log the type of the source node
      const sourceNode = getNode(source)
      const targetNode = getNode(target)
      if(sourceNode && targetNode){

        const newNode = createNode1(nodes.length);
        const oldEdge = edges.find(edge => edge.source === source && edge.target === target);
        
        
        const remainingEdges = edges.filter(edge => edge.source !== source || edge.target !== target);
        if(oldEdge){
          const replacedEdge = createEdge(sourceNode, newNode)
          const newEdge:Edge = createEdge(newNode, targetNode) 
          const newEdges = [...remainingEdges, replacedEdge, newEdge];
          const newNodes = [...nodes, newNode];
          const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges, 'TB', {nodes: [], edges: [oldEdge]}, true);
      
          setNodes(layoutedNodes as Node[]);
          setFlowEdges(layoutedEdges);
        }
      }
   
    }
  
  
  
    return (
      <>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <marker
              id="custom-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="10"
              markerHeight="10"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#111827" />
            </marker>
          </defs>
        </svg>
  
        <BaseEdge
            id={id} 
            path={bezierPath[0]} 
            markerEnd="url(#custom-arrow)" // Reference the marker here
            className='bg-black text-black fill-black stroke-black'
            
        />
        <EdgeLabelRenderer>
          <button 
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${bezierPath[1]}px,${bezierPath[2]}px)`,
              pointerEvents: 'all',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
              cursor: 'pointer',
            }}
            className="nodrag nopan bg-white hover:bg-gray-200 text-gray-700 border border-gray-700 rounded"
            onClick={handleInsertNode}
          >
            <BiPlus className='w-5 h-5' />
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }
  