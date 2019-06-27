import UIKit

func beerSong(forNumberOfBottles totalNumberOfBottles : Int) -> String {
    var lyrics = ""
    
    for i in (0...totalNumberOfBottles).reversed() {
        if i > 1 {
            lyrics += "\(i) bottles of beer on the wall, \(i) bottles of beer.\nTake one down and pass it around, \(i-1) bottles of beer on the wall.\n\n"
        } else if i == 1 {
            lyrics += "\(i) bottle of beer on the wall, \(i) bottle of beer.\nTake one down and pass it around, no more bottles of beer on the wall.\n\n"
        }
        else {
            lyrics += "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, \(totalNumberOfBottles) bottles of beer on the wall."
        }
    }
    return lyrics
}

print(beerSong(forNumberOfBottles: 99))
