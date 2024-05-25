# Alphametics Solver in GO

## Introduction

Alphametics is a type of cryptarithm in which a set of words is written down in the form of a long addition sum or some other mathematical problem. The objective is to replace the letters of the alphabet with decimal digits to make a valid arithmetic sum.

For this problem, my objective is to write a function that accepts an alphametic equation in the form of a single-line string and returns a valid arithmetic equation in the form of a single-line string.

This sub-repo provides a solution and explaination for a **3rd Kyu Kata in Code Wars**. The content provided is solely for the purpose of training my coding skills. Any explaination and description is shared for educational purposes and isn't intended for cheating on Code Wars attempt. Feel free to learn from it.

## Description

An alphametic puzzle is a mathematical equation where letters are used as digits. Each letter represents a unique digit from 0 to 9, and the goal is to find the correct digit substitution that makes the equation true.

For example, the puzzle `SEND + MORE = MONEY` can be solved by assigning the digits 9, 5, 6, 7, 1, 0, 8, 2 to the letters S, E, N, D, M, O, R, Y respectively, resulting in the equation `9567 + 1085 = 10652`.

The challenge is to implement a function that takes a string `puzzle` representing an alphametic puzzle and returns a dictionary mapping each letter to its corresponding digit. If no solution is possible, the function should return `None`.

### Test Case Example
```
INPUT:    "SEND + MORE = MONEY"
SOLUTION: "9567 + 1085 = 10652"

INPUT:    "ELEVEN + NINE + FIVE + FIVE = THIRTY"
SOLUTION: "797275 + 5057 + 4027 + 4027 = 810386"
```
Some puzzles may have multiple valid solutions, but in this solution, I'll return one.
```
BIG + CAT = LION
403 + 679 = 1082
326 + 954 = 1280
304 + 758 = 1062
...etc.
```

### Technical Details
- All alphabetic letters in the input will be uppercase.
- Each unique letter may only be assigned to one unique digit.
- As a corollary to the above, there will be a maximum of ``10`` unique letters in any given test.
- No leading zeroes.
- The equations will only deal with addition with multiple summands on the left side and one term on the right side.
- The number of summands will range between ``2`` and ``7``, inclusive.
- The length of each summand will range from ``2`` to ``8`` characters, inclusive.
- All test cases will be valid and will have one or more possible solutions.
- A naive, brute-force algorithm may time out before the first test completes.

## Solution Breakdown

- The function ``Alphametics`` takes a string ``s`` as input, which represents an alphametic puzzle. An alphametic puzzle is a type of cryptarithm in which a set of words is written down in the form of an equation, each letter representing a unique digit.

- The input string is split into two parts: the summands (the parts to be added) and the result (the outcome of the addition). This is done using the ``strings.Split`` function.

- A character map (``charMap``) is initialized to store the assigned values for each letter. The map is an array of 26 integers (representing the 26 letters of the alphabet), all initialized to -1.

- A bitmask (``digitUsed``) is initialized to keep track of which digits have been used.

- The frequency of each character in the summands is counted and stored in the ``charFreq`` map. The frequency is weighted by the position of the character in the summand, with more weight given to characters in higher positions.

- The frequency of each character in the result is subtracted from the ``charFreq`` map, again weighted by the position of the character.

- A slice of unique characters (``chars``) in the equation is created.

- The characters are sorted based on their frequency in descending order. This is done to prioritize assigning values to characters that appear more frequently.

- A recursive function ``backtrack`` is defined to assign values to characters. It starts with the most frequent character and tries all possible unused digits for it. If a valid assignment is found (i.e., the sum of the summands equals the result), the function returns true. If no valid assignment is found, the function undoes the assignment and tries the next digit. If all digits have been tried and no valid assignment is found, the function returns false.

- The ``backtrack`` function is called to find a valid assignment of values to characters.

- If a valid assignment is found, the ``buildResult`` function is called to construct the string representation of the equation using the assigned values. If no valid assignment is found, an empty string is returned.

- The ``evaluate`` function calculates the numerical value of the summands and the result using the assigned values in ``charMap``. It returns true if the sum of the summands equals the result, and false otherwise.

- The ``buildResult`` function constructs the string representation of the equation using the assigned values in ``charMap``. It uses a ``strings.Builder`` to efficiently concatenate strings.
