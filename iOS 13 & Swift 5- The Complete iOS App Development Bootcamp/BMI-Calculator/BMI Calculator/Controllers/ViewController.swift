//
//  ViewController.swift
//  BMI Calculator
//
//  Created by Angela Yu on 21/08/2019.
//  Copyright © 2019 Angela Yu. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var heightSlider: UISlider!
    @IBOutlet weak var weightSlider: UISlider!
    @IBOutlet weak var weightLabel: UILabel!
    @IBOutlet weak var heightLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBAction func calculateBMI(_ sender: UIButton) {
        var bmi : Float = 0.0
        let divisor = pow(heightSlider.value, 2)
        if divisor != 0 {
            bmi = weightSlider.value / divisor
        }
        print(bmi)
    }
    
    @IBAction func heightChange(_ sender: UISlider) {
        heightLabel.text = String(format:"%.2fm", sender.value)
    }
    
    @IBAction func weightChange(_ sender: UISlider) {
        weightLabel.text = String(format:"%@Kg", String(Int(sender.value)))
    }
}

