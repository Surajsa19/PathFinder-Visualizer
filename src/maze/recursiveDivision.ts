// src/maze/recursiveDivision.ts
import { Node } from '../types/Node';

export function recursiveDivisionMaze(grid: Node[][], rowStart: number, rowEnd: number, colStart: number, colEnd: number, orientation: 'horizontal' | 'vertical', surroundingWalls: boolean) {
    if (rowEnd < rowStart || colEnd < colStart) {
        return;
    }
    if (!surroundingWalls) {
        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                if (r === 0 || c === 0 || r === grid.length - 1 || c === grid[0].length - 1) {
                    if(!grid[r][c].isStart && !grid[r][c].isFinish) grid[r][c].isWall = true;
                }
            }
        }
        surroundingWalls = true;
    }

    if (orientation === 'horizontal') {
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = [];
        for (let number = colStart - 1; number <= colEnd + 1; number += 2) {
            possibleCols.push(number);
        }
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        
        for (let c = colStart - 1; c <= colEnd + 1; c++) {
            if (c !== colRandom && currentRow < grid.length && c < grid[0].length) {
                 if(!grid[currentRow][c].isStart && !grid[currentRow][c].isFinish) grid[currentRow][c].isWall = true;
            }
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
        } else {
            recursiveDivisionMaze(grid, rowStart, currentRow - 2, colStart, colEnd, 'vertical', surroundingWalls);
        }
        if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
        } else {
            recursiveDivisionMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, 'vertical', surroundingWalls);
        }
    } else { // vertical
        let possibleCols = [];
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        let possibleRows = [];
        for (let number = rowStart - 1; number <= rowEnd + 1; number += 2) {
            possibleRows.push(number);
        }
        let randomColIndex = Math.floor(Math.random() * possibleCols.length);
        let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
        let currentCol = possibleCols[randomColIndex];
        let rowRandom = possibleRows[randomRowIndex];
        
        for (let r = rowStart - 1; r <= rowEnd + 1; r++) {
            if (r !== rowRandom && r < grid.length && currentCol < grid[0].length) {
                if(!grid[r][currentCol].isStart && !grid[r][currentCol].isFinish) grid[r][currentCol].isWall = true;
            }
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, 'horizontal', surroundingWalls);
        } else {
            recursiveDivisionMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
        }
        if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal', surroundingWalls);
        } else {
            recursiveDivisionMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
        }
    }
}
