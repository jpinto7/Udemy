//
//  ViewController.swift
//  Core Data Demo
//
//  Created by Juan Pablo Pinto Santana on 7/10/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import CoreData

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        if let appDelegate = UIApplication.shared.delegate as? AppDelegate {
            let context = appDelegate.persistentContainer.viewContext
            /*
            let newUser = NSEntityDescription.insertNewObject(forEntityName: "Users", into: context)
            newUser.setValue("lily", forKey: "username")
            newUser.setValue("12345", forKey: "password")
            newUser.setValue(15, forKey: "age")
            do {
                try context.save()
                print("Saved")
            } catch {
                print("There was an error")
            }
            */
            
            let request = NSFetchRequest<NSFetchRequestResult>(entityName: "Users")
            request.predicate = NSPredicate(format: "username = %@", "tommy")
            request.returnsObjectsAsFaults = false
            do {
                let results = try context.fetch(request)
                if results.count > 0, let managedResults = results as? [NSManagedObject] {
                    for result in managedResults {
                        let username = result.value(forKey: "username") as? String ?? ""
                        print(username)
                        context.delete(result)
                        do {
                            try context.save()
                        } catch {
                            print("Delete result failed")
                        }
                        //let password = result.value(forKey: "password") as? String ?? ""
                        //let age = result.value(forKey: "age") as? Int16 ?? 0
                    }
                } else {
                    print("No results")
                }
                
            } catch {
                print("Couldn't fetch data")
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }


}

