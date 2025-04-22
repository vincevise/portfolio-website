import { Edge, MarkerType, Node } from "@xyflow/react";
import {v4 as uuidv4} from 'uuid'
import { CustomNodeTypes } from "../main-flow";



export const createNode1 = (nodeslength:number) => {
    const newnode_id = uuidv4();
    const newNode = {
      id: newnode_id,
      data: { label: `Node ${nodeslength + 1}` },
      position: { x: 0, y: 0 },
      type: CustomNodeTypes.CUSTOM_NODE,
    };
    return newNode; 
}

 

export const enum CustomEdgeType {
    Custom_Edge = "custom-edge",
    Custom_Edge_2 = "custom-edge-2",
  }
  
  export const createEdge = (sourceNode: Node, newNode: Node): Edge => {
    // const {} = useReactFlow()
    const type: CustomEdgeType = CustomEdgeType.Custom_Edge;
 
    return {
      id: `e-${sourceNode.id}-${newNode.id}`,
      source: sourceNode.id,
      target: newNode.id,
      type: type,
  
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#111827",
      },
      style: {
        strokeWidth: 2,
        stroke: "#111827",
        color: "#111827",
      },
    };
  };