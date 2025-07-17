// src/algorithms/bfs.ts
import { Node } from '../types/Node';
import { getNeighbors } from './helpers';

export function bfs(grid: Node[][], startNode: Node, finishNode: Node): Node[] {
  const visitedNodesInOrder: Node[] = [];
  const queue: Node[] = [startNode];
  const visited = new Set<Node>([startNode]);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;
    if (currentNode.isWall) continue;
    
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}
