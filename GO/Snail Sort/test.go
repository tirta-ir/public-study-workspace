package kata_test

import (
	. "codewarrior/kata"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("snail tests function", func() {
	It("should resolve 3x3", func() {
		snailMap := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
		Expect(Snail(snailMap)).To(Equal([]int{1, 2, 3, 6, 9, 8, 7, 4, 5}))
	})
})