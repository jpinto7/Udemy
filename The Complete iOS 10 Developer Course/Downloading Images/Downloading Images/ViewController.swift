//
//  ViewController.swift
//  Downloading Images
//
//  Created by Juan Pablo Pinto Santana on 7/15/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet var beethovenImageView: UIImageView!

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
        if documentsPath.count > 0 {
            let documentsDirectory = documentsPath[0]
            let restorePath = documentsDirectory + "/beethoven.jpg"
            beethovenImageView.image = UIImage(contentsOfFile: restorePath)
        }
        
        /*
        if let url = URL(string: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Beethoven.jpg/220px-Beethoven.jpg") {
            let request = NSMutableURLRequest(url: url)
            let task = URLSession.shared.dataTask(with: request as URLRequest) {
                data, response, error in
                if error != nil {
                    print(error ?? "An error ocurred")
                } else {
                    if let data = data, let beethovenImage = UIImage(data: data) {
                        self.beethovenImageView.image = beethovenImage
                        let documentsPath = NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)
                        if documentsPath.count > 0 {
                            let documentsDirectory = documentsPath[0]
                            let savePath = documentsDirectory + "/beethoven.jpg"
                            do {
                             try UIImageJPEGRepresentation(beethovenImage, 1)?.write(to: URL(fileURLWithPath: savePath))
                            } catch {
                                print("Could not save image")
                            }
                        }
                    }
                }
            }
            task.resume()
        } 
        */
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

