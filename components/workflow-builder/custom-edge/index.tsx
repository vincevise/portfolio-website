'use client'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  Node,
  useReactFlow
} from '@xyflow/react';
import { MdCallSplit } from 'react-icons/md';
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
 
 




    // const 

 

    // const [] = get
  
    const handleAddChild = () => {
      const nodes = getNodes();
      const edges = getEdges();
  
      // Log the type of the source node
      const sourceNode = getNode(source)
      const targetNode = getNode(target)
   
      if(sourceNode && targetNode){
        const newNodes:Node[] = [...nodes];
        const newEdges = [...edges];
        const newNode = createNode1(nodes.length);
        
        // Duplicate the Sibling Data
        const newEdge = createEdge(sourceNode, newNode) 
        newNodes.push(newNode);
        newEdges.push(newEdge);
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);
    
        setNodes(layoutedNodes as Node[]);
        setFlowEdges(layoutedEdges);
      }
    };
  
    return (
      <>
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <marker
              id="custom-arrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
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
            style={{color:'#111827', background:'#111827'}}
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
              borderRadius: '100%',
              border: 'none',
              cursor: 'pointer',
            }}
            className="nodrag nopan bg-gray-200 text-gray-600"
            onClick={handleAddChild}
          >
            <MdCallSplit className="w-4 h-4 rotate-180" />
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }
  