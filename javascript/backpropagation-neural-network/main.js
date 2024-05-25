// Import 'mathjs' library for this code
const math = require('mathjs');

// Define the activation function and its derivative
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
    return y * (1 - y);
}

// Define the NN class
class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = math.random([this.hidden_nodes, this.input_nodes], -1, 1);
        this.weights_ho = math.random([this.output_nodes, this.hidden_nodes], -1, 1);

        this.bias_h = math.random([this.hidden_nodes, 1], -1, 1);
        this.bias_o = math.random([this.output_nodes, 1], -1, 1);

        this.learning_rate = 0.1;
    }

    feedforward(input_array) {
        
        // Generate the hidden outputs
        let inputs = math.matrix(input_array);
        let hidden = math.add(math.multiply(this.weights_ih, inputs), this.bias_h);
        
        // Bind the activation function
        hidden = math.map(hidden, sigmoid);

        // Generate the output's output
        let output = math.add(math.multiply(this.weights_ho, hidden), this.bias_o);
        output = math.map(output, sigmoid);

        // Send back to the caller
        return output.toArray();
    }

    train(input_array, target_array) {
        
        // Generate the hidden outputs
        let inputs = math.matrix(input_array);
        let hidden = math.add(math.multiply(this.weights_ih, inputs), this.bias_h);
        hidden = math.map(hidden, sigmoid);
        
        let outputs = math.add(math.multiply(this.weights_ho, hidden), this.bias_o);
        outputs = math.map(outputs, sigmoid);

        // Convert array to matrix object and calculate the error
        let targets = math.matrix(target_array);
        let output_errors = math.subtract(targets, outputs);
        let gradients = math.map(outputs, dsigmoid);
        
        gradients = math.dotMultiply(gradients, output_errors);
        gradients = math.multiply(gradients, this.learning_rate);

        // Calculate deltas
        let hidden_T = math.transpose(hidden);
        let weight_ho_deltas = math.multiply(gradients, hidden_T);

        // Adjust the weights by deltas
        this.weights_ho = math.add(this.weights_ho, weight_ho_deltas);
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_o = math.add(this.bias_o, gradients);

        // Calculate the hidden layer errors
        let who_t = math.transpose(this.weights_ho);
        let hidden_errors = math.multiply(who_t, output_errors);

        // Calculate hidden gradient
        let hidden_gradient = math.map(hidden, dsigmoid);
        hidden_gradient = math.dotMultiply(hidden_gradient, hidden_errors);
        hidden_gradient = math.multiply(hidden_gradient, this.learning_rate);

        // Calcuate input into hidden deltas
        let inputs_T = math.transpose(inputs);
        let weight_ih_deltas = math.multiply(hidden_gradient, inputs_T);

        this.weights_ih = math.add(this.weights_ih, weight_ih_deltas);
        
        // Adjust the bias by its deltas (which is just the gradients)
        this.bias_h = math.add(this.bias_h, hidden_gradient);
    }
}

// Create a new NN instance
let nn = new NeuralNetwork(2, 4, 1);

// Define the training data
let training_data = [
    {
        inputs: [[0], [0]],
        targets: [[1]]
    },
    {
        inputs: [[1], [0]],
        targets: [[1]]
    },
    {
        inputs: [[0], [1]],
        targets: [[1]]
    },
    {
        inputs: [[1], [1]],
        targets: [[0]]
    }
];

// Define the random function
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Train the BPNN
for (let i = 0; i < 100000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
}

// Test the BPNN
console.log(nn.feedforward([[0], [0]]));
console.log(nn.feedforward([[1], [0]]));
console.log(nn.feedforward([[0], [1]]));
console.log(nn.feedforward([[1], [1]]));

// Mean Absolute Error (MAE)
let sum_of_absolute_errors = 0;
for (let data of training_data) {
    let output = nn.feedforward(data.inputs);
    let error = Math.abs(data.targets[0][0] - output[0][0]);
    sum_of_absolute_errors += error;
}
let mae = sum_of_absolute_errors / training_data.length;
console.log('Mean Absolute Error:', mae);
