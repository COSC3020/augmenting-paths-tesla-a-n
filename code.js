function augmentingPath(graph, start, end) {
    // If start and end are the same, return just that node
    if (start === end) {
        return [start];
    }
    
    // Queue for BFS
    let queue = [start];
    
    // Keep track of visited nodes
    let visited = {};
    visited[start] = true;
    
    // Store the path
    let parent = {};
    
    // BFS to find a path
    while (queue.length > 0) {
        let current = queue.shift();
        
        // Check all neighbors of current node
        for (let neighbor in graph[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                parent[neighbor] = current;
                queue.push(neighbor);
                
                // If we found the end node, reconstruct and return the path
                if (neighbor === end) {
                    let path = [end];
                    let node = end;
                    
                    while (node !== start) {
                        node = parent[node];
                        path.unshift(node);
                    }
                    
                    return path;
                }
            }
        }
    }
    
    // No path found
    return [];
}
