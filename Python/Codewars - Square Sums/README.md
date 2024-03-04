
# Exploring Efficient Algorithms for the 'Square Sums' Problem

The **Square Sums Problem** is a challenging task from Code Wars, classified as a 1 Kyu problem. The task requires the creation of a function that, given an integer number `N`, generates an array of integers from 1 to `N`. The arrangement of these integers should be such that the sum of every two consecutive numbers forms a perfect square.

A solution is deemed valid if it satisfies the following two criteria:

1. Each number in the range 1 to `N` is used exactly once.
2. The sum of every two consecutive numbers is a perfect square.

## Table of Contents
1. [Example](#Example)
2. [Test Constraints](#Test-Constraints)
3. [Solutions](#Solutions)
4. [Results Comparison](#Results-Comparison)
5. [Summary](#Summary)

## Example 
For instance, consider N=15. A possible solution could be:

```
[ 9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8 ]
```

Upon verification, we find that all numbers are used exactly once. When sorted in ascending order, the array appears as follows:

```
[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
```

Moreover, the sum of every two consecutive numbers is a perfect square:

```
   16    16     16     16     16     16     16
   /+\   /+\    /+\    /+\    /+\    /+\    /+\
[ 9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8 ]
      \+/    \+/    \+/    \+/    \+/    \+/    \+/
       9     25      9     25      9     25      9
```
here:
```
9   = 3*3
16  = 4*4
25  = 5*5    
```

If no solution exists, the function should return False (or an empty vector in C++, null in Java). For example, for `N=5`, the numbers 1,2,3,4,5 cannot be arranged into a square sums row: 1+3=4, 4+5=9, but 2 has no pairs and cannot link [1,3] and [4,5].

## Test Constraints
The constraints for the tests are as follows:

- 1 <= `N` <= 1000
- All possible values of `N` are tested
- Brute force solutions can only go up to `N=50`.
- Code size is restricted to a maximum of 20K, and external modules are disabled: inlining all precalculated results is not an option.

## Solutions
In solving this problem, I experimented several methods namely A* Search, DFS, HP, IDDFS which are coded using Python. These four methods are measured in terms of complexity and runtime to determine which algorithm is most suitable for solving this problem.

### A* Search
A* (pronounced “A-star”) Search is a graph traversal and pathfinding algorithm widely used in computer science due to its completeness, optimality, and optimal efficiency. Given a weighted graph, a source node, and a goal node, the algorithm finds the shortest path (with respect to the given weights) from source to goal. It achieves better performance by using heuristics to guide its search.

Here's the A* pseudocode:
```js
1. Function square_sums(N):
2.     Define function is_square(num) that checks if num is a perfect square
3.     Initialize an empty graph with nodes from 1 to N
4.     For each pair of nodes (i, j) in the graph:
5.         If the sum of i and j is a perfect square:
6.             Add an edge between i and j in the graph
7.     Sort the nodes in the graph based on their degree (number of connections)
8.     For each node in the sorted list of nodes:
9.         Initialize a priority queue with the node as the only element
10.        While the queue is not empty:
11.            Dequeue a node from the priority queue
12.            If the dequeued node completes a valid path:
13.                Return the path
14.            For each neighbor of the dequeued node:
15.                If the neighbor is not in the current path:
16.                    Enqueue the neighbor to the priority queue with priority based on the number of remaining nodes
17.    If no valid path is found after checking all nodes:
18.        Return False
19. End Function
```

### Depth-First Search (DFS)
DFS is a recursive algorithm for searching all the vertices of a graph or tree data structure. It starts at a root node and explores as far as possible along each branch before backtracking. DFS is known for its space efficiency and is often used when we want to traverse or search a graph or a tree.

Here's the DFS Pseudocode:
```js
1.  Function square_sums(N):
2.      Define function is_square(num) that checks if num is a perfect square
3.      Define function hamiltonian_path(graph, current_path, visited):
4.          If the length of current_path is N:
5.              Return current_path
6.          For each neighbor in the graph of the last node in current_path:
7.              If neighbor is not visited:
8.                  Mark neighbor as visited
9.                  Call hamiltonian_path with updated current_path and visited
10.                 If result is not empty:
11.                     Return result
12.                 Mark neighbor as not visited
13.         Return empty list
14.     Initialize an empty graph with nodes from 1 to N
15.     For each pair of nodes (i, j) in the graph:
16.         If the sum of i and j is a perfect square:
17.             Add an edge between i and j in the graph
18.     For each start_node from 1 to N:
19.         Initialize visited as False for all nodes
20.         Initialize current_path as a list with start_node
21.         Call hamiltonian_path with graph, current_path, and visited
22.         If result is not empty and contains all numbers from 1 to N:
23.             Return result
24.     If no valid path is found after checking all nodes:
25.         Return False
26. End Function
```

### Modified Depth-First Search (MDFS)
Modified Depth-First Search (MDFS) is an adaptation of the standard Depth-First Search (DFS) algorithm, tailored to solve specific problems more efficiently. Like DFS, this algorithm starts at a root node and explores as far as possible along each branch before backtracking. However, MDFS incorporates additional checks and heuristics to guide the search process.

In the context of this problem, MDFS includes a validation step to ensure that a found path meets the problem’s conditions (i.e., the sum of every two consecutive numbers is a perfect square). Furthermore, MDFS uses a heuristic to prioritize nodes with fewer connections during the search, potentially leading to more efficient exploration of the graph.

Here's the MDFS Pseudocode:
```js
1.  Function square_sums(N):
2.      Define function is_square(num) that checks if num is a perfect square
3.      Define function is_valid_path(path) that checks if a path is valid
4.      Define function dfs(node) that performs a depth-first search
5.          Mark node as visited
6.          Add node to the path
7.          If the length of path is N:
8.              Return path
9.          Sort the neighbors of node based on their degree
10.         For each neighbor of node:
11.             If neighbor is not visited:
12.                 Call dfs with neighbor
13.                 If result is not empty:
14.                     Return result
15.         Mark node as not visited and remove it from the path
16.         Return empty list
17.     Initialize an empty graph with nodes from 1 to N
18.     For each pair of nodes (i, j) in the graph:
19.         If the sum of i and j is a perfect square:
20.             Add an edge between i and j in the graph
21.     Sort the nodes in the graph based on their degree
22.     For each start_node in the sorted list of nodes:
23.         Initialize visited as False for all nodes
24.         Initialize path as an empty list
25.         Call dfs with start_node
26.         If result is not empty and is a valid path:
27.             Return result
28.     If no valid path is found after checking all nodes:
29.         Return False
30. End Function
```

### Iterative Deepening Depth-First Search (IDDFS)
IDDFS is a state space/graph search strategy in which a depth-limited version of depth-first search is run repeatedly with increasing depth limits until the goal is found. IDDFS is optimal like breadth-first search and is as space-efficient as depth-first search.

Here's the IDDFS Pseudocode:
```js
1.  Function square_sums(N):
2.      Define function is_square(num) that checks if num is a perfect square
3.      Initialize an empty graph with nodes from 1 to N
4.      For each pair of nodes (i, j) in the graph:
5.          If the sum of i and j is a perfect square:
6.              Add an edge between i and j in the graph
7.      Define function dls(start, depth) that performs a depth-limited search
8.          Initialize a stack with start as the only element
9.          While the stack is not empty:
10.             Pop a node from the stack
11.             If the length of path is equal to depth:
12.                 Yield path
13.             If the length of path is less than depth:
14.                 For each neighbor of node:
15.                     If neighbor is not in the path:
16.                         Push neighbor to the stack
17.     Define function iddfs(start, max_depth) that performs an iterative deepening depth-first search
18.         For each depth from 1 to max_depth:
19.             Yield from dls(start, depth)
20.     Sort the nodes in the graph based on their degree
21.     For each start_node in the sorted list of nodes:
22.         For each path in iddfs(start_node, N):
23.             If the length of path is N:
24.                 Return path
25.     If no valid path is found after checking all nodes:
26.         Return False
27. End Function
```

## Results Comparison

| Algorithm | Runtime (ms) |
|-----------|--------------|
| DFS       | 1197.15      |
| A* Search | 334.08       |
| MDFS      | 3.65         |
| IDDFS     | 110755.20    |

Based on the table above, the four different algorithms applied to the Square Sums problem, each exhibited unique performance characteristics. The Depth-First Search (DFS) algorithm, known for its **simplicity and intuitiveness**, had a runtime of 1197.15 ms. 

However, its efficiency can **decrease for large graphs** or **when the solution is far from the root**. The A-star Search algorithm significantly outperformed DFS with a runtime of 334.08 ms. This improvement is **attributed to the heuristic used** by A* Search, which guides the search and leads to more efficient exploration of the graph. 

The Modified Depth-First Search (MDFS) algorithm, which includes additional **checks for path validity** and **a heuristic to guide the search**, demonstrated the **fastest runtime** of all four algorithms at 3.65 ms. 

On the other hand, the Iterative Deepening Depth-First Search (IDDFS) algorithm, **despite its completeness and guarantee to find a solution if one exists**, had the **slowest runtime** at 110755.20 ms. This is due to its **repeated exploration** of the same nodes at each depth level, which can lead to **inefficiencies**. Thus, while each algorithm has its strengths and weaknesses, MDFS showed the most efficient performance in this case.

## Summary
The study case focused on the Square Sums problem, which requires arranging a sequence of numbers from 1 to N such that the sum of every two consecutive numbers is a perfect square. Four different algorithms were implemented to solve this problem: Depth-First Search (DFS), A* Search, Modified Depth-First Search (MDFS), and Iterative Deepening Depth-First Search (IDDFS). Here's the summary between the four algorithm:

1. DFS, a simple and intuitive algorithm. It can be inefficient for large graphs or when the solution is far from the root. 
2. A-star Search, which uses a heuristic to guide its search, significantly outperformed DFS. 
3. MDFS, which includes additional checks for path validity and a heuristic to guide the search, demonstrated the fastest runtime of all four algorithms. 
4. IDDFS, despite its completeness and guarantee to find a solution if one exists, had the slowest runtime due to its repeated exploration of the same nodes at each depth level.
