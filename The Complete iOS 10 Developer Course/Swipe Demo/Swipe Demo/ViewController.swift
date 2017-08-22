//
//  ViewController.swift
//  Swipe Demo
//
//  Created by Juan Pablo Pinto Santana on 8/6/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        let label = UILabel(frame: CGRect(x: view.bounds.width / 2 - 100, y: view.bounds.height / 2 - 50, width: 200, height: 100))
        label.text = "Drag me!"
        label.textAlignment = .center
        view.addSubview(label)
        let gesture = UIPanGestureRecognizer(target: self, action: #selector(self.wasDragged(gestureRecognizer:)))
        label.isUserInteractionEnabled = true
        label.addGestureRecognizer(gesture)
    }

    func wasDragged(gestureRecognizer: UIPanGestureRecognizer) {
        let translation = gestureRecognizer.translation(in: view)
        if let label = gestureRecognizer.view {
            label.center = CGPoint(x: view.bounds.width / 2 + translation.x, y: view.bounds.height / 2 + translation.y)
            let xFromCenter = label.center.x - view.bounds.width / 2
            var rotation = CGAffineTransform(rotationAngle: xFromCenter / 200)
            let scale = min(abs(100 / xFromCenter), 1)
            var stretchAndRotation = rotation.scaledBy(x: scale, y: scale)
            label.transform = stretchAndRotation
            if gestureRecognizer.state == .ended {
                if label.center.x < 100 {
                    print("Not chosen")
                } else if label.center.x > view.bounds.width - 100 {
                    print("Chosen")
                }
                rotation = CGAffineTransform(rotationAngle: 0)
                stretchAndRotation = rotation.scaledBy(x: 1, y: 1)
                label.transform = stretchAndRotation
                label.center = CGPoint(x: view.bounds.width / 2, y: view.bounds.height / 2)
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

