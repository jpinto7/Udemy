//
//  ViewController.swift
//  Magic 8 Ball
//
//  Created by Juan Pablo Pinto on 2/10/19.
//  Copyright © 2019 Juan Pablo Pinto. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var imageView: UIImageView!
    var randomBallNumber = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func askButtonPressed(_ sender: UIButton) {
        newBallImage()
    }
    
    override func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?) {
        newBallImage()
    }
    
    func newBallImage() {
        randomBallNumber = Int.random(in: 1...5)
        imageView.image = UIImage(named: "ball\(randomBallNumber)")
    }
    
}

