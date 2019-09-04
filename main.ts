import { Injectable } from '@angular/core';
import moment from 'moment';
import { of } from 'rxjs/observable/of';

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

const countFr2 = flavours.reduce((acc, item) => {
  acc[item] = !acc[item] ? acc[item] = 1 : acc[item] + 1
  return acc;
}, {})
// 4.

var voters_ = [
  { name: 'Bob', age: 30, voted: true },
  { name: 'Jake', age: 32, voted: true },
  { name: 'Kate', age: 25, voted: false },
  { name: 'Sam', age: 19, voted: false },
  { name: 'Phil', age: 25, voted: true },
  { name: 'Ed', age: 54, voted: true },
  { name: 'Tami', age: 54, voted: true },
  { name: 'Mary', age: 32, voted: false },
  { name: 'Becky', age: 43, voted: false },
  { name: 'Joey', age: 43, voted: true },
  { name: 'Jeff', age: 30, voted: true },
  { name: 'Zack', age: 19, voted: false }
];
class AgeCategory {
  young: number = 0;
  mid: number = 0
  old: number = 0;
}
const mapVotedtoString = voters_.map(voter => Object.assign(voter, { voted: voter.voted.toString() }))
const groupedbyAgeRange = voters_.reduce((acc, voter) => {
  acc[voter.age] = acc[voter.age] || [];
  acc[voter.age].push(voter)
  return acc;
}, {})
const ageCategory = voters_.reduce((acc, voter) => {
  acc.young = voter.age < 20 ? acc.young + 1 : acc.young;
  acc.mid = voter.age > 20 && voter.age <= 40 ? acc.mid + 1 : acc.mid;
  acc.old = voter.age > 40 ? acc.old + 1 : acc.old;
  return acc;
}, new AgeCategory)
const totalVotes = voters_.reduce((acc, item) => {
  if (item.voted) {
    acc++
  }
  return acc;
}, 0);

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

// 11. Count Names
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const countNames = names.reduce((acc, name) => {
  acc[name] = acc.hasOwnProperty(name) ? acc[name] + 1 : 1
  return acc;
}, {});

// 12. Remove duplicate in Arrray;
var myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd'];
const uniqArr = myArray.reduce((acc, item) => {
  if (acc.indexOf(item) === -1) {
    acc.push(item)
  }
  return acc;
}, []);

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
const dictionary = allPosts.reduce((acc, item) => {
  acc[item.postID] = item;
  return acc;
}, {})

// 14. Nhom cac doi tuong theo thuoc tinh;
var peoples = [
  { name: 'Alice', age: 21 },
  { name: 'Max', age: 20 },
  { name: 'Jane', age: 20 }
];
const groupedPeople = peoples.reduce((peopleMap, people) => {
  peopleMap[people.age] = peopleMap[people.age] || []
  peopleMap[people.age] = [...peopleMap[people.age], people]
  // peopleMap[people.age].push(people)
  // peopleMap[people.age] = (peopleMap[people.age] || []).concat(people)
  return peopleMap;
}, {});

const data = [
  { a: 'happy', b: 'robin', c: ['blue', 'green'] },
  { a: 'tired', b: 'panther', c: ['green', 'black', 'orange', 'blue'] },
  { a: 'sad', b: 'goldfish', c: ['green', 'red'] }
];
const colors = data.reduce((acc, color) => {
  acc = acc.concat(color.c)
  return acc;
}, [])
const uniqColors = colors.reduce((acc, color) => {
  if (acc.indexOf(color) === -1) {
    acc.push(color)
  }
  return acc;
}, [])

const posts = [
  { id: 1, title: 'Title 1' },
  { id: 2, title: 'Title 2' }
];
const updatedPosts = posts.map(post => post.id === 1 ? Object.assign(post, { title: 'Updated title 1' }) : post)

const readings = [0.3, 1.2, 3.4, 0.2, 3.2, 5.5, 0.4];
const rsObj = readings.reduce((acc, time) => {
  const maxReading = Math.max(...readings);
  const minReading = Math.min(...readings);
  acc[`maxReading`] = maxReading;
  acc[`minReading`] = minReading
  return acc;
}, {})

var pilots = [
  {
    id: 10,
    name: "Poe Dameron",
    years: 14,
  },
  {
    id: 2,
    name: "Temmin 'Snap' Wexley",
    years: 30,
  },
  {
    id: 41,
    name: "Tallissan Lintra",
    years: 16,
  },
  {
    id: 99,
    name: "Ello Asty",
    years: 22,
  }
];
const totalYears = pilots.reduce((total, pilot) => {
  return total += pilot.years
}, 0)

class FooBase {
  x: number = 3;
  private y: number = 4;
  protected z: number = 5;
}
// Effect on Instances
let foo = new FooBase();
console.log(foo.x); //OK
// foo.y, foo.z => ERROR

// Effect on Child Classes
class FooChild extends FooBase {
  constructor() {
    super();
    console.log(this.z) // 
  }
}

class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  move(meters: number = 0) {
    return `${this.name} moved ${meters} m.`
  }
}

class Snack extends Animal {
  constructor(name: string) {
    super(name)
  }

  move(meters = 5) {
    return super.move(meters)
  }
}

let meo = new Animal('Meo');
console.log(meo.move(77));

let snack = new Snack('Snack');
console.log(snack.move())

class Human {
  constructor(public name: string) {
    this.name = name
  }
}

class Greeter {

  constructor(public greeting: string) {
    this.greeting = greeting;
  }

  greet() {
    return 'Hello' + this.greeting;
  }
};
let greeter = new Greeter('World');

class Animal2 {
  move(distanceInMeters = 0) {
    console.log(`Animal moved ${distanceInMeters} m.`)
  }
};

class Dog extends Animal2 {

  bark() {
    console.log('Woof! Woof');
  }
}
const dog = new Dog();
console.log(dog.move(500));

class Animal3 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(distanceInMeters = 0) {
    console.log(`${this.name} moved ${distanceInMeters} m.`)
  }
}

class Snacke extends Animal3 {
  constructor(name) {
    super(name);
  }
  move(distance = 5) {
    console.log('Slithering')
    super.move(distance)
  }
}

class Hourse extends Animal3 {
  constructor(name) {
    super(name);
  }
  move(distanceInMeters = 45) {
    console.log(`${this.name} moved ${distanceInMeters} m.`)
  }
}
let sam = new Snacke('Sam the Python');
let tom = new Hourse('Tommy the Palomino');

// console.log(tom.move(400))


const fullNameMaxLength = 10;
class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(name: string) {
    if (name && name.length > fullNameMaxLength) {
      throw new Error('fullName has max length of' + fullNameMaxLength)
    }
    this._fullName = name;

  }
};
let employee = new Employee();
employee.fullName = "Big babol";
// console.log(employee.fullName);
class Foo {
  x: number;
  y: number;
  constructor(a, b){
    this.x = a;
    this.y = b;
  }

  gimmeXY(){
    return this.x * this.y;
  }
}
var f = new Foo(5, 15);

class Bar extends Foo {
  z: number;
  constructor(a,b,c){
    super(a,b);
    this.z = c;
  }
  gimmeXY(){
    return super.gimmeXY() + this.z
  }
 
}
let bar = new Bar(100, 200, 300);
console.log(bar.gimmeXY())

class ParentA{
  id: string;
  constructor(){
    this.id = 'A'
  }
  foo(){
    console.log('ParentA:', this.id)
  }
}

class ParentB{
  id: string;
  constructor(){
    this.id = 'B'
  }
  foo(){
    console.log('ParentB:', this.id)
  }
}

class ChildA extends ParentA{
  foo(){
    super.foo();
  }
}

class ChildB extends ParentB{
  foo(){
    super.foo();
  }
}
var b= new ChildB();
let arr = [2,3,4];
of(arr).subscribe(rs => console.log(rs));

class Book {
  title: string;
  author: string;
}
let book = new Book();
book.author ='Name';
book.title='Title';
console.log(book)