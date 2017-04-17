//
//  SecondViewController.swift
//  To Do List
//
//  Created by Juan Pablo Pinto Santana on 4/10/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

class SecondViewController: UIViewController, UITextFieldDelegate {

    @IBOutlet var itemTextField: UITextField!
    
    var items: [String] = []
   
    @IBAction func addItem(_ sender: Any) {
        let itemsObject = UserDefaults.standard.object(forKey: "items")
        if let tempItems = itemsObject as? [String], let itemText = itemTextField.text {
            items = tempItems
            items.append(itemText)
        } else {
            if let itemText = itemTextField.text {
                items = [itemText]
            }
        }
        
        UserDefaults.standard.set(items, forKey: "items")
        itemTextField.text = ""
    }
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        self.view.endEditing(true)
    }
    
    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
        return textField.resignFirstResponder()
    }
    

}

