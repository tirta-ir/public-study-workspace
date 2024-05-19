package kata

func Snail(snaipMap [][]int) []int {
    result := []int{}

    for len(snaipMap) > 0 {
        // Add the first row
        result = append(result, snaipMap[0]...)
        snaipMap = snaipMap[1:]

        if len(snaipMap) > 0 {
            // Add the last element of each row
            for i := range snaipMap {
                result = append(result, snaipMap[i][len(snaipMap[i])-1])
                snaipMap[i] = snaipMap[i][:len(snaipMap[i])-1]
            }

            // Add the last row (reversed)
            if len(snaipMap) > 0 {
                for i := len(snaipMap[len(snaipMap)-1])-1; i >= 0; i-- {
                    result = append(result, snaipMap[len(snaipMap)-1][i])
                }
                snaipMap = snaipMap[:len(snaipMap)-1]
            }

            // Add the first element of each row (in reverse order)
            for i := len(snaipMap) - 1; i >= 0; i-- {
                result = append(result, snaipMap[i][0])
                snaipMap[i] = snaipMap[i][1:]
            }
        }
    }

    return result
}