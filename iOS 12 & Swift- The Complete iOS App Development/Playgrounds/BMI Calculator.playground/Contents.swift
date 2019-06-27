import UIKit

func BMICalculator(mass: Double, height: Double) -> Double {
    if (height > 0) {
        return mass / pow(height, 2)
    }
    return 0
}

BMICalculator(mass: 75, height: 1.79)


