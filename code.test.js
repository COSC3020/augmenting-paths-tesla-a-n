const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

var graph = {'foo': {'boo': 7},
    'boo': {'foo': 3, 'bar': 2},
    'bar': {'boo': 4}};
assert(JSON.stringify(augmentingPath(graph, 'foo', 'bar')) == JSON.stringify(['foo', 'boo', 'bar']));

var graph = {'foo': {'boo': 7, 'd': 4},
    'boo': {'e': 3},
    'd': {'bar': 4},
    'e': {'foo': 1},
    'bar': {'foo': 2}};
assert(JSON.stringify(augmentingPath(graph, 'foo', 'bar')) == JSON.stringify(['foo', 'd', 'bar']));

var graph = {'foo': {},
    'bar': {'foo': 1}};
assert(JSON.stringify(augmentingPath(graph, 'foo', 'bar')) == '[]');

var graph = {'foo': {},
    'bar': {'foo': 1}};
assert(JSON.stringify(augmentingPath(graph, 'foo', 'foo')) == JSON.stringify(['foo']));

// Test for a more complex graph with multiple possible paths
var complexGraph = {
    'A': {'B': 5, 'C': 3},
    'B': {'A': 2, 'D': 4, 'E': 2},
    'C': {'A': 1, 'D': 6},
    'D': {'B': 3, 'C': 2, 'F': 8},
    'E': {'B': 1, 'F': 5},
    'F': {'D': 4, 'E': 3}
};
// Should find one of the valid paths from A to F
const result = augmentingPath(complexGraph, 'A', 'F');
// Check if result is a valid path from A to F
let isValidPath = result.length > 0 && result[0] === 'A' && result[result.length-1] === 'F';
// Also check that each consecutive pair of nodes has an edge between them
for (let i = 0; i < result.length - 1; i++) {
    if (!complexGraph[result[i]][result[i+1]]) {
        isValidPath = false;
        break;
    }
}
assert(isValidPath, `Failed complex graph test. Path returned: ${result}`);

console.log("All tests passed!");
