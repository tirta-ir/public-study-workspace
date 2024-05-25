// Define corresponding functions for each operator
const operations = {
	'+': (x, y) => x + y, //add
	'-': (x, y) => x - y, //substract
	'*': (x, y) => x * y, //product
	'/': (x, y) => x / y, //division
};

// Define a set of supported operators
const operators = {'+': true,'-': true,'*': true,'/': true,};

// Check if two operators have the same precedence
function equalOrder(op1, op2) {
	return op1 === op2 ||
		(op1 === '*' && op2 === '/') || (op1 === '/' && op2 === '*') ||
		(op1 === '+' && op2 === '-') || (op1 === '-' && op2 === '+');
}

// Check if the precedence of the first operator is higher than the second
function greaterOrder(op1, op2) {
	return (op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-');
}

// Check if the precedence of the first operator is higher or the same as the second
function greaterOrEqualToOrder(op1, op2) {
	return equalOrder(op1, op2) || greaterOrder(op1, op2);
}

// Compiler class
class Compiler {
	// Tokenize the input program
	tokenize(program) {
		const tokens = [];
		let currentToken = '';

		for (let i = 0; i < program.length; i++) {
			const char = program[i];

			if (/\s/.test(char)) {
				// Skip whitespaces
				continue;
			}

			if (/[A-Za-z]/.test(char) || char === '_') {
				// Handle variable names
				currentToken += char;
				while (i + 1 < program.length && /[A-Za-z0-9_]/.test(program[i + 1])) {
					currentToken += program[++i];
				}
				tokens.push(currentToken);
				currentToken = '';
			} else if (/\d/.test(char)) {
				// Handle numbers
				currentToken += char;
				while (i + 1 < program.length && /\d/.test(program[i + 1])) {
					currentToken += program[++i];
				}
				tokens.push(parseInt(currentToken, 10));
				currentToken = '';
			} else {
				// Handle operators and parentheses
				tokens.push(char);
			}
		}

		return tokens;
	}

	// Convert tokens to an Abstract Syntax Tree (AST)
	tokensToAST(args, tokens) {
		const outStack = [];
		const opStack = [];
		const applyOp = () => {
			const op = opStack.shift();
			const b = outStack.pop();
			const a = outStack.pop();
			outStack.push({op,a,b,});
		};
		for (let i = 0; i < tokens.length; i += 1) {
			const token = tokens[i];
			if (!(token in operators) && token !== '(' && token !== ')') {
				if (!isNaN(token)) {
					outStack.push({op: 'imm',n: token,});
				} else {
					outStack.push({op: 'arg',n: args[token],});
				}
			} else if (token in operators) {
				while (opStack.length && greaterOrEqualToOrder(opStack[0], token)) {
					applyOp();
				}
				opStack.unshift(token);
			} else if (token === '(') {
				opStack.unshift(token);
			} else if (token === ')') {
				while (opStack.length && opStack[0] !== '(') {
					applyOp();
				}
				if (opStack[0] === '(') {
					opStack.shift();
				}
			}
		}
		while (opStack.length) {
			applyOp();
		}
		return outStack.pop();
	}

	// Parse arguments from tokens
	parseArguments(tokens) {
		let argCount = 0;
		const errorMessage = 'Invalid argument list.';
		const args = {};

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (i === 0) {
				if (token !== '[') {
					throw new Error(errorMessage);
				}
			} else {
				if (token === ']') {
					return {args,i};
				}
				args[token] = argCount++;
			}
		}

		throw new Error(errorMessage);
	}

	// Compile the input program
	compile(program) {
		return this.generateMachineCode(
			this.performOperations(
				this.tokensToAST(
					this.tokenize(program))));
	}

	// Pass 1: Tokenize and generate AST
	pass1(program) {
		const tokens = this.tokenize(program);
		const {args,i,
		} = this.parseArguments(tokens);
		return this.tokensToAST(args, tokens.slice(i + 1));
	}

	// Pass 2: Perform operations on the AST
	pass2(ast) {
		function performOperation(node) {
			if (operators[node.op]) {
				if (node.a.op !== 'imm') {
					node.a = performOperation(node.a);
				}
				if (node.b.op !== 'imm') {
					node.b = performOperation(node.b);
				}
				if (node.a.op === 'imm' && node.b.op === 'imm') {
					return {
						op: 'imm',
						n: operations[node.op](node.a.n, node.b.n),
					};
				}
			}
			return node;
		}
		return performOperation(ast);
	}

	// Pass 3: Generate machine code from the AST
	pass3(ast) {
		const operationInstructions = {'+': 'AD','-': 'SU','*': 'MU','/': 'DI',};

		function generateCode(node) {
			if (operationInstructions[node.op]) {
				return [...generateCode(node.a), 'PU',
					...generateCode(node.b), 'SW', 'PO',
					operationInstructions[node.op]
				];
			}
			const instructions = [];
			if (node.op === 'imm') {
				instructions.unshift(`IM ${node.n}`);
			} else if (node.op === 'arg') {
				instructions.unshift(`AR ${node.n}`);
			}
			return instructions;
		}
		return generateCode(ast);
	}
}

// Export the Compiler class
module.exports = Compiler;
