package kata

import (
	"sort"
	"strings"
)

// Alphametics solves the alphametic puzzle by finding the values of letters that satisfy the equation.
func Alphametics(s string) string {
	// Split the equation into two parts: summands and result
	parts := strings.Split(s, " = ")
	summands := strings.Split(parts[0], " + ")
	result := parts[1]

	// Initialize a character map to store the assigned values for each letter
	charMap := make([]int, 26)
	for i := range charMap {
		charMap[i] = -1
	}
	digitUsed := 0 // Bitmask to keep track of used digits

	// Count the frequency of each character in the summands
	charFreq := make(map[rune]int)
	for _, summand := range summands {
		summandLen := len(summand)
		for i, char := range summand {
			charFreq[char] += 1 << (summandLen - 1 - i)
		}
	}

	// Subtract the frequency of each character in the result
	resultLen := len(result)
	for i, char := range result {
		charFreq[char] -= 1 << (resultLen - 1 - i)
	}

	// Create a slice of unique characters in the equation
	chars := make([]rune, 0, len(charFreq))
	for char := range charFreq {
		chars = append(chars, char)
	}

	// Sort the characters based on their frequency in descending order
	sort.Slice(chars, func(i, j int) bool {
		return charFreq[chars[i]] > charFreq[chars[j]]
	})

	// Define a backtrack function to assign values to characters recursively
	var backtrack func(idx int) bool
	backtrack = func(idx int) bool {
		if idx == len(chars) {
			return evaluate(summands, result, charMap)
		}
		for digit := 9; digit >= 0; digit-- {
			if digitUsed&(1<<digit) != 0 {
				continue
			}
			if digit == 0 {
				zeroNotAllowed := false
				for _, summand := range summands {
					if rune(summand[0]) == chars[idx] {
						zeroNotAllowed = true
						break
					}
				}
				if rune(result[0]) == chars[idx] {
					zeroNotAllowed = true
				}
				if zeroNotAllowed {
					continue
				}
			}
			charMap[chars[idx]-'A'] = digit
			digitUsed |= 1 << digit
			if backtrack(idx + 1) {
				return true
			}
			charMap[chars[idx]-'A'] = -1
			digitUsed &= ^(1 << digit)
		}
		return false
	}

	// Call the backtrack function to find a valid assignment of values
	if backtrack(0) {
		return buildResult(summands, result, charMap)
	}

	return ""
}

// evaluate calculates the numerical value of the summands and result using the assigned values in charMap.
func evaluate(summands []string, result string, charMap []int) bool {
	sum := 0
	resultVal := 0
	for _, summand := range summands {
		summandVal := 0
		for _, char := range summand {
			summandVal = summandVal*10 + charMap[char-'A']
		}
		sum += summandVal
	}
	for _, char := range result {
		resultVal = resultVal*10 + charMap[char-'A']
	}
	return sum == resultVal
}

// buildResult constructs the string representation of the equation using the assigned values in charMap.
func buildResult(summands []string, result string, charMap []int) string {
	var res strings.Builder
	for i, summand := range summands {
		if i > 0 {
			res.WriteString(" + ")
		}
		for _, char := range summand {
			res.WriteByte('0' + byte(charMap[char-'A']))
		}
	}
	res.WriteString(" = ")
	for _, char := range result {
		res.WriteByte('0' + byte(charMap[char-'A']))
	}
	return res.String()
}