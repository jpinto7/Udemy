import UIKit

var str = "Hello, playground"

func fibonacci(until stop : Int) {
    var seq = [0, 1]
    print(seq[0])
    print(seq[1])
    for _ in 0..<stop {
        let accum = seq[1] + seq[0]
        print(accum)
        seq[0] = seq[1]
        seq[1] = accum
    }
}


fibonacci(until: 1)
