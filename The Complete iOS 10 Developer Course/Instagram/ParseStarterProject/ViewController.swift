/**
* Copyright (c) 2015-present, Parse, LLC.
* All rights reserved.
*
* This source code is licensed under the BSD-style license found in the
* LICENSE file in the root directory of this source tree. An additional grant
* of patent rights can be found in the PATENTS file in the same directory.
*/

import UIKit
import Parse

class ViewController: UIViewController {
    
    var signupMode = true

    var activityIndicator = UIActivityIndicatorView()
    
    @IBOutlet var emailTextField: UITextField!

    @IBOutlet var messageLabel: UILabel!
    
    @IBOutlet var passwordTextField: UITextField!
    
    @IBOutlet var signupOrLoginButton: UIButton!

    @IBOutlet var changeSignupModeButton: UIButton!
    
    func createAlert(title: String, message: String) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { (action) in
            alert.dismiss(animated: true, completion: nil)
        }))
        self.present(alert, animated: true, completion: nil)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.navigationController?.navigationBar.isHidden = true
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        if PFUser.current() != nil {
            performSegue(withIdentifier: "showUsersTable", sender: self)
        }
    }
    
    @IBAction func signupOrLogin(_ sender: AnyObject) {
        guard let email = emailTextField.text else {
            createAlert(title: "Error in form", message: "Please enter an email")
            return
        }
        
        guard let password = passwordTextField.text else {
            createAlert(title: "Error in form", message: "Please enter a password")
            return
        }

        activityIndicator = UIActivityIndicatorView(frame: CGRect(x: 0, y: 0, width: 50, height: 50))
        activityIndicator.center = self.view.center
        activityIndicator.hidesWhenStopped = true
        activityIndicator.activityIndicatorViewStyle = .gray
        view.addSubview(activityIndicator)
        activityIndicator.startAnimating()
        UIApplication.shared.beginIgnoringInteractionEvents()
        if signupMode {
            let user = PFUser()
            user.username = emailTextField.text
            user.email = emailTextField.text
            user.password = passwordTextField.text
            user.signUpInBackground(block: { (success, error) in
                self.activityIndicator.stopAnimating()
                UIApplication.shared.endIgnoringInteractionEvents()
                if error != nil {
                    var displayMessage = "Please try again later"
                    if let error = error as NSError?, let errorMessage = error.userInfo["error"] as? String {
                        displayMessage = errorMessage
                    }
                    self.createAlert(title: "Sign Up Error", message: displayMessage)
                } else {
                    print("user signed up")
                    self.performSegue(withIdentifier: "showUsersTable", sender: self)
                }
            })
        } else {
            PFUser.logInWithUsername(inBackground: email, password: password, block: { (user, error) in
                self.activityIndicator.stopAnimating()
                UIApplication.shared.endIgnoringInteractionEvents()
                if error != nil {
                    var displayMessage = "Please try again later"
                    if let error = error as NSError?, let errorMessage = error.userInfo["error"] as? String {
                        displayMessage = errorMessage
                    }
                    self.createAlert(title: "Log In Error", message: displayMessage)
                } else {
                    print("Logged in")
                    self.performSegue(withIdentifier: "showUsersTable", sender: self)
                }
            })
        }
    }

    @IBAction func changeSignupMode(_ sender: AnyObject) {
        if signupMode {
            signupOrLoginButton.setTitle("Log In", for: [])
            changeSignupModeButton.setTitle("Sign Up", for: [])
            messageLabel.text = "Don't have an account?"
            signupMode = false
        } else {
            signupOrLoginButton.setTitle("Sign Up", for: [])
            changeSignupModeButton.setTitle("Log In", for: [])
            messageLabel.text = "Already have an account?"
            signupMode = true
        }
    }
}
