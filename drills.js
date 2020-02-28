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

//4. Matching parentheses in an expression

const parser = function(string) {
  const parserStack = new Stack();
  let singleQuoteActive = false;
  let doubleQuoteActive = false;
  const pairs = {
    "(": ")",
    "[": "]",
    "{": "}"
  };
  for (let character in string) {
    if (string[character] === "'" && doubleQuoteActive === false) {
      singleQuoteActive = !singleQuoteActive;
    }
    if (string[character] === '"' && singleQuoteActive === false) {
      doubleQuoteActive = !doubleQuoteActive;
    }
    if (
      (string[character] === "(" ||
        string[character] === "[" ||
        string[character] === "{") &&
      singleQuoteActive === false &&
      doubleQuoteActive === false
    ) {
      parserStack.push({
        character: string[character],
        location: character
      });
    }
    if (
      (string[character] === ")" ||
        string[character] === "]" ||
        string[character] === "}") &&
      singleQuoteActive === false &&
      doubleQuoteActive === false
    ) {
      if (isEmpty(parserStack)) {
        const expectedChar = Object.keys(pairs).find(
          key => pairs[key] === string[character]
        );
        return `Missing opening '${expectedChar}' before the closing '${string[character]}' at location ${character}!`;
      }
      let previousStackNode = parserStack.pop();
      if (string[character] !== pairs[previousStackNode.character]) {
        return `Expecting a '${
          pairs[previousStackNode.character]
        }' but found a '${string[character]}' at location ${character}!`;
      }
    }
  }
  if (isEmpty(parserStack)) {
    return "All is well with your brackets and nesting. Well done!";
  } else {
    let currNode = parserStack.top;
    let missingCloser;
    while (currNode !== null) {
      missingCloser = parserStack.pop();
      console.log(
        `Missing closing '${
          pairs[missingCloser.character]
        }' after the opening '${missingCloser.character}' at location ${
          missingCloser.location
        }!`
      );
      currNode = currNode.next;
    }
    return false;
  }
  return true;
};
console.log(parser("([{M'a({[r'k}])"));

//5. Sort stack

const sortStack = function(stack) {
  const sortedStack = new Stack();
  if (stack.top === null) {
    return "Empty Stack";
  }
  let temp;
  while (stack.top) {
    temp = stack.pop();
    while (sortedStack.top && sortedStack.top.data < temp) {
      stack.push(sortedStack.pop());
    }
    sortedStack.push(temp);
  }
  return display(sortedStack);
};
const stackToSort = new Stack();
stackToSort.push(7);
stackToSort.push(3);
stackToSort.push(9);
stackToSort.push(1);
stackToSort.push(4);
console.log(display(stackToSort));
console.log(sortStack(stackToSort));

//6. Create a queue using Singly linked list


