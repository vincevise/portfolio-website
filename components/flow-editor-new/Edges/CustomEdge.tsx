import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { MdCallSplit } from 'react-icons/md';
import { CustomNodeType, useLayoutedElements } from '../Mainflow';
import { createEdge, createNode } from '../utils/utils';



 

export default function CustomEdge({ id, source,  sourceX, sourceY, targetX, targetY }: EdgeProps) {
  const {getLayoutedElements} = useLayoutedElements()
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

    // Log the type of the source node
    const sourceNode = nodes.find(node => node.id === source);
    let type = CustomNodeType.AGENT_NODE

    if(sourceNode?.type === CustomNodeType.AGENT_NODE || sourceNode?.type === CustomNodeType.CHILD_NODE ){
      type = CustomNodeType.CHILD_NODE
    }
 
    const newNode = createNode(type) 
    const newEdge = createEdge(source, newNode.id)

    const newNodes = [...nodes, newNode];
    const newEdges = [...edges, newEdge];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, newEdges);

    setNodes(layoutedNodes);
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
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#111827" />
          </marker>
        </defs>
      </svg>

      <BaseEdge 
        id={id} 
        path={edgePath} 
        markerEnd="url(#custom-arrow)" // Reference the marker here
        style={{color:'#111827', background:'#111827'}}
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
          className="nodrag nopan bg-gray-200 text-gray-600"
          onClick={handleAddChild}
        >
          <MdCallSplit className="w-4 h-4" />
        </button>
      </EdgeLabelRenderer>
    </>
  );
}
