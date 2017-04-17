//
//  ViewController.swift
//  Downloading Web Content
//
//  Created by Juan Pablo Pinto Santana on 4/11/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet var webView: UIWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        if let url = URL(string: "https://stackoverflow.com") {
            let request = NSMutableURLRequest(url: url)
            let task = URLSession.shared.dataTask(with: request as URLRequest) {
                data, response, error in
                if error != nil, let unwrappedError = error {
                    print(unwrappedError)
                } else {
                    if let unwrappedData = data, let dataString = NSString(data: unwrappedData, encoding: String.Encoding.utf8.rawValue) {
                        print(dataString)
                    }
                }
            }
            task.resume()
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

