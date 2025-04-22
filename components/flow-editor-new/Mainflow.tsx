import {
  addEdge,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Edge,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import dagre from 'dagre';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '@xyflow/react/dist/style.css';
import CustomEdge from './Edges/CustomEdge';
import AgentNode from './Nodes/AgentNode';
import ChildNode from './Nodes/ChildNode';
import UseCaseNode from './Nodes/UseCaseNode';

export const nodeWidth = 220;
export const nodeHeight = 150;

let dagreInstance = new dagre.graphlib.Graph()

export const useLayoutedElements = () => {
   
  
  const getLayoutedElements = (nodes: any[], edges: any[], direction = 'TB', reinitializeGraph = false) => {
    if(reinitializeGraph){
      dagreInstance = new dagre.graphlib.Graph()
    }
    const isHorizontal = direction === 'LR';
    dagreInstance.setGraph({ rankdir: direction });
    dagreInstance.setDefaultEdgeLabel(() => ({}));

    nodes.forEach((node) => {
      dagreInstance.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreInstance.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreInstance);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreInstance.node(node.id);
      const newNode = {
        ...node,
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  return { getLayoutedElements };
};

const nodeTypes = { 
    USE_CASE: UseCaseNode,
    AGENT_NODE: AgentNode,
    CHILD_NODE: ChildNode 
};

export const enum CustomNodeType {
    USE_CASE = 'USE_CASE',
    AGENT_NODE = 'AGENT_NODE',
    CHILD_NODE = 'CHILD_NODE',
}

type Props = {
    nodes: Node[];
    edges: Edge[];
    setNodes: Dispatch<SetStateAction<Node[]>>;
    setEdges: Dispatch<SetStateAction<Edge[]>>;
}

const LayoutFlow = ({
    nodes: nodesState, 
    edges: edgesState,
    setEdges: setEdgeState,
    setNodes: setNodeState
}: Props) => {
    const { getLayoutedElements } = useLayoutedElements();
    const [nodes, setNodes, onNodesChange] = useNodesState(nodesState);
    const [edges, setEdges, onEdgesChange] = useEdgesState(edgesState);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) =>
            addEdge(
                { ...params, type: ConnectionLineType.SmoothStep, animated: true },
                eds,
            ),
        ),
        []
    );

    useEffect(() => {
        setNodeState(nodes);
        setEdgeState(edges);
    }, [nodes, edges]);

    const onLayout = useCallback(
        (direction: string) => {
            const { nodes: layoutedNodes, edges: layoutedEdges } =
                getLayoutedElements(nodes, edges, direction, true);

            setNodes([...layoutedNodes]);
            setEdges([...layoutedEdges]);
        },
        [nodes, edges, getLayoutedElements],
    );

    const edgeTypes = {
        'custom-edge': CustomEdge,
    };

    const addNode = useCallback(() => {
        const newnode_id = uuidv4();
        const newNode: Node = {
            id: newnode_id,
            data: { label: `Node ${nodes.length + 1}` },
            position: { x: 0, y: 0 },
            type: CustomNodeType.USE_CASE,
            draggable: false
        };

        const newNodes = [...nodes, newNode];
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(newNodes, edges);
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
    }, [nodes, edges, getLayoutedElements]);

    return (
        <div className='w-full h-screen bg-red-100'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(nodeschange) => onNodesChange(nodeschange)}
                onEdgesChange={(edgechange) => onEdgesChange(edgechange)}
                onConnect={onConnect}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
            >
              <Background color="gray" variant={BackgroundVariant.Dots} />
                <Panel position="top-right">
                    <button onClick={() => onLayout('TB')}>vertical layout</button>
                    <button onClick={() => onLayout('LR')}>horizontal layout</button>
                    <button onClick={addNode}>Add Node</button>
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default LayoutFlow;
