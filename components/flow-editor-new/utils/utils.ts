import { Edge, MarkerType, Node } from "@xyflow/react";
import { CustomNodeType } from "../Mainflow";
import { v4 as uuidv4 } from 'uuid';

export const createNode = (type:CustomNodeType):Node => {
    const newnode_id = uuidv4();

    return {
        id: `${newnode_id}`,
        data: { label: 'New Node' },
        position: { x: 0, y: 0 }, // Temporary position
        type: type, // Make sure this type is defined in your nodeTypes
        draggable:false
    }
}

export const createEdge = (source_id:string, newnode_id:string):Edge => {
    return {
        id: `e-${source_id}-${newnode_id}`,
      source: source_id,
      target: newnode_id,
      type:'custom-edge',
      
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#111827',
      },
      style: {
        strokeWidth: 2,
        stroke: '#111827',
        color:'#111827'
      },
      
    }
}

 