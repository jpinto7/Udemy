//
//  ViewController.swift
//  Audio Player
//
//  Created by Juan Pablo Pinto Santana on 7/8/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {
    
    @IBOutlet var stopButton: UIButton!
    @IBOutlet var playButton: UIButton!
    @IBOutlet var slider: UISlider!
    var player = AVAudioPlayer()

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let audioPath = Bundle.main.path(forResource: "04 Angel Don't Cry", ofType: "mp3")
        do {
            if let path = audioPath {
                player = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: path))
            }
        } catch {
            
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func onPlay(_ sender: AnyObject) {
        player.play()
    }

    @IBAction func onStop(_ sender: AnyObject) {
        player.pause()
    }

    @IBAction func sliderMoved(_ sender: AnyObject) {
        player.volume = slider.value
    }
}

