// src/algorithms/dijkstra.ts
import { Node } from '../types/Node';
import { getNeighbors } from './helpers';

export function dijkstra(grid: Node[][], startNode: Node, finishNode: Node): Node[] {
    const visitedNodesInOrder: Node[] = [];
    startNode.distance = 0;
    const unvisitedNodes = grid.flat();

    while (unvisitedNodes.length) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        const closestNode = unvisitedNodes.shift();

        if (!closestNode || closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) return visitedNodesInOrder;

        const neighbors = getNeighbors(closestNode, grid).filter(n => !n.isVisited);
        for (const neighbor of neighbors) {
            neighbor.distance = closestNode.distance + 1;
            neighbor.previousNode = closestNode;
        }
    }
    return visitedNodesInOrder;
}
