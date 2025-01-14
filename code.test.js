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
