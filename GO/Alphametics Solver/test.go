package kata_test

import (
    . "github.com/onsi/ginkgo"
    . "github.com/onsi/gomega"
    . "codewarrior/kata"
)

var _ = Describe("Example Tests",func() {
    example_tests := [...][2]string{
        {"SEND + MORE = MONEY","9567 + 1085 = 10652"},
        {"ZEROES + ONES = BINARY","698392 + 3192 = 701584"},
        {"COUPLE + COUPLE = QUARTET","653924 + 653924 = 1307848"},
        {"DO + YOU + FEEL = LUCKY","57 + 870 + 9441 = 10368"},
        {"ELEVEN + NINE + FIVE + FIVE = THIRTY","797275 + 5057 + 4027 + 4027 = 810386"},
    }
    
    for i := 0; i < len(example_tests); i++ {
        v := example_tests[i]
        It("Testing: \""+v[0]+"\"",func() {
            user := Alphametics(v[0])
            Expect(user).To(Equal(v[1]))})}
})