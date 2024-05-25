def square_sums(N):
    def is_square(num):
        square_root = int(num ** 0.5)
        return square_root * square_root == num

    def hamiltonian_path(graph, current_path, visited):
        if len(current_path) == N:
            return current_path

        for neighbor in graph[current_path[-1]]:
            if not visited[neighbor]:
                visited[neighbor] = True
                result = hamiltonian_path(graph, current_path + [neighbor], visited)
                if result:
                    return result
                visited[neighbor] = False

        return []

    # Create a graph representing valid connections between numbers
    graph = {i: [] for i in range(1, N + 1)}
    for i in range(1, N + 1):
        for j in range(i + 1, N + 1):
            if is_square(i + j):
                graph[i].append(j)
                graph[j].append(i)

    # Find Hamiltonian path
    for start_node in range(1, N + 1):
        result = hamiltonian_path(graph, [start_node], {i: False for i in range(1, N + 1)})
        if result and set(result) == set(range(1, N + 1)):
            return result

    return False

