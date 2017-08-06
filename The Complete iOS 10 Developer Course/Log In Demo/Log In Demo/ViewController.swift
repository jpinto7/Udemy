//
//  ViewController.swift
//  Log In Demo
//
//  Created by Juan Pablo Pinto Santana on 7/10/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    @IBOutlet var usernameTextField: UITextField!
    @IBOutlet var passwordTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
            let context = appDelegate.persistentContainer.viewContext
            let newUser = NSEntityDescription.insertNewObject(forEntityName: "Users", into: context)
            newUser.setValue("jpinto", forKey: "username")
            newUser.setValue("12345", forKey: "password")
            do {
                try context.save()
                print("Saved")
            } catch {
                print("An error ocurred while saving")
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


    @IBAction func onLogIn(_ sender: AnyObject) {
        if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
            let context = appDelegate.persistentContainer.viewContext
            let username = usernameTextField.text ?? "";
            let password = passwordTextField.text ?? "";
            let request = NSFetchRequest<NSFetchRequestResult>(entityName: "Users")
            request.returnsObjectsAsFaults = false
            do {
                let results = try context.fetch(request)
                if results.count > 0, let managedResults = results as? [NSManagedObject] {
                    for result in managedResults {
                        let dataUsername = result.value(forKey: "username") as? String ?? ""
                        let dataPassword = result.value(forKey: "password") as? String ?? ""
                        if dataUsername == username && dataPassword == password {
                            print("Logged in")
                            break
                        }
                    }
                } else {
                    print("No results")
                }
            } catch {
                print("Couldn't fetch data")
            }
        }
    }
}

