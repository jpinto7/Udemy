//
//  ViewController.swift
//  Spinners & Alerts
//
//  Created by Juan Pablo Pinto Santana on 7/21/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    var activityIndicator = UIActivityIndicatorView()

    @IBAction func restoreApp(_ sender: AnyObject) {
        if (activityIndicator.isAnimating) {
            activityIndicator.stopAnimating()
        }
    }
    @IBAction func pauseApp(_ sender: AnyObject) {
        if (!activityIndicator.isAnimating) {
            activityIndicator = UIActivityIndicatorView(frame: CGRect(x: 0, y: 0, width: 50, height: 50))
            activityIndicator.center = self.view.center
            activityIndicator.hidesWhenStopped = true
            activityIndicator.activityIndicatorViewStyle = .gray
            view.addSubview(activityIndicator)
            activityIndicator.startAnimating()
        }

    }
    @IBAction func createAlert(_ sender: AnyObject) {
        let alertController = UIAlertController(title: "Hey there", message: "Are you sure?", preferredStyle: .alert)
        alertController.addAction(UIAlertAction(title: "Ok", style: .default, handler: { (action) in
            print("button pressed")
            self.dismiss(animated: true, completion: nil)
        }))
        self.present(alertController, animated: true, completion: nil)
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

