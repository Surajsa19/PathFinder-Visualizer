// src/algorithms/aStar.ts
import { Node } from '../types/Node';
import { getNeighbors, manhattanDistance } from './helpers';

export function aStar(grid: Node[][], startNode: Node, finishNode: Node): Node[] {
    const openList: Node[] = [];
    const closedList: Set<Node> = new Set();
    startNode.gCost = 0;
    startNode.hCost = manhattanDistance(startNode, finishNode);
    startNode.fCost = startNode.gCost + startNode.hCost;
    openList.push(startNode);
    const visitedNodesInOrder: Node[] = [];

    while (openList.length > 0) {
        openList.sort((a, b) => a.fCost - b.fCost);
        const currentNode = openList.shift()!;
        if (closedList.has(currentNode)) continue;
        
        visitedNodesInOrder.push(currentNode);
        if (currentNode === finishNode) return visitedNodesInOrder;

        closedList.add(currentNode);
        const neighbors = getNeighbors(currentNode, grid);
        for (const neighbor of neighbors) {
            if (neighbor.isWall) continue;
            const gCost = currentNode.gCost + 1;
            if (gCost < neighbor.gCost) {
                neighbor.previousNode = currentNode;
                neighbor.gCost = gCost;
                neighbor.hCost = manhattanDistance(neighbor, finishNode);
                neighbor.fCost = neighbor.gCost + neighbor.hCost;
                if (!openList.some(n => n.row === neighbor.row && n.col === neighbor.col)) {
                    openList.push(neighbor);
                }
            }
        }
    }
    return visitedNodesInOrder;
}
