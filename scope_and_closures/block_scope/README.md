## Blocks as scopes

Block scope is about declaring variables as close as possible, as local as possible, to where they will be used.

Where we declare variables is not relevant when using var, because they will always belong to the enclosing scope.
Block scope is a tool to extend the principle of Least Privilege form hiding information in functions to hiding information in blocks of our code.

### with

__with__ is an example of block scope, in that the scope that is created from the object only exists for the lifetime of that __with__ statement, and not in the enclosing scope.

### try catch

JavaScript in ES3 specified the variable declaration in the catch clause of a try/catch to be block-scoped to the catch block

### let

The __let__ keyword attaches the variable declation to the scope of whatever block (commonlly a { .. } pair) it's containted in.
Declaration made with let will not hoist to the entire scope of the block they appear in. Such declarations will not observably exist in the block until the declartion statement.

### const

In addition to let, ES6 introduces __const__, which also creates a block-scoped variable, but whose value is fixed (constant). Any attemp to change that value at a later time results in an error.

### Garbage collection

Declaring explicit blocks for variable to locally bind to is a powerful tool that you can add to your code toolbox. Because JS engine will not have to keep structures around if they are block scoped, and will not be used again, and so garbage collected.