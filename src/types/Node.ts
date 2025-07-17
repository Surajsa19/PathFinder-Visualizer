// src/types/Node.ts

/**
 * Defines the structure for a single node in the grid.
 * Each node holds its position, state (start, finish, wall, etc.),
 * and properties used by the pathfinding algorithms.
 */
export interface Node {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousNode: Node | null;
  gCost: number;
  hCost: number;
  fCost: number;
}
