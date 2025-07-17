// src/algorithms/helpers.ts
import { Node } from '../types/Node';

/**
 * Gets the adjacent (top, bottom, left, right) neighbors of a given node.
 * @param node The node to find neighbors for.
 * @param grid The entire grid of nodes.
 * @returns An array of neighboring nodes.
 */
export function getNeighbors(node: Node, grid: Node[][]): Node[] {
  const neighbors: Node[] = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

/**
 * Reconstructs the shortest path by backtracking from the finish node
 * using the 'previousNode' property.
 * @param finishNode The destination node.
 * @returns An array of nodes representing the shortest path from start to finish.
 */
export function getNodesInShortestPathOrder(finishNode: Node): Node[] {
  const nodesInShortestPathOrder: Node[] = [];
  let currentNode: Node | null = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

/**
 * Calculates the Manhattan distance heuristic between two nodes.
 * Used by the A* algorithm.
 * @param nodeA The first node.
 * @param nodeB The second node.
 * @returns The Manhattan distance.
 */
export function manhattanDistance(nodeA: Node, nodeB: Node): number {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}
