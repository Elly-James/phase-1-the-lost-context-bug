const messageConfig = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
};


//Debugging: Discovering the Nature of the Lost Context Bug  scenario 1

///Solution 1: Use a thisArg to avoid the lost context bug
/*
const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  const contextBoundForEachExpr = function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);
  }.bind(this);

  this.signatories.forEach(contextBoundForEachExpr);
};

printCard.call(messageConfig);*/

//Solution 2: Use a Closure to Regain Access to the Lost Context

/*

const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);

  const outerContext = this;

  this.signatories.forEach(function (signatory) {
    const message = `${outerContext.closing[signatory]}, ${signatory}`;
    console.log(message);
  });
};

printCard.call(messageConfig);



/**/ 

/*Many JavaScript developers define the variable we called outerContext by the name self.
 In any case, by assigning it to a variable, we put the original context within the function-level scope that the inner function encloses as a closure. This means inside the inner function, we can get "back" to the outer function's context. That's solution number two.

What we would really like is for there to be a way to tell the function inside of forEach to

Not declare its own context but also
Not require us to do the extra work of using bind or a thisArg.
*/



//Solution 3: Use an Arrow Function Expression to Create a Function Without Its Own Context

/**/ 

const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  // Wow! Elegant! And notice the arrow function's `this` is the same `this`
  // that printCard has; specifically, the `thisArg` that was passed to it
  this.signatories.forEach((signatory) =>
    console.log(`${this.closing[signatory]}, ${signatory}`)
  );
};

printCard.call(messageConfig);


/*Because arrow functions are so often used to take a value, do a single operation with it, and return the result, they have two shortcuts:

If you pass only one argument, you don't have to wrap the single parameter in ()
If there is only one expression, you don't need to wrap it in {} and the result of that expression is automatically returned.
Anti-Shortcut: If you DO use {}, you must explicitly return the return value
Thus Thor and Loki can fix their problem and wish their father a happy birthday most elegantly with the following code:*/