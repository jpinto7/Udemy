//
//  ViewController.swift
//  Animations
//
//  Created by Juan Pablo Pinto Santana on 4/16/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var image: UIImageView!
    @IBOutlet var button: UIButton!
    
    var counter = 1
    var timer = Timer()
    var isAnimating = false
    
    func animate() {
        if (counter > 28) {
            counter = 0
        }
        image.image = UIImage(named: "frame_\(counter)_delay-0.07s.gif")
        counter += 1
    }
    
    
    @IBAction func fadeIn(_ sender: Any) {
        image.alpha = 0
        UIView.animate(withDuration: 1, animations: {
            self.image.alpha = 1
        })
    }
    
    @IBAction func slideIn(_ sender: Any) {
        image.center = CGPoint(x: image.center.x - 500, y: image.center.y)
        UIView.animate(withDuration: 2, animations: {
            self.image.center.x += 500
        })
    }
 
    @IBAction func grow(_ sender: Any) {
        image.frame = CGRect(x: 0, y: 0, width: 0, height: 0)
        UIView.animate(withDuration: 1, animations: {
            self.image.frame = CGRect(x: 0, y: 0, width: 200, height: 200)
        })
    }
    
    @IBAction func next(_ sender: Any) {
        if isAnimating {
            timer.invalidate()
            button.setTitle("Start Animation", for: [])
        } else {
            timer = Timer.scheduledTimer(timeInterval: 0.07, target: self, selector: #selector(ViewController.animate), userInfo: nil, repeats: true)
            button.setTitle("Stop Animation", for: [])
        }
        isAnimating = !isAnimating
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

