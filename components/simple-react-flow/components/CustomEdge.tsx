'use client'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  Node,
  useReactFlow,
} from '@xyflow/react';
import { MdCallSplit } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import { getLayoutedElements } from '../main-flow';
  
  export default function CustomEdge({ id, source,  sourceX, sourceY, targetX, targetY }: EdgeProps) {
    const {  getNodes, setNodes, setEdges: setFlowEdges, getEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
  
    const handleAddChild = () => {
      const nodes = getNodes();
      const edges = getEdges();
  
      const newnode_id = uuidv4();
      const newNode = {
        id: `${newnode_id}`,
        data: { label: 'New Node' },
        position: { x: 0, y: 0 }, // Temporary position
        type: 'textUpdater', // Make sure this type is defined in your nodeTypes
      };
  
      const newEdge = {
        id: `e-${source}-${newNode.id}`,
        source: source,
        target: newNode.id,
        type: 'custom-edge',
      };
  
      const newNodes = [...nodes, newNode];
      const newEdges = [...edges, newEdge];
  
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);
  
      setNodes(layoutedNodes as Node[]);
      setFlowEdges(layoutedEdges);
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
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ccc" />
            </marker>
          </defs>
        </svg>
  
        <BaseEdge 
          id={id} 
          path={edgePath} 
          markerEnd="url(#custom-arrow)" // Reference the marker here
        />
        <EdgeLabelRenderer>
          <button
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
              borderRadius: '100%',
              border: 'none',
              cursor: 'pointer',
            }}
            className="nodrag nopan"
            onClick={handleAddChild}
          >
            <MdCallSplit className="w-4 h-4 text-gray-100 " />
          </button>
        </EdgeLabelRenderer>
      </>
    );
  }
  