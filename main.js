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
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
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
