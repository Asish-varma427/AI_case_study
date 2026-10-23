<<<<<<< HEAD
# AI 8-Puzzle Visualizer (Depth First Search)

Artificial Intelligence, Digital Assignment (Case Study): Interactive 8-Puzzle Problem Solver using AI Search Algorithms.

## Project Description
A browser app that solves the 8-Puzzle as a state-space search problem and shows how **Depth First Search (DFS)** explores it: the current node, its successors, the stack (frontier), the explored list and the final animated solution path. A comparison page runs BFS, DFS, DLS, IDDLS, GBFS and A* on the same puzzle.



## Features
- Home page, Solver, Comparison page and Algorithm Information page
- Puzzle input: type initial and goal states, or generate a random solvable puzzle
- Solvability check using inversion parity
- Animated tile movement, successor states, stack and explored list
- Controls: Run, Pause, Resume, Next Step, Previous Step, Reset, Speed
- Solver runs any of the six algorithms (DFS, BFS, DLS, IDDLS, GBFS, A*) with a heuristic choice, a step scrubber, clickable solution path, keyboard shortcuts, green tiles when in goal position and a goal progress meter
- Comparison table has bar charts for nodes expanded and highlights the shortest and cheapest-to-search results
- Solution summary: found or not, moves, nodes generated and expanded, maximum depth, execution time, path cost, approximate memory

## Technologies Used
HTML5, CSS3, JavaScript (ES6), Bootstrap 5. All search algorithms are written from scratch, with no search libraries.

## Search Algorithms Implemented
- **Assigned (interactive solver): Depth First Search.** LIFO stack, visited set keyed by state string, and a depth cap (default 30).
- **Comparison page only:** BFS, DLS, IDDLS, GBFS, A*.

## Heuristics Used
- **Misplaced Tiles:** count of tiles not in their goal position.
- **Manhattan Distance:** sum of horizontal and vertical distances of each tile from its goal cell.

Both are used by GBFS (f = h) and A* (f = g + h) on the comparison page.

## Sample Result
Initial `2 8 3 / 1 6 4 / 7 _ 5` to goal `1 2 3 / 8 _ 4 / 7 6 5`: BFS, IDDLS, GBFS and A* find a 5-move solution, while DFS (depth cap 30) finds a valid 25-move path. This shows DFS is not optimal.

## Screenshots
Take three screenshots after running the app (Home, Solver mid-search, Comparison), save them as `home.png`, `solver.png`, `comparison.png`, then link them. Add images to the `images/` folder and link them here:

![Home](images/home.png)
![Solver](images/solver.png)
![Comparison](images/comparison.png)

## Repository Structure
```
AI-8Puzzle-Visualizer/
  index.html
  css/style.css
  js/app.js
  assets/
  images/
  docs/
  README.md
```

## How to Run the Project
1. Download or clone the repository.
2. Open `index.html` in a browser (an internet connection is needed to load Bootstrap and the font from CDNs).
3. Press "Load textbook example" or "Generate Random Puzzle", then press Run.

To deploy: push to GitHub, open Settings, then Pages, choose the main branch and the root folder, and save.

## Student Details
- Name: U ASISH VARMA
- Registration Number: 24BAI0077
- Course: Artificial Intelligence
- Assigned Algorithm: 2, Depth First Search

## References
- Russell, S. and Norvig, P., *Artificial Intelligence: A Modern Approach*, Pearson.
- Bootstrap 5 documentation: https://getbootstrap.com
- Google Fonts, Bricolage Grotesque: https://fonts.google.com
- Course assignment brief, Artificial Intelligence Digital Assignment (Case Study).
- AI assistance: Claude (Anthropic) was used to help improve the interface and add features; all code was reviewed and tested by the student.
=======
# AI_case_study
>>>>>>> a50ef0aeedb73b764eb68ec98e0479025d352ef0
