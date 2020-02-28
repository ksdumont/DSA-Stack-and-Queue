const Stack = require("./Stack");
const Queue = require("./Queue");

//1. Create a stack class
const starTrek = new Stack();
starTrek.push("kirk");
starTrek.push("Spock");
starTrek.push("McCoy");
starTrek.push("Scotty");
console.log(starTrek);

//2. Useful methods for a stack
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

//3. Check for palindromes using a stack

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const palindromeStack = new Stack();
  for (let character of s) {
    palindromeStack.push(character);
  }
  let palindromeString = "";
  while (!isEmpty(palindromeStack)) {
    palindromeString += palindromeStack.pop();
  }
  return palindromeString === s;
}
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));

