'use strict';

//PRACTICE ON HOW SCOPING WORKS
/*
//calcAge = global scope
//function creates it's own scope, equivilent to the variable environment to it's execution context
//code in function only run when called
function calcAge(birthYear) {
    const age = 2037 - birthYear;
    //global scope, able to do a variable look up
    //console.log(firstName);

    //variable look up
    //child scope of first function
    function printAge() {
        let output = `${firstName}, you are ${age}, born in ${birthYear}.`;
        console.log(output);

        //block scope
        if(birthYear >= 1981 && birthYear <= 1996) {
            var millenial = true;
            //will use this firstName for str because it's in the current scope
            //NEW variable with the same name, defined in different scopes
            //functions can have the same parameter names also
            const firstName = 'Steven';
            //reassign variable from outter scope
            output = 'NEW OUTPUT!'

            const str = `Oh, and you're a millenial, ${firstName}.`;
            console.log(str);

            function add(a, b) {
                return a + b;
            }

        }
        //can not access str variable out here (only available in block created)
        //console.log(str);
        // var variables are function scoped (NOT block scoped)
        //still in same parent function = accessable
        console.log(millenial);
        //scope of add function is in block (in strict mode)
        //console.log(add(2, 3));
        console.log(output);
    }
    //call function
    printAge();

    return age;
}

//firstName = global scope
const firstName = 'Jonas';
//call function
calcAge(1991);
//can not access age variable or printAge function out here
//console.log(age); reference error: age not defined
//printAge();; reference error: printAge not defined


//HOISTING & TDZ

//can't access before initialization (TDZ:temporal dead zone)
//Variables
console.log(me); //undefined (must access it after defined)
//console.log(job);
//console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

//Functions
console.log(addDecl(2,3));//works
//can't access before initialization
//console.log(addExpr(2,3));
//console.log(addArrow(2,3));

function addDecl(a,b) {
    return a + b;
};

const addExpr = function(a,b) {
    return a + b;
};

const addArrow = (a,b) => a + b;

//Example: don't use var
//here the numProducts is not 10 it is undefined = shopping cart gets deleted
if(!numProducts) deleteShoppingCart();

//var = bug that is hard to find (use const and let to define variables)
//clean code = declare variables at top of code
var numProducts = 10

function deleteShoppingCart() {
    console.log('All products deleted!');
}

//access 'window' in console
//var creates property on window object (let & const do not)
var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);//true
console.log(y === window.y);//false
console.log(z === window.z);//false


//THIS KEYWORD

//in global scope this = window
console.log(this);

//in sctrict mode = undefined
//in sloppy mode = window
const calcAge = function(birthYear) {
    console.log(2037 - birthYear);
    console.log(this);
};
calcAge(1991);

//arrow function (window) - does not get own this keyword
const calcAgeArrow = birthYear => {
    console.log(2037 - birthYear);
    console.log(this);
}
calcAge(1980);

const jonas = {
    year: 1991,
    calcAge: function() {
        console.log(this);//jonas ---year in jonas
        console.log(2037 - this.year);
    }
};
jonas.calcAge();

const matilda = {
    year: 2017,
};

//method borrowing - copy method
matilda.calcAge = jonas.calcAge;
//method call (object calling the method = matilda)
matilda.calcAge();

//copying the function into a new variable
const f = jonas.calcAge;
//typeerror: can not read property of undefined
f();//no owner, regular function call


//Regular vs Arrow functions

//object literal (NOT a code block) = global scope
//var firstName = 'Matilda'; don't use var --- greet: Hey Matilda

//const jonas = {
//    firstName: 'Jonas',
//    year: 1991,
//    calcAge: function() {
//        console.log(this);//jonas ---year in jonas
//        console.log(2037 - this.year);
//    },
//
//    //arrow function does not have own this keyword = global = undefined
//    //greet: () => { console.log(this); console.log(`Hey ${this.firstName}`) },//Hey undefined
//
//    //use regular function instead
//    //method will get it's own this keyword
//    greet: function () {
//        console.log(this);
//        console.log(`Hey ${this.firstName}`);//Hey Jonas
//    },
//};
//jonas.greet();

const jonas = {
    firstName: 'Jonas',
    year: 1991,
    calcAge: function() {
        console.log(this);//jonas ---year in jonas
        console.log(2037 - this.year);

        //Solution 1 (used before ES6): define a variable with this
        //const self = this;//still have access to this keyword associated with Jonas
        //can not read property 'year' of undefined
        //const isMillenial = function() {
            //console.log(this);//undefined
            //console.log(this.year >= 1981 && this.year <= 1996);//error
        //console.log(self);//works
        //console.log(self.year >= 1981 && self.year <= 1996);//works
        //};
        //isMillenial();//regular function call = undefined

        //Solution 2: use arrow function
        //uses this keyword from the parent scope = jonas
        const isMillenial = () => {
            console.log(this);
            console.log(this.year >= 1981 && this.year <= 1996);
        };
        isMillenial();//true
    },

    //arrow function does not have own this keyword = global = undefined
    //greet: () => { console.log(this); console.log(`Hey ${this.firstName}`) },//Hey undefined

    //use regular function instead
    //method will get it's own this keyword
    greet: function () {
        console.log(this);
        console.log(`Hey ${this.firstName}`);//Hey Jonas
    },
};
jonas.greet();
jonas.calcAge();

//ARGUMENTS KEYWORD
//only available in regular functions
//useful for when need a function to accept more parameters than we actually specified

const addExpr = function (a,b) {
    console.log(arguments);
    return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);//more arguments, not named but can use them (array,loop)

//does not get the arguments keyword
var addArrow = (a,b) => {
    console.log(arguments);//not defined
    return a + b;
};
addArrow(2, 5, 8);//error


//PRIMITIVES[numbers, strings, booleans, etc.] vs. OBJECTS (primitive vs. reference types)
let age = 30;
let oldAge= age;
age = 31;
console.log(age, oldAge);

const me = {
    name: 'Jonas',
    age: 30,
};
const friend = me;
friend.age = 27;
//both have age at 27???
//changed in memory heap, pointing at same identifer value = address in memory heap
console.log('Friend:', friend);
console.log('Me', me);
*/

//primitive types
let lastName = 'Williams';//initial value
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

//reference types
const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
};

const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';
console.log(`Before marriage: `, jessica);
console.log(`After marriage: `, marriedJessica);

//marriedJessica = {}; can't assign a new object to const variable, can not change value to new memory address
//if it was a let variable you could

//copying objects
const jessica2 = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    //Array = object
    family: ['Alice', 'Bob'],
};

//function object.assign (only works on first level=shallow copy)
const jessicaCopy = Object.assign({}, jessica2);//merges two objects & creates a new object
jessicaCopy.lastName = 'Davis';
//(not on object within object[NOT a deep clone]-need an external library to do)
//changes both = same memory
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log(`Before marriage: `, jessica2);
console.log(`After marriage: `, jessicaCopy);