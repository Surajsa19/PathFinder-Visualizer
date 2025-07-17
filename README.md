# PathFinder Visualizer

<p align="center">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/152869815/467389214-2a995eec-ba40-4ef4-8bac-2c21dce7640e.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250717%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250717T064810Z&X-Amz-Expires=300&X-Amz-Signature=6726b59cdac6e650a2ed33206271fd87978c64c72740ebfbba7d6aef6d315634&X-Amz-SignedHeaders=host" alt="Pathfinder Visualizer Logo" />
</p>

<h3 align="center">
  An interactive web application for visualizing classic pathfinding and maze generation algorithms.
</h3>

<p align="center">
  <strong><a href="https://pathfinder-visualizer-suraj.netlify.app/">View Live Demo »</a></strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS Badge">
</p>

---

<!-- **IMPORTANT**: To create a GIF, use a free tool like ScreenToGif or Giphy Capture to record your screen while you use the app. Then, upload the GIF to your README's folder and change the link below. -->
<p align="center">
  <img src="https://i.imgur.com/your-demo-gif.gif" alt="Project Demo GIF">
</p>

---

## About The Project

This project was born from a passion for understanding the core principles of computer science. While it's one thing to learn about algorithms in theory, it's another to see them in action. This visualizer was built to bridge that gap, providing an interactive sandbox to explore how different algorithms solve the complex problem of finding the shortest path.

It's a demonstration of not just front-end development skills, but also a deep appreciation for the data structures and logic that power modern software.

## Key Features

* **Interactive Grid:** Dynamically create complex mazes by clicking and dragging to draw walls.
* **Algorithm Comparison:** Visualize and directly compare the performance of four fundamental pathfinding algorithms.
* **Advanced Maze Generation:** Go beyond simple walls with a built-in Recursive Division algorithm that creates intricate, solvable mazes.
* **Real-time Performance Metrics:** Instantly see the efficiency of each algorithm with statistics on Path Length, Nodes Visited, and Execution Time.
* **Draggable Start/Target Nodes:** Easily change the parameters of the problem by moving the start and target nodes.

## Algorithms Implemented

This visualizer showcases four fundamental pathfinding algorithms, each with its unique approach and trade-offs.

| Algorithm      | Guarantees Shortest Path | Key Characteristic                                                                                      |
| :------------- | :----------------------- | :------------------------------------------------------------------------------------------------------ |
| **Dijkstra's** | **Yes** | The foundational algorithm; explores layer by layer, guaranteeing the shortest path in a weighted graph.  |
| **A\* Search** | **Yes** | A "smarter" version of Dijkstra's; uses a heuristic to make an educated guess and guide its search efficiently. |
| **BFS** | **Yes (Unweighted)** | Explores all neighbors at the current depth before moving on. Excellent for finding the shortest path in terms of number of steps. |
| **DFS** | **No** | Dives deep down one path as far as it can go before backtracking. Finds a path quickly, but not necessarily the best one. |

## Challenges & Learnings

Building this project was a valuable learning experience. One of the main challenges was ensuring the animations ran smoothly without blocking the main UI thread, which was solved by carefully managing state updates and using `setTimeout` to create a non-blocking animation loop. Another challenge was correctly implementing the `Recursive Division` maze algorithm, which required a deep understanding of recursion and handling edge cases to create perfect mazes.

This project solidified my understanding of:
* **Complex State Management** in React with Hooks.
* The practical **trade-offs between different algorithms** and their time/space complexity.
* The importance of a **well-structured and modular codebase** for maintainability and scalability.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm installed.

### Installation

1.  Clone the repository:
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

---

## Contact

**Suraj Sa**

* **LinkedIn:** [https://www.linkedin.com/in/suraj-sa-69a4b6289](https://www.linkedin.com/in/suraj-sa-69a4b6289)
* **Email:** [surajsa0903@gmail.com](mailto:surajsa0903@gmail.com)
