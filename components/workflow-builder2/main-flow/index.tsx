/* eslint-disable react-hooks/exhaustive-deps */
'use client'
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  addEdge,
  ConnectionLineType,
  Controls,
  Edge,

  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useState
} from "react";
import CustomEdge from "../custom-edge";
import CustomNode from "../custom-node";

export type edgeInterface = 'default' | 'smoothstep' | 'step' | 'smoothstep' | 'simplebezier' | 'straight';
  
  export const nodeWidth = 220;
  export const nodeHeight = 160;
  
  let dagreInstance = new dagre.graphlib.Graph();

  export const enum CustomNodeTypes {
    CUSTOM_NODE = "custom-node",
    USE_CASE = "USE_CASE",
    AGENT_NODE = "AGENT_NODE",
    CHILD_NODE = "CHILD_NODE",
  }
  
  export const useLayoutedElements = () => {
    const getLayoutedElements = (
      nodes: Node[],
      edges: Edge[],
      direction = "TB",
      deleteElements: {
        nodes: Node[],
        edges: Edge[]
      } = {
        nodes: [],
        edges: []
      },
      reinitializeGraph = false
  
    ) => {
  
      console.log(dagreInstance)
      if (reinitializeGraph) {
        dagreInstance = new dagre.graphlib.Graph();
        // dagreInstance.setGraph
      }
  
      const isHorizontal = direction === "LR";
      dagreInstance.setGraph({ rankdir: direction });
      dagreInstance.setDefaultEdgeLabel(() => ({}));
      
  
      deleteElements.nodes.forEach((node) => {
        dagreInstance.removeNode(node.id);
      });
  
      deleteElements.edges.forEach((edge) => {
        dagreInstance.removeEdge(edge.source, edge.target);
      });
  
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
          targetPosition: isHorizontal ? "left" : "top",
          sourcePosition: isHorizontal ? "right" : "bottom",
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
  
  
  
  export const enum CustomEdgeType {
    Custom_Edge = "custom-edge",
    Custom_Edge_2 = "custom-edge-2",
  }
  
   
const OptionContext = createContext<{
  edgeType: ConnectionLineType;
  setEdgeType: React.Dispatch<React.SetStateAction<ConnectionLineType>>;
} | null>(null);

export const useOptions = () => {
  const context = useContext(OptionContext);
  if (!context) {
    throw new Error("useEdgeType must be used within an EdgeTypeProvider");
  }
  return context;
};

const LayoutFlow = memo(() => {
  
    const [nodes, , onNodesChange] = useNodesState([{ id: "1", type: CustomNodeTypes.CUSTOM_NODE, position: { x: 0, y: 0 }, data: { label: "Node 1" } }]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  

    const [edgeType, setEdgeType] = useState<ConnectionLineType>(ConnectionLineType.SimpleBezier)
  
   
  
    const onConnect = useCallback(
      (params: any) =>
        setEdges((eds:any[]):any =>
          addEdge(
            { ...params, type: ConnectionLineType.SmoothStep, animated: true },
            eds
          )
        ),
      []
    );
  
 
    
  
    const edgeTypes = {
        [CustomEdgeType.Custom_Edge]: CustomEdge,
    };
  
    const nodeTypes = {
        [CustomNodeTypes.CUSTOM_NODE]: CustomNode,
    };
   
    return (
      <OptionContext.Provider value={{ edgeType, setEdgeType }}>
      <ReactFlowProvider>
        <div className="w-full h-full bg-white border-b border-black flex items-center ">
        
          <ReactFlow
            nodes={nodes}
            edges={edges}
            draggable={false}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            connectionLineType={ConnectionLineType.SmoothStep}
            fitView={true}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes} 
            defaultViewport = {{
                x: 0, 
                y: 0, 
                zoom: 1
            }} 
            minZoom={0.1}
            maxZoom={100}
          >
  
            <Controls className="bg-white" position="top-right" />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </OptionContext.Provider>
    );
  });
  
  export default LayoutFlow;