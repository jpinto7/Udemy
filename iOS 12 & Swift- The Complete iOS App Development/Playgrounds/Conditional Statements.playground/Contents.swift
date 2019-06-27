import UIKit

func loveCalculator(yourName: String, theirName: String) -> String {
    let loveScore = arc4random_uniform(101)
    if loveScore > 80 {
    return "Your love score is \(loveScore). You love each other."
    }
    return "No love possible"
}

print(loveCalculator(yourName: "Juan", theirName: "Maria"))
