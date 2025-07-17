# PathFinder Visualizer

<h3 align="center">
  A dynamic web application for visualizing classic pathfinding algorithms.
</h3>

<p align="center">
  <strong><a href="YOUR_LIVE_DEMO_URL">View Live Demo »</a></strong>
</p>

<br>

---

## About The Project

This project was built to bring fundamental graph traversal algorithms to life. It provides an interactive and intuitive way to understand how different algorithms navigate a grid to find the shortest path from a start to a target node. Users can draw walls, generate complex mazes, and compare the performance of various algorithms in real-time.

This project demonstrates a solid understanding of core computer science concepts, data structures, and front-end development with a modern tech stack.

---

## Key Features

* **Interactive Grid:** Click and drag to draw walls, creating custom obstacles for the algorithms to navigate.
* **Draggable Nodes:** Easily move the start (green) and target (red) nodes to any position on the grid.
* **Multiple Algorithm Visualizations:** Select and visualize a variety of classic pathfinding algorithms.
* **Advanced Maze Generation:**
    * **Recursive Division:** Generates complex, structured mazes with long corridors and distinct rooms.
    * **Random Walls:** Creates a scattered, random field of obstacles.
* **Performance Analysis:** After each visualization, key metrics are displayed to allow for direct comparison of algorithm efficiency:
    * Path Length
    * Number of Nodes Visited
    * Execution Time (in milliseconds)
* **Clean & Responsive UI:** Built with a modern design that works seamlessly on all screen sizes.

---

## Algorithms Implemented

This visualizer showcases four fundamental pathfinding algorithms, each with its unique approach to solving the maze.

| Algorithm      | Guarantees Shortest Path | Description                                                                                             |
| :------------- | :----------------------- | :------------------------------------------------------------------------------------------------------ |
| **Dijkstra's** | **Yes** | The classic weighted algorithm; explores outwards from the start, guaranteeing the shortest path.         |
| **A\* Search** | **Yes** | An optimized version of Dijkstra's that uses a heuristic to intelligently guide its search toward the target. |
| **BFS** | **Yes (Unweighted)** | Explores all neighbors at the present depth prior to moving on to the nodes at the next depth level.    |
| **DFS** | **No** | Explores as far as possible along each branch before backtracking, finding a path but not necessarily the shortest one. |

---

## Tech Stack

This project was built using a modern and professional technology stack.

* **[React.js](https://reactjs.org/):** A powerful JavaScript library for building user interfaces.
* **[TypeScript](https://www.typescriptlang.org/):** For adding static types to JavaScript, improving code quality and maintainability.
* **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* **Node.js** and **npm** installed on your machine. You can download them [here](https://nodejs.org/).

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone YOUR_GITHUB_REPO_LINK
    ```
2.  Navigate into the project directory:
    ```sh
    cd pathfinder-visualizer
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Start the development server:
    ```sh
    npm start
    ```
    The application will open at `http://localhost:3000`.

---

## Contact

**Suraj Sa**

* **LinkedIn:** [https://www.linkedin.com/in/suraj-sa-69a4b6289](https://www.linkedin.com/in/suraj-sa-69a4b6289)
* **Email:** [surajsa0903@gmail.com](mailto:surajsa0903@gmail.com)

Project Link: [YOUR_GITHUB_REPO_LINK](YOUR_GITHUB_REPO_LINK)
