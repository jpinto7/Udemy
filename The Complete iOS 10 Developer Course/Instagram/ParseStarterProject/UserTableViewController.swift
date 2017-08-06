//
//  UserTableViewController.swift
//  ParseStarterProject-Swift
//
//  Created by Juan Pablo Pinto Santana on 7/25/17.
//  Copyright © 2017 Parse. All rights reserved.
//

import UIKit
import Parse

class UserTableViewController: UITableViewController {

    var usernames: [String] = []
    var userIds: [String] = []
    var isFollowing = [String: Bool]()
    var refresher = UIRefreshControl()

    func createAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            alert.dismiss(animated: true, completion: nil)
        }))
        self.present(alert, animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
        refreshUsers()
        refresher.attributedTitle = NSAttributedString(string: "Pull to refresh")
        refresher.addTarget(self, action: #selector(UserTableViewController.refreshUsers), for: .valueChanged)
        tableView.addSubview(refresher)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    func refreshUsers() {
        let query = PFUser.query()
        query?.findObjectsInBackground(block: { (objects, error) in
            if let users = objects {
                self.usernames.removeAll()
                self.userIds.removeAll()
                self.isFollowing.removeAll()
                for object in users {
                    if let user = object as? PFUser, user.objectId != PFUser.current()?.objectId {
                        let username = user.username?.components(separatedBy: "@")[0]
                        self.usernames.append(username ?? "")
                        self.userIds.append(user.objectId ?? "")
                        let query = PFQuery(className: "Followers")
                        query.whereKey("follower", equalTo: PFUser.current()?.objectId ?? "")
                        query.whereKey("following", equalTo: user.objectId ?? "")
                        query.findObjectsInBackground(block: { (objects, error) in
                            if let objects = objects {
                                self.isFollowing[user.objectId ?? ""] = objects.count > 0
                            }
                            if self.isFollowing.count == self.usernames.count {
                                self.tableView.reloadData()
                                self.refresher.endRefreshing()
                            }
                        })
                    }
                }
            }
        })
    }
    
    @IBAction func logout(_ sender: AnyObject) {
        PFUser.logOut()
        self.performSegue(withIdentifier: "logoutSegue", sender: self)
    }
    
    
    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return usernames.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        cell.textLabel?.text = usernames[indexPath.row]
        if isFollowing[userIds[indexPath.row]] ?? false {
            cell.accessoryType = .checkmark
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let cell = tableView.cellForRow(at: indexPath)
        if isFollowing[userIds[indexPath.row]] ?? false {
            isFollowing[userIds[indexPath.row]] = false
            cell?.accessoryType = .none
            let query = PFQuery(className: "Followers")
            query.whereKey("follower", equalTo: PFUser.current()?.objectId ?? "")
            query.whereKey("following", equalTo: userIds[indexPath.row])
            query.findObjectsInBackground(block: { (objects, error) in
                if let objects = objects {
                    for object in objects {
                        object.deleteInBackground()
                    }
                }
            })
        } else {
            isFollowing[userIds[indexPath.row]] = true
            cell?.accessoryType = .checkmark
            let following = PFObject(className: "Followers")
            following["follower"] = PFUser.current()?.objectId
            following["following"] = userIds[indexPath.row]
            following.saveInBackground { (success, error) in
                if error != nil {
                    cell?.accessoryType = .none
                }
            }
        }
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
