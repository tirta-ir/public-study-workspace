# JS-BPNN
JS-BPNN is a simple architecture of a Back Propagation Neural Network that uses JavaScript. The code is implementing a simple feedforward neural network with backpropagation for learning the NAND logic gate. The network is trained with 4 sets of inputs and their corresponding outputs for the NAND logic. The network is trained for 100; 1,000; 10,000; and 100,000 epochs. After training, the network is tested with the inputs. The outputs are close to the expected outputs for the NAND logic, indicating that the network has learned the NAND logic successfully.

## Architecture of the Model
![download](https://github.com/tirta-ir/JS-BPNN/assets/70493416/d6cbba6b-cacd-4f0c-a034-9215165bd7b5)

- **Input Neurons (X1 and X2)**: These are the input nodes where you feed in your data. In the case of the NAND logic problem, you have two inputs.

- **Weights (W)**: These are the parameters that the network learns during training. Each input node is connected to the output node by a weight. The weights are initialized randomly and get updated through the process of backpropagation to reduce the error of the network’s predictions.

- **Output Neuron (Y hat)**: This is where the network produces its prediction based on the inputs and the learned weights. The activation function is applied to the weighted sum of the inputs to produce the output.

- **Error Calculation and Backpropagation**: The error is calculated as the difference between the predicted output (Y hat) and the actual output (Y). This error is then used to update the weights in the process of backpropagation.

## Pseudocode of the Model
```
Initialize the Neural Network with input nodes, hidden nodes, and output nodes
Randomly initialize weights and biases
Define the activation function (sigmoid) and its derivative

For each epoch in the number of epochs:
   Select a random data point from the training data
   Feed the inputs forward through the network
   Calculate the output error (target - output)
   Calculate the output gradient using the derivative of the activation function
   Adjust the weights and biases between the hidden layer and the output layer
   Calculate the hidden layer errors
   Calculate the hidden gradient
   Adjust the weights and biases between the input layer and the hidden layer

Test the trained network with the inputs
```

## Results
1. **epochs: 100**

[ [ 0.625799250337329 ] ]

[ [ 0.6133511124575954 ] ]

[ [ 0.656965315426312 ] ]

[ [ 0.643716382271923 ] ]

MAE: 0.4369001760126716


2. **epochs: 1,000**

[ [ 0.9027870295110499 ] ]

[ [ 0.7341632059478439 ] ]

[ [ 0.7772317996331113 ] ]

[ [ 0.46197335630700415 ] ]

MAE: 0.26194783030374974


3. **epochs: 10,000**

[ [ 0.9889396312293448 ] ]

[ [ 0.9611509119833606 ] ]

[ [ 0.9624375147969043 ] ]

[ [ 0.08446625325677343 ] ]

MAE: 0.04298454881179094


4. **epochs: 100,000**

[ [ 0.9955985368388361 ] ]

[ [ 0.9930158487949855 ] ]

[ [ 0.9930337057573354 ] ]

[ [ 0.009801388325278234 ] ]

MAE: 0.007038324233530296

In conclusion, these results demonstrate that JS-BPNN is capable of learning the NAND logic, and that more training leads to better performance. However, keep in mind that this is a very simple problem with only 4 data points. For more complex problems with larger datasets, the relationship between the number of training epochs and the network’s performance might not be as straightforward.
