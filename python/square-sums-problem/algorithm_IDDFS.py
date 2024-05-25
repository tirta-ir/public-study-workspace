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

    def dls(start, depth):
        stack = [(start, [start])]
        while stack:
            node, path = stack.pop()
            if len(path) == depth:
                yield path
            if len(path) < depth:
                for neighbor in graph[node]:
                    if neighbor not in path:
                        stack.append((neighbor, path + [neighbor]))

    def iddfs(start, max_depth):
        for depth in range(1, max_depth + 1):
            yield from dls(start, depth)

    # Sort the nodes based on the number of connections
    nodes_sorted = sorted(graph.keys(), key=lambda x: len(graph[x]))

    for start_node in nodes_sorted:
        for path in iddfs(start_node, N):
            if len(path) == N:
                return path

    return False
