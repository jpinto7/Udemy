//
//  DetailViewController.swift
//  Blog Reader
//
//  Created by Juan Pablo Pinto Santana on 7/16/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class DetailViewController: UIViewController {

    @IBOutlet var webView: UIWebView!

    func configureView() {
        // Update the user interface for the detail item.
        if let detail = detailItem {
            self.title = detail.value(forKey: "title") as? String
            if let webView = self.webView, let content = detail.value(forKey: "content") as? String {
                webView.loadHTMLString(content, baseURL: nil)
            }
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        configureView()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    var detailItem: Event? {
        didSet {
            // Update the view.
            configureView()
        }
    }


}

