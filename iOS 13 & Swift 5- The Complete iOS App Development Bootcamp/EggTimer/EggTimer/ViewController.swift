//
//  ViewController.swift
//  EggTimer
//
//  Created by Angela Yu on 08/07/2019.
//  Copyright © 2019 The App Brewery. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var doneLabel: UILabel!
    @IBOutlet weak var timerProgressBar: UIProgressView!
    
    let eggTimes = ["Soft": 5, "Medium": 8, "Hard": 12]
    var countdownTimer = Timer()
    var totalTime = 0
    
    @IBAction func hardnessSelected(_ sender: UIButton) {
        guard let title = sender.currentTitle else { return }
        guard let eggTime = eggTimes[title] else { return }
        doneLabel.text = title
        if countdownTimer.isValid {
            endTimer()
            timerProgressBar.setProgress(1.0, animated: true)
            startTimer(eggTime)
        } else {
            startTimer(eggTime)
        }
    }

    func startTimer(_ time: Int) {
        totalTime = time
        countdownTimer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(updateTimer), userInfo: ["eggTime": time], repeats: true)
    }

    @objc func updateTimer(sender: Timer) {
        guard let userInfo = sender.userInfo as? Dictionary<String, AnyObject> else { return }
        guard let eggTime = (userInfo["eggTime"] as? Int) else { return }
        if totalTime > 0 {
            totalTime -= 1
            timerProgressBar.setProgress(Float(totalTime) / Float(eggTime), animated: true)
        } else {
            endTimer()
            timerProgressBar.setProgress(0.0, animated: true)
            doneLabel.text = "Done!"
        }
    }

    func endTimer() {
        countdownTimer.invalidate()
    }


}
