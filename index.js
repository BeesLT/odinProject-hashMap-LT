const { HashMap } = require('./hash_map_practice');
const hashMap = new HashMap();

hashMap.set('green', 'grass');
hashMap.set('blue', 'eyes');
hashMap.set('red', 'sunset');
hashMap.set('wings', 'bird');

console.log(hashMap.get('wings'));
hashMap.set('wings', 'plane');
hashMap.set('solid', 'rock');

console.log(hashMap.get('wings'));
console.log(hashMap.has('red'));
console.log(hashMap.length());
console.log(hashMap.remove('red'));
console.log(hashMap.has('red'));
console.log(hashMap.entries());