// Performance with list transformers
let bigData = [];
for (let i = 0; i < 1000000; i++) {
  bigData[i] = i;
}
// Slow
let filterBegin = Date.now();
const filterMappedBigData = bigData
  .filter(value => value % 2 === 0)
  .map(value => value * 2);

let filterEnd = Date.now();
let filtertimeSpent = (filterEnd - filterBegin) / 1000 + "secs";
// Fast
let reducedBegin = Date.now();
const reducedBigData = bigData.reduce((acc, value) => {
  if (value % 2 === 0) {
    acc.push(value * 2);
  }
  return acc;
}, []);
let reducedEnd = Date.now();
let reducedtimeSpent = (reducedEnd - reducedBegin) / 1000 + " secs";
console.log("filtered Big Data:", filtertimeSpent); //0.072secs
console.log("reduced Big Data:", reducedtimeSpent); //0.034 secs

// Example Reduce JS:
// 1.
const voters = [
  { name: 'Bob', age: 10, voted: true },
  { name: 'Jake', age: 32, voted: true },
  { name: 'Kate', age: 25, voted: false },
  { name: 'Sam', age: 20, voted: false },
  { name: 'Phil', age: 21, voted: true },
  { name: 'Ed', age: 55, voted: true },
  { name: 'Tami', age: 54, voted: true },
  { name: 'Mary', age: 31, voted: false },
  { name: 'Becky', age: 43, voted: false },
  { name: 'Joey', age: 41, voted: true },
  { name: 'Jeff', age: 30, voted: true },
  { name: 'Zack', age: 19, voted: false },
];
class CountVote {
  youngVotes: number = 0;
  youth: number = 0;
  midyouthVotes: number = 0;
  oldVotes: number = 0;
}
const countVotes = voters.reduce((acc, voter) => {
  if (voter.voted) {
    acc.youngVotes = voter.age < 25 ? acc.youngVotes + 1 : acc.youngVotes;
    acc.youth = voter.age >= 25 && voter.age < 40 ? acc.youth + 1 : acc.youth;
    acc.midyouthVotes = voter.age >= 40 && voter.age < 50 ? acc.midyouthVotes + 1 : acc.midyouthVotes;
    acc.oldVotes = voter.age >= 50 ? acc.oldVotes + 1 : acc.oldVotes;
  }
  return acc;
}, new CountVote());

console.log(countVotes);

// 2.
class CountColor {
  white: number = 0;
  red: number = 0;
  yellow: number = 0;
  green: number = 0;
}
const iceCreams = [
  { flavor: 'pineapple', color: 'white' },
  { flavor: 'strawberry', color: 'red' },
  { flavor: 'watermelon', color: 'red' },
  { flavor: 'kiwi', color: 'green' },
  { flavor: 'mango', color: 'yellow' },
  { flavor: 'pear', color: 'green' }
];
const count = iceCreams.reduce((countColor: CountColor, iceCream) => {
  countColor.green = iceCream.color === 'green' ? countColor.green + 1 : countColor.green;
  countColor.red = iceCream.color === 'red' ? countColor.red + 1 : countColor.red;
  countColor.white = iceCream.color === 'white' ? countColor.white + 1 : countColor.white;
  countColor.yellow = iceCream.color === 'yelllow' ? countColor.yellow + 1 : countColor.yellow
  return countColor;
}, new CountColor());
console.log(count)

// 3. 
const flavours = [
  "strawberry",
  "strawberry",
  "kiwi",
  "kiwi",
  "kiwi",
  "strawberry",
  "mango",
  "kiwi",
  "banana"
];
class CountFruit {
  strawberry: number = 0;
  kiwi: number = 0;
  mango: number = 0;
  banana: number = 0;
}
const countFr = flavours.reduce((countFruit: CountFruit, fruit) => {
  countFruit.banana = fruit === "banana" ? countFruit.banana + 1 : countFruit.banana;
  countFruit.kiwi = fruit === "kiwi" ? countFruit.kiwi + 1 : countFruit.kiwi;
  countFruit.strawberry = fruit === "strawberry" ? countFruit.strawberry + 1 : countFruit.strawberry;
  countFruit.mango = fruit === "mango" ? countFruit.mango + 1 : countFruit.mango;
  return countFruit;
}, new CountFruit)
console.log(countFr);

const countFr2 = flavours.reduce((acc, item) => {
  acc[item] = !acc[item] ? acc[item] = 1 : acc[item] + 1
  return acc;
}, {})
console.log(countFr2)

// 4.
var voters_ = [
  { name: 'Bob', age: 30, voted: true },
  { name: 'Jake', age: 32, voted: true },
  { name: 'Kate', age: 25, voted: false },
  { name: 'Sam', age: 20, voted: false },
  { name: 'Phil', age: 21, voted: true },
  { name: 'Ed', age: 55, voted: true },
  { name: 'Tami', age: 54, voted: true },
  { name: 'Mary', age: 31, voted: false },
  { name: 'Becky', age: 43, voted: false },
  { name: 'Joey', age: 41, voted: true },
  { name: 'Jeff', age: 30, voted: true },
  { name: 'Zack', age: 19, voted: false }
];
const totalVotes = voters_.reduce((acc, item) => {
  if (item.voted) {
    acc++
  }
  return acc;
}, 0);
console.log(totalVotes)

// 5.
var wishlist = [
  { title: "Tesla Model S", price: 90000 },
  { title: "4 carat diamond ring", price: 45000 },
  { title: "Fancy hacky Sack", price: 5 },
  { title: "Gold fidgit spinner", price: 2000 },
  { title: "A second Tesla Model S", price: 90000 }
];
const shoppingSpree = wishlist.reduce((acc, item) => {
  acc += item.price
  return acc;
}, 0)

// 6.
var arrays = [
  ["1", "2", "3"],
  [true],
  [4, 5, 6]
];
const flat = arrays.reduce((acc, item) => [...acc, ...item], []);

// 7. Reduce string;
const countLetters = string => {
  return string.split("").reduce((acc, currentLetter) => {
    acc[currentLetter] = !acc[currentLetter] ? 1 : acc[currentLetter] + 1
    return acc
  }, {})
}
console.log(countLetters('abbcccddddeeeeeahdhdaabbcc'))

// 8. 
const input = ['Steve', 'Sally', 'George', 'Gina'];
const output = input.reduce((acc, currName) => {
  acc = acc + ` ${currName},`
  return acc;
}, 'Congratulations ');

// 9. Map
const animals = [
  {
    "name": "cat",
    "size": "small",
    "weight": 5
  },
  {
    "name": "dog",
    "size": "small",
    "weight": 10
  },
  {
    "name": "lion",
    "size": "medium",
    "weight": 150
  },
  {
    "name": "elephant",
    "size": "big",
    "weight": 5000
  }
]
const arrNames = animals.map(animal => animal.name);
const filterSmallAnimal = animals.filter(animal => animal.size === 'small');
const sumW = animals.reduce((total, animal) => {
  total += animal.weight;
  return total
}, 0);
console.log(sumW)

// 10. find allBooks
var friends = [{
  name: 'Anna',
  books: ['Bible', 'Harry Potter'],
  age: 21
}, {
  name: 'Bob',
  books: ['War and peace', 'Romeo and Juliet'],
  age: 26
}, {
  name: 'Alice',
  books: ['The Lord of the Rings', 'The Shining'],
  age: 18
}];
const allBooks = friends.reduce((acc, item) => {
  acc = acc.concat(item.books)
  return acc;
}, ['Alphabet']);
console.log(allBooks);

// 11. Count Names
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const countNames = names.reduce((acc, name) => {
  acc[name] = acc.hasOwnProperty(name) ? acc[name] + 1 : 1
  return acc;
}, {});
console.log(countNames)

// 12. Remove duplicate in Arrray;
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
const uniqArr = myArray.reduce((acc, item) => {
  if (acc.indexOf(item) === -1) {
    acc.push(item)
  }
  return acc;
}, []);
console.log(uniqArr)

// 13.
const topics = [
  {
    topic: 'ReactJS',
    posts: [
      { postID: 'id1', title: 'title1' },
      { postID: 'id2', title: 'title2' },
    ]
  },
  {
    topic: 'Vue.js',
    posts: [
      { postID: 'id3', title: 'title3' },
      { postID: 'id4', title: 'title4' },
    ]
  }
]
const allPosts = topics.reduce((acc, item) => {
  acc = acc.concat(item.posts)
  return acc;
}, []);
console.log(allPosts);
const dictionary = allPosts.reduce((acc, item) => {
  acc[item.postID] = item;
  return acc;
}, {})
console.log(dictionary)

// 14. Nhom cac doi tuong theo thuoc tinh;
var peoples = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];
const groupedPeople = peoples.reduce((acc, item) => {
  acc[item.age] = !acc[item.age] ? [item] : 
  return acc;
}, {});
console.log(groupedPeople)
