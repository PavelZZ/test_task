import {useCallback} from 'react'
import {
    ReactFlowProvider,
    ReactFlow,
    Background,
    Panel,

    BackgroundVariant,

    type NodeChange,
    type EdgeChange,
    type Connection,

    applyNodeChanges,
    applyEdgeChanges,

    addEdge,
    type ReactFlowProps
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';

import FPSCounter from "@/components/FPSCounter.tsx";
import Node from "@/components/Node.tsx";

import {
    useGraph
} from "@/hooks";

import {
    type NodeType,
    type EdgeType, type NodeData
} from "@/schemas";

import {
    createRandomDictionary
} from "@/utils";
import MyComponent from './components/MyComponent';

const CUSTOM_NODE_PROP: ReactFlowProps['nodeTypes'] = { custom: Node };
const styles = {
                width: '50vw',
                height: '50vh'
            };
function App() {

    const {
        nodes,
        edges,
        setNodes,
        setEdges
    } = useGraph();

    const onConnect = useCallback(
        (connection: Connection) => {
            const newEdges = addEdge<EdgeType>(connection, edges);

            const sourceNode = nodes.find(node => node.id === connection.source);
            const targetNode = nodes.find(node => node.id === connection.target);

            if (!sourceNode || !targetNode) {
                console.error("Source or target node not found for connection:", connection);
                return;
            }

            const sourceNodeData = sourceNode.data as NodeData;
            const targetNodeData = targetNode.data as NodeData;

            const newNode: NodeType = {
                id: connection.target,
                position: targetNode.position,
                type: "custom",
                data: {
                    displayName: targetNodeData.displayName,
                    values: {
                        ...sourceNodeData.values,
                        ...targetNodeData.values
                    }
                }
            }

            setNodes(nodes.map(node =>
                node.id === newNode.id ? newNode : node
            ));

            setEdges(newEdges);

        }, [edges, nodes, setEdges, setNodes],
    );

    const onNodesChangeInternal = useCallback((changes: NodeChange<NodeType>[]) => {
        const changedNodes = applyNodeChanges(changes, nodes);
        setNodes(changedNodes);
    }, [
        nodes,
        setNodes
    ]);

    const onEdgesChangeInternal = useCallback((changes: EdgeChange<EdgeType>[]) => {
        const changedEdges = applyEdgeChanges(changes, edges);
        setEdges(changedEdges);
    }, [
        edges,
        setEdges
    ]);

    const addNode = useCallback(() => {
        const newNode: NodeType = {
            id: (nodes.length + 1).toString(),
            position: {x: Math.random() * 400, y: Math.random() * 400},
            type: "custom",
            data: {
                displayName: `Node ${nodes.length + 1}`,
                values: createRandomDictionary(2)
            }
        };
        setNodes([...nodes, newNode]);
    }, [
        nodes,
        setNodes
    ]);

    return (
        <div
            style={styles}
        >
            <ReactFlowProvider>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChangeInternal}
                    onEdgesChange={onEdgesChangeInternal}
                    onConnect={onConnect}
                    nodeTypes={CUSTOM_NODE_PROP}
                    deleteKeyCode={"Delete"}

                >
                    <Panel>
                        <button onClick={addNode}>Add Node</button>
                    </Panel>
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                </ReactFlow>
            </ReactFlowProvider>
            <MyComponent text='текст'>
                <div>
                    hello
                </div>
            </MyComponent>
            <FPSCounter />
        </div>
    )
}

export default App;
