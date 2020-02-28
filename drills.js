const Stack = require("./Stack");
const Queue = require("./Queue");
const DoubleQueue = require("./DoubleQueue");

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
const starTrekQ = new Queue();

starTrekQ.enqueue("Kirk");
starTrekQ.enqueue("Spock");
starTrekQ.enqueue("Uhura");
starTrekQ.enqueue("Sulu");
starTrekQ.enqueue("Checkov");

const peekQ = function(queue) {
  if (queue.first === null) {
    return "no queue";
  }
  return queue.first.data;
};

console.log(peekQ(starTrekQ));

const isEmptyQ = function(queue) {
  if (queue.first === null) {
    return true;
  }
  return false;
};
console.log(isEmptyQ(starTrekQ));
const starTrekQ2 = new Queue();
console.log(isEmptyQ(starTrekQ2));

const displayQ = function(queue) {
  if (queue.first === null) {
    return "empty queue";
  }
  const queueArray = [];
  let currNode = queue.first;
  while (currNode !== null) {
    queueArray.push(currNode.data);
    currNode = currNode.next;
  }
  return queueArray;
};
console.log(displayQ(starTrekQ));

//7. Create a queue class using Doubly linked List

const starTrekDQ = new DoubleQueue();

starTrekDQ.enqueue("Kirk");
starTrekDQ.enqueue("Spock");
starTrekDQ.enqueue("Uhura");
starTrekDQ.enqueue("Sulu");
starTrekDQ.enqueue("Checkov");
starTrekDQ.dequeue();
console.log(peekQ(starTrekDQ));
console.log(isEmptyQ(starTrekDQ));

const starTrekDQ2 = new DoubleQueue();
console.log(isEmptyQ(starTrekDQ2));

console.log(displayQ(starTrekDQ));

//8. Queue implementation using a stack

const stack4Q1 = new Stack();
const stack4Q2 = new Stack();
const enqueue = function(data) {
  stack4Q1.push(data);
  return `enqueued ${data}`;
};
const dequeue = function() {
  if (stack4Q2.top === null) {
    if (stack4Q1.top === null) {
      return "Nothing to dequeue!";
    }
    while (stack4Q1.top !== null) {
      stack4Q2.push(stack4Q1.pop());
    }
  }
  return `dequeued ${stack4Q2.pop()}`;
};
console.log(enqueue(1));
console.log(enqueue(2));
console.log(enqueue(3));
console.log(dequeue());
console.log(dequeue());
console.log(enqueue(4));
console.log(enqueue(5));
console.log(enqueue(6));
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());
console.log(dequeue());

//9. Square dance pairing

const males = new Queue();
const females = new Queue();
const squareDancePairs = [];

const newDancer = function(name, gender) {
  if (gender === "male") {
    males.enqueue(name);
  }
  if (gender === "female") {
    females.enqueue(name);
  }
  while (males.first !== null && females.first !== null) {
    squareDancePairs.push(`${males.dequeue()}/${females.dequeue()}`);
  }
};
newDancer("Jane", "female");
newDancer("Frank", "male");
newDancer("John", "male");
newDancer("Sherlock", "male");
newDancer("Madonna", "female");
newDancer("David", "male");
newDancer("Christopher", "male");
newDancer("Beyonce", "female");
console.log("Pairs:", squareDancePairs);
console.log("Waiting Males:", displayQ(males));
console.log("Waiting Females:", displayQ(females));

//10. The Ophidian Bank

const ophidianBank = function() {
  const ophidianLine = new Queue();
  ophidianLine.enqueue("Person 1");
  ophidianLine.enqueue("Person 2");
  ophidianLine.enqueue("Person 3");
  ophidianLine.enqueue("Person 4");
  ophidianLine.enqueue("Person 5");
  ophidianLine.enqueue("Person 6");
  ophidianLine.enqueue("Person 7");
  ophidianLine.enqueue("Person 8");
  ophidianLine.enqueue("Person 9");
  ophidianLine.enqueue("Person 10");
  console.log(displayQ(ophidianLine));
  let currentCustomer = ophidianLine.first;
  let time = 0;
  while (currentCustomer !== null && time < 20) {
    const paperwork = Math.random() >= 0.25;
    if (paperwork === true) {
      const howLong = Math.ceil(Math.random() * 5);
      time += howLong;
      console.log(
        `${currentCustomer.value} was serviced. It took ${howLong} ${
          howLong > 1 ? "minutes" : "minute"
        }. ${time} ${
          time > 1 ? "total minutes have passed." : "total minute has passed."
        }`
      );
      ophidianLine.dequeue();
    } else {
      time += 1;
      console.log(
        `${
          currentCustomer.value
        } was missing some paperwork and had to go to the end of the line. ${time} ${
          time > 1 ? "total minutes have passed." : "total minute has passed."
        }`
      );
      ophidianLine.enqueue(ophidianLine.dequeue());
    }
    currentCustomer = currentCustomer.next;
  }
  console.log(`Here's the line after ${time} minutes:`);
  console.log(displayQ(ophidianLine));
};
console.log(ophidianBank());
