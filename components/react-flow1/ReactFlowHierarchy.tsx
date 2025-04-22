/* eslint-disable @typescript-eslint/no-explicit-any */
import Dagre from '@dagrejs/dagre';
import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Edge,
  Node,
  Panel,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from 'reactflow';

import 'reactflow/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode';

export const initialNodes = [
    {
      id: '1',
      data: { label: 'input' },
      position: { x: 0, y: 0 },
      height:1000
    },
    {
      id: '2',
      data: { label: 'node 2' },
      position: { x: 0, y: 100 },
    },
    {
      id: '2a',
      data: { label: 'node 2a' },
      position: { x: 0, y: 200 },
    },
    {
      id: '2b',
      data: { label: 'node 2b' },
      position: { x: 0, y: 300 },
    },
    {
      id: '2c',
      data: { label: 'node 2c' },
      position: { x: 0, y: 400 },
    },
    {
      id: '2d',
      data: { label: 'node 2d' },
      position: { x: 0, y: 500 },
    },
    {
      id: 'sdsv',
      data: { label: 'node 2d' },
      position: { x: 0, y: 500 },
    },
    {
      id: 'fdvdf',
      data: { label: 'node 2d' },
      position: { x: 0, y: 500 },
    },
    {
      id: '3',
      data: { label: 'node 3' },
      position: { x: 200, y: 100 },
    }, 
  ];
  
  export const initialEdges = [
    { id: 'e12', source: '1', target: '2', animated: true },
    { id: 'e13', source: '1', target: '3', animated: true },
    { id: 'e22a', source: '2', target: '2a', animated: true },
    { id: 'e22b', source: '2', target: '2b', animated: true },
    { id: 'e22vsf', source: '2b', target: 'sdsv', animated: true },
    { id: 'wef', source: '2b', target: 'fdvdf', animated: true },
    { id: 'e22c', source: '2', target: '2c', animated: true },
    { id: 'e2c2d', source: '2c', target: '2d', animated: true },
  ];
  

const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge: Edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) => g.setNode(node.id, node));

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: Node) => {
      const { x, y } = g.node(node.id);

      return { ...node, position: { x, y },  };
    }),
    edges,
  };
};

const nodeTypes = {textUpdater: TextUpdaterNode}

const LayoutFlow = () => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[] | any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [shouldLayout, setShouldLayout] = useState(false)

  useEffect(()=>{
    if(shouldLayout){
      onLayout('TB')
    }
  },[shouldLayout])
  
  const onLayout = useCallback(
    (direction: any) => {
      const layouted = getLayoutedElements(nodes, edges, { direction });

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
      setShouldLayout(false)
      window.requestAnimationFrame(() => {
        fitView();
        
      });
    },
    [nodes, edges]
  );

  const handleNodeClick = async(node: Node) =>{
    console.log(node, 'node working')
    const id = Math.abs(Math.random()*100000) + ''

    

  // // Use setNodes to add the new node
    setNodes((prev)=>[...prev,
      {
        id,
        type: 'default', // Specify the type if it's a special node; otherwise, 'default'
        position: { x: 0, y: 0 }, // You might want to calculate the position
        data: {
          label: id,
        }
      }
    ])
    setEdges((prev)=>[...prev, {id, source: node.id, target: id, animated: true }])
     
    // onLayout('TB')
    setShouldLayout(true)
  } 

  // const nodeTypes = useMemo(() => ({
  //   textUpdater: TextUpdaterNode,
  // }), [onLayout, nodes, edges]);

  return (
    <ReactFlow
      nodeTypes={nodeTypes} 
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      onNodeClick={(e,node)=>handleNodeClick(node)}
      
    >
      <Panel position="top-right">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
        <button onClick={()=>{
          console.log('clicking')
          const id = Math.abs(Math.random()*100000) + ''
          setNodes((prev)=>[...prev,{
            id,
            type: 'default', // Specify the type if it's a special node; otherwise, 'default'
            position: { x: 0, y: 0 }, // You might want to calculate the position
            data: {
              label: id,
            },
          }])
          setEdges((prev)=>[...prev, {id, source: '2c', target: id, animated: true }])

          onLayout('TB')
        }}>Add Nodes</button>
      </Panel>
    </ReactFlow>
  );
};

export default function ReactFlow1 () {
  return (
    <ReactFlowProvider>
      <LayoutFlow />
    </ReactFlowProvider>
  );
}
