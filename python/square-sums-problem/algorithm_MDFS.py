def square_sums(N):
    def is_square(num):
        square_root = int(num ** 0.5)
        return square_root * square_root == num

    def is_valid_path(path):
        for i in range(len(path) - 1):
            if not is_square(path[i] + path[i + 1]):
                return False
        return True

    def dfs(node):
        visited[node] = True
        path.append(node)

        if len(path) == N:
            return path

        neighbors = sorted(graph[node], key=lambda x: len(graph[x]))
        for neighbor in neighbors:
            if not visited[neighbor]:
                result = dfs(neighbor)
                if result:
                    return result

        visited[node] = False
        path.pop()
        return []

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
        visited = {i: False for i in range(1, N + 1)}
        path = []
        result = dfs(start_node)

        if result and is_valid_path(result):
            return result

    return False
