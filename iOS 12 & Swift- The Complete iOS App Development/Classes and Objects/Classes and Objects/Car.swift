//
//  Car.swift
//  Classes and Objects
//
//  Created by Juan Pablo Pinto on 5/13/19.
//  Copyright © 2019 Juan Pablo Pinto. All rights reserved.
//

import Foundation

enum CarType {
    case Sedan
    case Coupe
    case Hatchback
}

class Car {
    var colour : String
    var numberOfSeats : Int
    var typeOfCar : CarType
    
    init(_ colour : String = "Black", _ numberOfSeats : Int = 5, _ typeOfCar : CarType = .Hatchback) {
        self.colour = colour
        self.numberOfSeats = numberOfSeats
        self.typeOfCar = typeOfCar
    }
    
    func drive() {
        print("Car is moving!")
    }
}
