// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Node } from './types/Node';
import { dijkstra } from './algorithms/dijkstra';
import { aStar } from './algorithms/aStar';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';
import { getNodesInShortestPathOrder } from './algorithms/helpers';
import { recursiveDivisionMaze } from './maze/recursiveDivision';

// --- Constants ---
const GRID_ROWS = 21;
const GRID_COLS = 49;
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;

// --- Grid Utility Functions ---
const createInitialGrid = (startRow: number, startCol: number, finishRow: number, finishCol: number): Node[][] => {
  const grid: Node[][] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow: Node[] = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode(row, col, startRow, startCol, finishRow, finishCol));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (row: number, col: number, startRow: number, startCol: number, finishRow: number, finishCol: number): Node => ({
  row, col,
  isStart: row === startRow && col === startCol,
  isFinish: row === finishRow && col === finishCol,
  isWall: false, isVisited: false, isPath: false,
  distance: Infinity, previousNode: null,
  gCost: Infinity, hCost: Infinity, fCost: Infinity,
});

const getNewGridWithWallToggled = (grid: Node[][], row: number, col: number): Node[][] => {
  const newGrid = grid.map(r => r.slice());
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish) {
    const newNode = { ...node, isWall: !node.isWall };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

// --- Node Component ---
interface NodeComponentProps {
  node: Node;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const NodeComponent: React.FC<NodeComponentProps> = React.memo(({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { row, col, isStart, isFinish, isWall, isVisited, isPath } = node;
  const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isPath ? 'node-path' : isVisited ? 'node-visited' : isWall ? 'node-wall' : '';
  
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    ></div>
  );
});

// --- Main App Component ---
const App: React.FC = () => {
    const [grid, setGrid] = useState<Node[][]>([]);
    const [mouseIsPressed, setMouseIsPressed] = useState(false);
    const [isVisualizing, setIsVisualizing] = useState(false);
    const [algorithm, setAlgorithm] = useState<'dijkstra' | 'aStar' | 'bfs' | 'dfs'>('dijkstra');
    const [startNodePos, setStartNodePos] = useState({ row: START_NODE_ROW, col: START_NODE_COL });
    const [finishNodePos, setFinishNodePos] = useState({ row: FINISH_NODE_ROW, col: FINISH_NODE_COL });
    const [isMovingStart, setIsMovingStart] = useState(false);
    const [isMovingFinish, setIsMovingFinish] = useState(false);
    const [stats, setStats] = useState<{ algorithm: string, pathLength: number, nodesVisited: number, execTime: number } | null>(null);

    const resetGrid = useCallback(() => {
        const newGrid = createInitialGrid(startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        setGrid(newGrid);
        setStats(null);
    }, [startNodePos, finishNodePos]);

    useEffect(() => { resetGrid(); }, [resetGrid]);

    const handleMouseDown = (row: number, col: number) => {
        if (isVisualizing) return;
        if (row === startNodePos.row && col === startNodePos.col) { setIsMovingStart(true); } 
        else if (row === finishNodePos.row && col === finishNodePos.col) { setIsMovingFinish(true); } 
        else { setGrid(getNewGridWithWallToggled(grid, row, col)); }
        setMouseIsPressed(true);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!mouseIsPressed || isVisualizing) return;
        if (isMovingStart) { setStartNodePos({ row, col }); } 
        else if (isMovingFinish) { setFinishNodePos({ row, col }); } 
        else { setGrid(getNewGridWithWallToggled(grid, row, col)); }
    };

    const handleMouseUp = () => { setMouseIsPressed(false); setIsMovingStart(false); setIsMovingFinish(false); };

    const clearBoard = () => { if (!isVisualizing) resetGrid(); };
    
    const clearPath = () => {
        if (isVisualizing) return;
        const newGrid = grid.map(row => row.map(node => ({ ...node, isVisited: false, isPath: false, distance: Infinity, previousNode: null, gCost: Infinity, hCost: Infinity, fCost: Infinity, })));
        setGrid(newGrid);
        setStats(null);
    };

    const animateAlgorithm = (visitedNodes: Node[], pathNodes: Node[], execTime: number) => {
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => animateShortestPath(pathNodes), 15 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodes[i];
                setGrid(prev => prev.map((row, rIdx) => rIdx === node.row ? row.map((n, cIdx) => cIdx === node.col ? { ...n, isVisited: true } : n) : row));
            }, 15 * i);
        }
        setStats({ algorithm: algorithm.toUpperCase(), pathLength: pathNodes.length, nodesVisited: visitedNodes.length, execTime });
    };

    const animateShortestPath = (pathNodes: Node[]) => {
        for (let i = 0; i < pathNodes.length; i++) {
            setTimeout(() => {
                const node = pathNodes[i];
                setGrid(prev => prev.map((row, rIdx) => rIdx === node.row ? row.map((n, cIdx) => cIdx === node.col ? { ...n, isPath: true } : n) : row));
            }, 40 * i);
        }
        setTimeout(() => setIsVisualizing(false), 40 * pathNodes.length);
    };

    const visualizeAlgorithm = () => {
        if (isVisualizing) return;
        setIsVisualizing(true);
        clearPath();
        
        const freshGrid = grid.map(row => row.map(node => ({ ...node, isVisited: false, isPath: false, distance: Infinity, previousNode: null, gCost: Infinity, hCost: Infinity, fCost: Infinity })));
        const startNode = freshGrid[startNodePos.row][startNodePos.col];
        const finishNode = freshGrid[finishNodePos.row][finishNodePos.col];
        
        const startTime = performance.now();
        let visitedNodesInOrder: Node[] = [];
        switch (algorithm) {
            case 'dijkstra': visitedNodesInOrder = dijkstra(freshGrid, startNode, finishNode); break;
            case 'aStar': visitedNodesInOrder = aStar(freshGrid, startNode, finishNode); break;
            case 'bfs': visitedNodesInOrder = bfs(freshGrid, startNode, finishNode); break;
            case 'dfs': visitedNodesInOrder = dfs(freshGrid, startNode, finishNode); break;
            default: break;
        }
        const endTime = performance.now();
        const execTime = endTime - startTime;

        const finalNode = visitedNodesInOrder[visitedNodesInOrder.length - 1];
        const pathFound = finalNode.row === finishNode.row && finalNode.col === finishNode.col;
        const nodesInShortestPathOrder = pathFound ? getNodesInShortestPathOrder(finishNode) : [];
        
        animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, execTime);
    };

    const generateMaze = (type: 'random' | 'recursive') => {
        if (isVisualizing) return;
        clearBoard();
        const newGrid = createInitialGrid(startNodePos.row, startNodePos.col, finishNodePos.row, finishNodePos.col);
        if (type === 'random') {
            for (let r = 0; r < GRID_ROWS; r++) {
                for (let c = 0; c < GRID_COLS; c++) {
                    if (!newGrid[r][c].isStart && !newGrid[r][c].isFinish && Math.random() < 0.3) {
                        newGrid[r][c].isWall = true;
                    }
                }
            }
        } else if (type === 'recursive') {
            recursiveDivisionMaze(newGrid, 2, GRID_ROWS - 3, 2, GRID_COLS - 3, 'horizontal', false);
        }
        setGrid(newGrid);
    };

    const legendItems = [
        { type: 'Start', class: 'node-start' }, { type: 'Target', class: 'node-finish' },
        { type: 'Wall', class: 'node-wall' }, { type: 'Visited', class: 'node-visited-legend' },
        { type: 'Path', class: 'node-path-legend' }, { type: 'Unvisited', class: 'border-slate-200' },
    ];

    const buttonStyle = {
        padding: '0.5rem 1rem',
        color: 'white',
        fontWeight: '600',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-100 font-sans">
            <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <style>{`.node:active{transform:scale(.9)}.node-start{background-color:#10b981;border-color:#059669}.node-finish{background-color:#f43f5e;border-color:#e11d48}.node-wall{background-color:#1e293b;border-color:#020617;transition:background-color .1s ease-in;border-radius:2px}.node-visited{animation:v .8s ease-out forwards}@keyframes v{0%{transform:scale(.3);background-color:rgba(239,68,68,.5);border-radius:100%}50%{background-color:rgba(99,102,241,.75)}75%{transform:scale(1.2);background-color:rgba(56,189,248,.9)}100%{transform:scale(1);background-color:#67e8f9}}.node-path{animation:p 1s ease-out forwards}@keyframes p{0%{transform:scale(.4);background-color:#facc15}50%{transform:scale(1.1);background-color:#fde047}100%{transform:scale(1);background-color:#facc15}}.node-visited-legend{background-color:#67e8f9}.node-path-legend{background-color:#facc15}`}</style>
            <header className="w-full bg-white shadow-sm">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <div className="flex items-center gap-3">
                        <img src="/logo1.png" alt="Pathfinder Logo" className="h-12 w-12" />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                                PathFinder <span className="text-indigo-600">Visualizer</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </header>
            <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow flex flex-col items-center py-6">
                <div className="w-full bg-white p-4 rounded-xl shadow-md mb-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
                        <select id="algorithm-select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value as any)} className="p-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" disabled={isVisualizing}>
                            <option value="dijkstra">Dijkstra's</option><option value="aStar">A* Search</option><option value="bfs">BFS</option><option value="dfs">DFS</option>
                        </select>
                        <button onClick={visualizeAlgorithm} style={{...buttonStyle, backgroundColor: '#4f46e5'}} disabled={isVisualizing}>Visualize</button>
                        <button onClick={() => generateMaze('recursive')} style={{...buttonStyle, backgroundColor: '#7c3aed'}} disabled={isVisualizing}>Recursive Maze</button>
                        <button onClick={() => generateMaze('random')} style={{...buttonStyle, backgroundColor: '#9333ea'}} disabled={isVisualizing}>Random Maze</button>
                        <button onClick={clearPath} style={{...buttonStyle, backgroundColor: '#f59e0b'}} disabled={isVisualizing}>Clear Path</button>
                        <button onClick={clearBoard} style={{...buttonStyle, backgroundColor: '#e11d48'}} disabled={isVisualizing}>Clear Board</button>
                    </div>
                    {stats && <div className="w-full border-t border-slate-200 mt-4 pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
                        <div><div className="text-xs text-slate-500">Algorithm</div><div className="text-lg font-bold text-indigo-600">{stats.algorithm}</div></div>
                        <div><div className="text-xs text-slate-500">Path Length</div><div className="text-lg font-bold">{stats.pathLength > 0 ? stats.pathLength : 'N/A'}</div></div>
                        <div><div className="text-xs text-slate-500">Nodes Visited</div><div className="text-lg font-bold">{stats.nodesVisited}</div></div>
                        <div><div className="text-xs text-slate-500">Time</div><div className="text-lg font-bold">{stats.execTime.toFixed(2)} ms</div></div>
                    </div>}
                    <div className="w-full border-t border-slate-200 mt-4 pt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                        {legendItems.map(item => <div key={item.type} className="flex items-center"><div className={`w-5 h-5 rounded mr-2 border ${item.class}`}></div><span className="text-sm text-slate-600">{item.type}</span></div>)}
                    </div>
                </div>
                <div className="w-full" onMouseLeave={handleMouseUp}>
                    <div className="grid w-full shadow-lg rounded-xl overflow-hidden border-2 border-white" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}>
                        {grid.map((row, rIdx) => (
                            row.map((node, nodeIdx) => (
                                <NodeComponent
                                    key={`${rIdx}-${nodeIdx}`}
                                    node={node}
                                    onMouseDown={handleMouseDown}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseUp={handleMouseUp}
                                />
                            ))
                        ))}
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-slate-500">Click and drag on the grid to add walls. You can also drag the start and target nodes.</p>
            </main>
            <footer className="w-full text-center py-6 px-4 mt-auto border-t border-slate-200 bg-white">
                <p className="text-xl italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                    Bringing algorithms to life.
                </p>
                <div className="flex justify-center items-center gap-6 mt-3">
                    <p className="text-sm text-slate-400">
                        &copy; 2025 Suraj Sa
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="https://www.linkedin.com/in/suraj-sa-69a4b6289" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-400 hover:text-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="mailto:surajsa0903@gmail.com" aria-label="Email" className="text-slate-400 hover:text-indigo-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
