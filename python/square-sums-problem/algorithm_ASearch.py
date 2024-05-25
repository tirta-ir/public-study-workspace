import heapq

def square_sums(N):
    def is_square(num):
        square_root = int(num ** 0.5)
        return square_root * square_root == num

    # Create a graph representing valid connections between numbers
    graph = {i: [] for i in range(1, N + 1)}
    for i in range(1, N + 1):
        for j in range(i + 1, N + 1):
            if is_square(i + j):
                graph[i].append(j)
                graph[j].append(i)

    # Sort the nodes based on the number of connections
    nodes_sorted = sorted(graph.keys(), key=lambda x: len(graph[x]))

    for start_node in nodes_sorted:
        # Use a priority queue with the heuristic of the number of remaining numbers
        queue = [(N, start_node, [start_node], {start_node})]
        while queue:
            _, node, path, used = heapq.heappop(queue)
            if len(path) == N:
                return path
            for neighbor in sorted(graph[node], key=lambda x: len(graph[x])):
                if neighbor not in used:
                    # Push into the queue with the priority as the negative of the number of remaining numbers
                    heapq.heappush(queue, (N - len(path), neighbor, path + [neighbor], used | {neighbor}))

    return False