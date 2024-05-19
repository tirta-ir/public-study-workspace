# Snail Sort in GO

## Introduction

The name **snail sort** comes from the pattern of movement, which resembles the spiral shape of a snail shell. It isn't a conventional sorting algorithm. It's often used to describe a specific way of traversing a 2D array or matrix. In a 'snail' traversal, we start from the top left corner of the matrix, move right across the first row, down the last column, left across the last row (in reverse), and up the first column (in reverse). This process is repeated for the remaining inner sub-array until all elements have been visited.

This sub-repo provides a solution and explaination for a **4th Kyu Kata in Code Wars**. The content provided is solely for the purpose of training my coding skills. Any explaination and description is shared for educational purposes and isn't intended for cheating on Code Wars attempt. Feel free to learn from it.

## Description

Given an ``n x n`` array, return the array elements arranged from outermost elements to the middle element, traveling clockwise.

```
array = [[1,2,3],
         [4,5,6],
         [7,8,9]]
snail(array) #=> [1,2,3,6,9,8,7,4,5]
```

For better understanding, we follow the numbers of the next array consecutively:

```
array = [[1,2,3],
         [8,9,4],
         [7,6,5]]
snail(array) #=> [1,2,3,4,5,6,7,8,9]
```

There are several notes that we must follow:
1. The idea isn't sort the elements from the lowest value to the highest; the idea is to traverse the 2-d array in a clockwise snailshell pattern.
2. The 0x0 (empty matrix) is represented as an empty array inside an array ``[[]]``.


## Solution Breakdown

1. Create an empty result array.
2. While the input array is not empty:
    - Add the first row of the array to the result.
    - Remove the first row from the array.
    - If the array is not empty:
        - For each row in the array, add the last element to the result and remove it from the row.
    - If the array is not empty:
        - Add the last row of the array (reversed) to the result.
        - Remove the last row from the array.
    - If the array is not empty:
        - For each row in the array (in reverse order), add the first element to the result and remove it from the row.
3. Return the result array.

### Optimization
We can optimize our solution by reducing the number of operations and avoiding the creation of unnecessary slices. We need to avoid those creation for the last row reversed. Instead, we iterate over the last row in reverse order and append the elements directly to the result.

This will reduces the memory usage and the number of operations performed by the function.