# Three-Pass Compiler for Simple Programming Language
This repository contains a three-pass compiler implemented in JavaScript for a simple programming language by the author. The language has a specific syntax, and the compiler processes the input program through three distinct passes to generate assembly code for a small processor. The syntax of the programming language is defined as follows:
```
    function   ::= '[' arg-list ']' expression

    arg-list   ::= /* nothing */
                 | variable arg-list

    expression ::= term
                 | expression '+' term
                 | expression '-' term

    term       ::= factor
                 | term '*' factor
                 | term '/' factor

    factor     ::= number
                 | variable
                 | '(' expression ')'
```
Where the variables are strings of alphabetic characters, and numbers are strings of decimal digits representing integers.

## Examples
For example, a function which computes `a^2 + b^2` might look like `[ a b ] a*a + b*b` and a function to compute the average of two numbers might look like `[ first second ] (first + second) / 2`

## Compiler Passes
The author needs to write a three-pass compiler. All test cases will be valid programs, so it doesn't need to focus on error handling.

### 1st Pass: `pass1`
The first pass, pass1, takes a string representing a function in the original programming language and returns a (JSON) object representing the Abstract Syntax Tree (AST). The AST uses the following representations:
```
    { 'op': '+', 'a': a, 'b': b }    // add subtree a to subtree b
    { 'op': '-', 'a': a, 'b': b }    // subtract subtree b from subtree a
    { 'op': '*', 'a': a, 'b': b }    // multiply subtree a by subtree b
    { 'op': '/', 'a': a, 'b': b }    // divide subtree a from subtree b
    { 'op': 'arg', 'n': n }          // reference to n-th argument, n integer
    { 'op': 'imm', 'n': n }          // immediate value n, n integer
```
Please note that arguments are indexed from zero. So, for example, the function `[x y] (x + y) / 2` would look like:
```
    { 'op': '/', 'a': { 'op': '+', 'a': { 'op': 'arg', 'n': 0 },
                                   'b': { 'op': 'arg', 'n': 1 } },
                 'b': { 'op': 'imm', 'n': 2 } }
```
### 2nd Pass: `pass2`
The second pass of the compiler will be called `pass2`. This pass will take the output from pass1 and return a new Abstract Syntax Tree (with the same format) with all constant expressions reduced as much as possible. So, if for example, the function is `[ x ] x + 2*5`, the result of pass1 would be:
```
    { 'op': '+', 'a': { 'op': 'arg', 'n': 0 },
                 'b': { 'op': '*', 'a': { 'op': 'imm', 'n': 2 },
                                   'b': { 'op': 'imm', 'n': 5 } } }
```
This would be passed into `pass2` which would return:
```    
    { 'op': '+', 'a': { 'op': 'arg', 'n': 0 },
                 'b': { 'op': 'imm', 'n': 10 } }
```

### 3rd Pass: `pass3`
The third pass of the compiler is `pass3`. The `pass3` method takes in an AST and returns an array of strings. Each string is an assembly directive. The author will work on a small processor with two registers (R0 and R1), a stack, and an array of input arguments. The result of a function is expected to be in R0. The processor supports the following instructions:
```
    "IM n"     // load the constant value n into R0
    "AR n"     // load the n-th input argument into R0
    "SW"       // swap R0 and R1
    "PU"       // push R0 onto the stack
    "PO"       // pop the top value off of the stack into R0
    "AD"       // add R1 to R0 and put the result in R0
    "SU"       // subtract R1 from R0 and put the result in R0
    "MU"       // multiply R0 by R1 and put the result in R0
    "DI"       // divide R0 by R1 and put the result in R0
```
So, one possible return value from pass3 given the Abstract Syntax Tree shown above from pass2 is `[ "IM 10", "SW", "AR 0", "AD" ]`. Here is a simulator for the target machine. It takes an array of assembly instructions and an array of arguments and returns the result.
```JavaScript
function simulate(asm, args) {
      var r0 = undefined;
      var r1 = undefined;
      var stack = [];
      asm.forEach(function (instruct) {
        var match = instruct.match(/(IM|AR)\s+(\d+)/) || [ 0, instruct, 0 ];
        var ins = match[1];
        var n = match[2] | 0;
    
        if (ins == 'IM')   { r0 = n; }
        else if (ins == 'AR') { r0 = args[n]; }
        else if (ins == 'SW') { var tmp = r0; r0 = r1; r1 = tmp; }
        else if (ins == 'PU') { stack.push(r0); }
        else if (ins == 'PO') { r0 = stack.pop(); }
        else if (ins == 'AD') { r0 += r1; }
        else if (ins == 'SU') { r0 -= r1; }
        else if (ins == 'MU') { r0 *= r1; }
        else if (ins == 'DI') { r0 /= r1; }
      });
      return r0;
    }
```

## Solution Code Overview
The provided code is a JavaScript implementation for the problem by the Author. Let's break down the code into several sections and deep dive to its functionality.

### Operator Definitions
Here, an object named `operations` is created, mapping each operator to a corresponding JavaScript function. Additionally, a set named `operators` is defined to store supported operators.

```JavaScript
// Define corresponding functions for each operator
const operations = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
};

// Define a set of supported operators
const operators = {'+': true, '-': true, '*': true, '/': true};
```

### Operator Precedence Functions
These functions (`equalOrder`, `greaterOrder`, and `greaterOrEqualToOrder`) are used to compare the precedence of two operators. They determine the order in which operators should be applied during the compilation process.

```JavaScript
// Check if two operators have the same precedence
function equalOrder(op1, op2) {
    // ...
}

// Check if the precedence of the first operator is higher than the second
function greaterOrder(op1, op2) {
    // ...
}

// Check if the precedence of the first operator is higher or the same as the second
function greaterOrEqualToOrder(op1, op2) {
    // ...
}
```

### Compiler Class
A class named `Compiler` is defined, encapsulating the entire compiler implementation. The `tokenize` method processes the input program, converting it into an array of tokens. This method handles variables, numbers, operators, and whitespace, laying the foundation for the subsequent passes.

```js
tokenize(program) {
    // ...
}
```

Next, we have the AST (Abstract Syntax Tree) Generation, which is Pass 1. The `tokensToAST` method takes the tokenized input, along with arguments, and generates an AST. The AST represents the hierarchical structure of the program.

```js
tokensToAST(args, tokens) {
    // ...
}
```

Following this, we have Argument Parsing. The `parseArguments` method extracts arguments from the tokenized input. It ensures the correct syntax of the argument list and returns an object containing the arguments and the index where the argument list ends. The `compile` method orchestrates the entire compilation process. It tokenizes the input, generates the AST, performs operations to optimize the AST, and finally generates machine code.

```js
compile(program) {
    return this.generateMachineCode(
        this.performOperations(
            this.tokensToAST(
                this.tokenize(program))));
}
```

The Compilation Passes (Pass 2 and 3) represent each pass of the compilation process. `pass1` tokenizes the input and generates the initial AST. `pass2` optimizes the AST by reducing constant expressions. `pass3` converts the optimized AST into machine code.

```js
pass1(program) {
    // ...
}

pass2(ast) {
    // ...
}

pass3(ast) {
    // ...
}
```

Lastly, we have AST Operation and Code Generation. These functions are used in `pass2` and `pass3` to perform operations on the AST nodes and generate machine code, respectively.

```js
performOperation(node) {
    // ...
}

generateCode(node) {
    // ...
}
```

### Exporting the Compiler Class
The 'Compiler' class is exported to make it available for use in other modules.
```js
module.exports = Compiler;
```

## Disclaimer
**Please note that this case study is from a Codewars Kyu 1 problem, and this repo is for the purpose of study. I don't condone any wrongful use of this code for personal gain.**
