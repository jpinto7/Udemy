//
//  ViewController.swift
//  API Demo
//
//  Created by Juan Pablo Pinto Santana on 7/15/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        if let url = URL(string: "https://jsonplaceholder.typicode.com/users") {
            let task = URLSession.shared.dataTask(with: url) {
                data, response, error in
                if error != nil {
                    print(error ?? "An error ocurred")
                } else {
                    if let urlContent = data {
                        do {
                            let jsonResult = try JSONSerialization.jsonObject(with: urlContent, options: JSONSerialization.ReadingOptions.mutableContainers) as AnyObject
                            print(jsonResult)
                            print((jsonResult[0] as? NSDictionary)?["email"] as? String ?? "")
                        } catch {
                            
                        }

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

