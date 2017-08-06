//
//  FeedTableViewController.swift
//  ParseStarterProject-Swift
//
//  Created by Juan Pablo Pinto Santana on 7/30/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import UIKit
import Parse

class FeedTableViewController: UITableViewController {

    var users: [String: String] = [:]
    var messages: [String] = []
    var usernames: [String] = []
    var imageFiles: [PFFile] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let query = PFUser.query()
        query?.findObjectsInBackground(block: { (objects, error) in
            if let users = objects as? [PFUser] {
                self.users.removeAll()
                for user in users {
                    self.users[user.objectId ?? ""] = user.username ?? ""
                }
            }
            let query = PFQuery(className: "Followers")
            query.whereKey("follower", equalTo: PFUser.current()?.objectId ?? "")
            query.findObjectsInBackground(block: { (objects, error) in
                if let followers = objects {
                    for follower in followers {
                        let followedUser = follower["following"] as? String ?? ""
                        let query = PFQuery(className: "Posts")
                        query.whereKey("userid", equalTo: followedUser)
                        query.findObjectsInBackground(block: { (objects, error) in
                            if let posts = objects {
                                for post in posts {
                                    self.messages.append(post["message"] as! String)
                                    self.imageFiles.append(post["imageFile"] as! PFFile)
                                    self.usernames.append(self.users[post["userid"] as! String]!)
                                    self.tableView.reloadData()
                                }
                            }
                        })
                    }
                }
            })
        })
        
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return 4
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath) as! FeedTableViewCell
        imageFiles[indexPath.row].getDataInBackground { (data, error) in
            if let imageData = data {
                cell.postedImage.image = UIImage(data: imageData)
            }
        }
        cell.postedImage.image = UIImage(named: "person-icon.png")
        cell.usernameLabel.text = usernames[indexPath.row]
        cell.messageLabel.text = messages[indexPath.row]
        return cell
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
