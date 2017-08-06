//
//  ViewController.swift
//  Sound Shaker
//
//  Created by Juan Pablo Pinto Santana on 7/9/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {

    var player = AVAudioPlayer()
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func motionEnded(_ motion: UIEventSubtype, with event: UIEvent?) {
        if (event?.subtype == UIEventSubtype.motionShake) {
            let soundArray = [
                "04 Da Funk",
                "03 Digital Love",
                "04 Harder, Better, Faster, Stronger",
                "01 Human After All",
                "02 The Prime Time of Your Life",
                "03 Robot Rock",
                "08 Television Rules the Nation"
            ]
            let randomNumber = Int(arc4random_uniform(UInt32(soundArray.count)))
            let fileLocation = Bundle.main.path(forResource: soundArray[randomNumber], ofType: "mp3")
            do {
                if let location = fileLocation {
                    player = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: location))
                    player.play()
                }
            } catch {
                
            }
        }
    }
}

