1️⃣ What is the difference between var, let, and const?
Ans: 
var--> it's a function-scoped or global-scoped,it's possible to re-assign and also possible to re-declaration.
let-->it's a block-scoped,it's possible to re-assign and not possible to re-declaration.
const-->it's a block-scoped,it's not possible to re-assign and not possible to re-declaration.

2️⃣ What is the spread operator (...)?
Ans:
The spread operator (...) allows to expand the elements of an iterable (like an array, object, or string) into individual elements.
Example:	add(...myArray)

3️⃣ What is the difference between map(), filter(), and forEach()?
Ans:
map(): it return a new of the same length.it is used to change every element in an array
filter(): it return a new array and it can be store. If no elements can not match with condition, it returns an empty array.
forEach():it return undefined.Executes a function for each element of an array but does not return a new array.
4️⃣ What is an arrow function?
Ans:
An arrow function is a shorter way to write functions in JavaScript, introduced in ES6.
normal function : let add = function(a, b) { return a + b; };
Arrow function : 	let add = (a, b) => a + b;
5️⃣ What are template literals?
Ans: 
Template literals are a modern way to create strings in JavaScript. They use backticks (`) instead of standard single or double quotes,They make it easier to include variables, write multi-line strings, and format text.