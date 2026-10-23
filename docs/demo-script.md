# Demo Video Script (about 4 min 30 s)

**Before recording:** open `index.html`, click Solver > "Load textbook example" so the numbers below match your screen. Use 1080p screen capture plus your voice. Lines in *italics* are screen actions ("SWITCH" = change page or tab). Spoken lines are in quotes. Reword anything so it sounds like you.

---

## 1. Introduction (0:00 – 0:25)
*Screen: Home page.*
"Hello, I am U Asish Varma, registration number 24BAI0077. This is my Artificial Intelligence case study: an interactive 8-Puzzle solver that visualizes AI search. My assigned algorithm is number 2, Depth First Search. In this video I will cover the algorithms, the solving process, the comparison, the heuristics, and the project features."

## 2. The problem as a search problem (0:25 – 0:50)
*Screen: stay on Home, point at the animated board and the problem description.*
"The 8-Puzzle is a 3 by 3 grid with tiles 1 to 8 and a blank. A state is one arrangement of the grid. Actions are the legal blank moves, up, down, left or right. Every move costs one, and the goal test compares a state with the goal. Only half of the 362,880 arrangements can reach a given goal, so the app checks solvability using inversion parity."

## 3. Puzzle input (0:50 – 1:10)
*SWITCH: click **Solver** in the navbar. Click "Load textbook example", then "Generate Random Puzzle", then "Load textbook example" again. Type a wrong digit once to show the error message.*
"I can type the initial and goal states, or generate a random solvable puzzle. If the input is invalid, or the puzzle is unsolvable, the app tells me immediately."

## 4. Depth First Search, the assigned algorithm (1:10 – 2:20)
*Algorithm dropdown: DFS, depth cap 30. Click **Run**. Point at the board, then the Search process card. Use Pause, Next Step, Previous Step, drag the step slider, change Speed.*
"DFS keeps its frontier in a stack, last in, first out, so the deepest node is expanded first. For each step the panel shows the current node, its parent, depth, path cost, the generated successors, the stack and the explored list. A visited set stops repeated states and a depth cap of 30 stops endless descent. The tiles turn teal when they reach their goal position, and the meter shows how close the board is. I can pause, step forward and back, scrub the slider, or use the keyboard: Space, arrow keys and R."
*Let it finish. Scroll to **Solution summary**, then **Final solution path**. Click one step in the path.*
"DFS found a valid solution, but with 25 moves, after expanding about 33,857 nodes. The best solution is only 5 moves. This shows that DFS is complete here because of the visited set and depth cap, but it is not optimal. Clicking any step in the path jumps the board to it."

## 5. Other algorithms in the solver (2:20 – 2:50)
*Change the dropdown to **BFS** and Run to the end, then **A\*** (heuristic Manhattan) and Run to the end. Point at "optimal" note in the summary.*
"The same visualizer runs all six algorithms. BFS uses a queue and finds 5 moves. A star uses a priority list ordered by f equals g plus h and also finds 5 moves, but expands only 6 nodes. The summary tells me whether the result is optimal."

## 6. Comparison page (2:50 – 3:40)
*SWITCH: click **Comparison**. Heuristic: Manhattan. Click "Compare all six". Point at the bars and the "shortest" and "fewest" tags.*
"On the same puzzle: BFS finds 5 moves expanding 35 nodes. DFS finds 25 moves expanding about 33,857 nodes. DLS with limit 12 and IDDLS both find 5 moves, expanding 86 and 73 nodes. GBFS and A star expand just 6 nodes. The bar chart makes the difference clear: informed search is far more efficient, BFS, IDDLS and A star are optimal, and DFS and GBFS are not guaranteed to be."

## 7. Heuristic functions (3:40 – 4:00)
*Switch the Heuristic dropdown to Misplaced Tiles and click Compare again. Point at A\*.*
"I implemented two heuristics. Misplaced Tiles counts tiles that are not in their goal position. Manhattan Distance sums each tile's horizontal and vertical distance from its goal cell. Both never overestimate, so they are admissible, and A star stays optimal. Manhattan is more informed, so it usually expands fewer nodes: here A star expands 6 nodes with Manhattan and 7 with Misplaced Tiles."

## 8. Algorithm information and project features (4:00 – 4:25)
*SWITCH: click **Algorithms**, scroll the cards slowly. Then show the GitHub repo/README.*
"The Algorithms page explains each method's working principle, advantages, limitations, time and space complexity, completeness and optimality. For DFS, time is O of b to the m, space is O of b times m, and it is not optimal. Overall, the project offers input validation, a random puzzle generator, six algorithms, two heuristics, animated step-by-step replay with a scrubber, a solution summary with time and memory estimates, and a comparison page. The code is on GitHub with a README and a live GitHub Pages link."

## 9. Academic integrity statement (4:25 – 4:40)
*Screen: README References section or a closing slide.*
"Academic integrity: all six search algorithms and both heuristics were written from scratch in JavaScript, with no search libraries. I used Bootstrap 5 for layout and the Bricolage Grotesque font from Google Fonts. The theory follows Russell and Norvig, Artificial Intelligence: A Modern Approach, and the course assignment brief. I used an AI assistant, Claude by Anthropic, to help improve the interface and add features, and I reviewed, tested and understand all of the code. Thank you."

---

### Quick checklist
- Total length about 4:30 (limit is 3 to 5 minutes). Speak slightly slower if you finish under 3:30.
- Numbers (25 moves, 33,857 nodes, 35, 86, 73, 6, 7) are for the **textbook example** with depth cap 30. Random puzzles give different numbers, so read them from your screen instead.
- Add the AI-assistant line to the README References too, so the video and the repository say the same thing. Remove or edit that sentence if you did not use AI help.
