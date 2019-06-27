//
//  main.swift
//  Classes and Objects
//
//  Created by Juan Pablo Pinto on 5/13/19.
//  Copyright © 2019 Juan Pablo Pinto. All rights reserved.
//

import Foundation

let myCar = Car()
let mySelfDrivingCar = SelfDrivingCar()

print(myCar.typeOfCar)
print(myCar.colour)
print(myCar.numberOfSeats)

myCar.drive()
mySelfDrivingCar.drive()
