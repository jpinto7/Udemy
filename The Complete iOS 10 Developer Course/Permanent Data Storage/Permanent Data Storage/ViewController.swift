//
//  ViewController.swift
//  Permanent Data Storage
//
//  Created by Juan Pablo Pinto Santana on 4/10/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        UserDefaults.standard.set("Rob", forKey: "name")
        let name = UserDefaults.standard.object(forKey: "name")
        if let trueName = name as? String {
            print(trueName)
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

