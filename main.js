"use strict"

/*
var a = 5;
let b = 'Text';
console.log(b);

//-------var vs let----------------
function testLet() {
    let a = 30;
    if (true) {
        let a = 50;
        console.log(a)
    }
    console.log(a)
}
testLet();
//---------------------------
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i);

for (let x = 0; x < 10; x++) {
    console.log(x);
}
console.log(x);     //Uncaught ReferenceError: x is not defined - out of scope

//---------------------------

const colors = [];

colors.push('red');
colors.push('blue');
console.log(colors);
colors = 'green';       //ypeError: Assignment to constant variable
//--------------------------------
//------- classes ----------------
class User {
    //ctr are methods that will run when your class is instanciated
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    //method - a function belonging to a class
    registered() {
        console.log(this.username + ' is registered');
    }
    //static method
    static countUsers() {
        console.log('there are 50 users');
    }
}

let bob = new User('bob', 'bob@bob.com', '123abc');

console.log(bob);
bob.registered();
console.log(bob.email);
//call static method
User.countUsers();
// extend classes/inheritance 

class Member extends User {
    constructor(username, email, password, memberPackage){
    super(username, email, password);
    this.package = memberPackage;
    }

    getPackage(){
        console.log(this.username + ' has ' + this.package)
    }
}

let mike = new Member('Mike', 'm@m.com', '890', 'gold');

mike.getPackage();
mike.registered();

//--------------------------------------------------
//------ template literal ---------------

let name = 'John'
function makeUpperCase(word){
    return word.toUpperCase();
}

//use back tick instead +
let template = `<h1>${makeUpperCase('Hello1')}</h1>
<h1 style=color:blue;>Hello, ${name}</h1>
<p>This is template in JS</p>`

document.getElementById('template').innerHTML = template;

//--------------------------------------------------
//------- string methods in ES6 --------------

let theString = 'Hello, my name is Raf and I love JS';
//startsWith() endsWith() includes()
console.log(theString.startsWith('Hello')); //gives true/false
//some numbers methods
console.log(0xFF); //hex
console.log(0b101); //binary
console.log(0o533); //octal

//======= default parameters & spread operator in ES6 =============================


function greet(x = "Hello Universe") {
    console.log(x);
} //check it in https://babeljs.io/
greet();

let args1 = [1, 2, 3];
let args2 = [8, 9, 10];
function test5() {
    console.log(args1 + ',' + args2);
}
//old way test.apply(null, args);
test5(...args1, ...args2);


//======= data structures: set, map in ES6 =============================

// set object lets you store walue of any type

let myArray = [23, 'abc', 21, 55, 0, 12, 6, 665];
let mySet = new Set(myArray);

mySet.add('100');
mySet.add(100);
mySet.add({ a: 1, b: 2 }); //add object
mySet.delete(55);
//mySet.clear(); //clear all
console.log(mySet);
console.log('Set size is: ' + mySet.size);

for (let i = 0; i < mySet.size; i++) {
    console.log(mySet);
    }

mySet.forEach(function(x){
    console.log(x.valueOf(x));
});

for (let item of mySet) console.log(item);

//---map is key value set as oposite to individual values-----
let myMap = new Map([['a1', 'Hello'], ['b2', 'Goodbye']]);
myMap.set('c3','Foo');
console.log(myMap);
// - - - - - - - - - - - 
//map func takes an array and will run a func
//on each element in the array (it doesnt mutate)

let numbers = [1, 2, 3, 4, 5, 6, 7];
//1))
let doubled1 = numbers.map(function (n) {
    return n * 2;
});
//2))
let doubled2 = numbers.map(n => n * 3);

console.log(doubled1);
console.log(doubled2);


//======= ARROW functions in ES6 =============================

//1))
function addA(x, y) {
    return x + y;
}
console.log(addA(10, 7));
//2))
let addB = (a, b) => {
    return a + b
}
console.log(addB(10, 8));
//3)) has to be on single line
let addC = (a, b) => a + b

console.log(addB(10, 9));
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
//1)
let addD = function (a, b) {
    let sum = a + b;
    console.log(sum);
    return false;
}
addD(1, 2);
//2)
let addE = (a, b) => {
    let sum = a+b;
    console.log(sum);
    return false;
}
addE(100, 200);
