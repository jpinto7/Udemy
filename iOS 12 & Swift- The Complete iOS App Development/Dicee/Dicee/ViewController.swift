//
//  ViewController.swift
//  Dicee
//
//  Created by Juan Pablo Pinto on 11/25/18.
//  Copyright © 2018 Juan Pablo Pinto. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    var randomDiceIndex1: Int = 0
    var randomDiceIndex2: Int = 0
    
    @IBOutlet weak var diceImageView1: UIImageView!
    @IBOutlet weak var diceImageView2: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        updateDiceImages()
    }

    @IBAction func rollButtonPressed(_ sender: UIButton) {
        updateDiceImages()
    }
    
    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        updateDiceImages()
    }
    
    func updateDiceImages() {
        randomDiceIndex1 = Int.random(in: 1...6)
        randomDiceIndex2 = Int.random(in: 1...6)
        diceImageView1.image = UIImage(named: "dice\(randomDiceIndex1)" )
        diceImageView2.image = UIImage(named: "dice\(randomDiceIndex2)" )
    }
    
}

