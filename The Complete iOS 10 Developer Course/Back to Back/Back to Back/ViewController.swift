//
//  ViewController.swift
//  Back to Back
//
//  Created by Juan Pablo Pinto Santana on 7/9/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {

    @IBOutlet var playButton: UIBarButtonItem!
    @IBOutlet var volumeSlider: UISlider!
    @IBOutlet var stopButton: UIBarButtonItem!
    @IBOutlet var pauseButton: UIBarButtonItem!
    @IBOutlet var scrubber: UISlider!
    
    static let audioPath = Bundle.main.path(forResource: "04 Angel Don't Cry", ofType: "mp3")
    var player = AVAudioPlayer()
    var timer = Timer()

    func updateScrubber() {
        scrubber.value = Float(player.currentTime)
    }
    
    func restartAudioPlayer(setScrubberMaxValue: Bool = true) {
        if let audioPath = ViewController.audioPath {
            do {
                player = try AVAudioPlayer(contentsOf: URL(fileURLWithPath: audioPath))
                if (setScrubberMaxValue) {
                    scrubber.maximumValue = Float(player.duration)
                }
            } catch {
                
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        restartAudioPlayer()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

    @IBAction func volumeChanged(_ sender: AnyObject) {
        player.volume = volumeSlider.value
    }

    @IBAction func scrubberMoved(_ sender: AnyObject) {
        player.currentTime = TimeInterval(scrubber.value)
    }
    
    @IBAction func onPlay(_ sender: AnyObject) {
        if !player.isPlaying {
            player.play()
            timer = Timer.scheduledTimer(timeInterval: 1.0, target: self, selector: #selector(ViewController.updateScrubber), userInfo: nil, repeats: true)
        }
    }
    
    @IBAction func onPause(_ sender: AnyObject) {
        timer.invalidate()
        player.pause()
    }
    
    @IBAction func onStop(_ sender: AnyObject) {
        scrubber.value = 0
        timer.invalidate()
        player.pause()
        restartAudioPlayer(setScrubberMaxValue: false)
    }
}

