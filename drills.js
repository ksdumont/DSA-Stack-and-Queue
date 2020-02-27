const Stack = require("./Stack");
const Queue = require("./Queue");

const starTrek = new Stack();
starTrek.push("kirk");
starTrek.push("Spock");
starTrek.push("McCoy");
starTrek.push("Scotty");
console.log(starTrek);

const peek = function(stack) {
  if (stack.top === null) {
    return "Empty Stack";
  }
  return stack.top.data;
};
console.log(peek(starTrek));

const isEmpty = function(stack) {
  if (stack.top === null) {
    return true;
  }
  return false;
};
console.log(isEmpty(starTrek));

const starTrek2 = new Stack();
console.log(isEmpty(starTrek2));

const display = function(stack) {
  if (stack.top === null) {
    return "stack is empty";
  }
  let stackArray = [];
  let currNode = stack.top;
  while (currNode !== null) {
    stackArray.push(currNode.data);
    currNode = currNode.next;
  }
  return stackArray;
};
console.log(display(starTrek));


