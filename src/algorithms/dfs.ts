// src/algorithms/dfs.ts
import { Node } from '../types/Node';
import { getNeighbors } from './helpers';

export function dfs(grid: Node[][], startNode: Node, finishNode: Node): Node[] {
  const visitedNodesInOrder: Node[] = [];
  const stack: Node[] = [startNode];
  const visited = new Set<Node>();

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (visited.has(currentNode) || currentNode.isWall) continue;
    
    visited.add(currentNode);
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        neighbor.previousNode = currentNode;
        stack.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}
