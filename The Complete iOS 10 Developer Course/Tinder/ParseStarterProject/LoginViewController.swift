import UIKit
import Render
import Parse

// A simple component state that keeps track of the number of times the user tapped on the view.

struct LoginFormComponentViewState: StateType {
    var loginMode = true
    var password = ""
    var username = ""
    var errorMessage = ""
}

class LoginFormComponentView: ComponentView<LoginFormComponentViewState> {
    
    required init() {
        super.init()
        // Optimization: The component doesn't have a dynamic hierarchy - this prevents the
        // reconciliation algorithm to look for differences in the component view hierarchy.
        defaultOptions = [.preventViewHierarchyDiff]
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func render() -> NodeType {
        let container = Node<UIView> { view, layout, size in
            layout.maxWidth = 300
            layout.width = size.width
        }
        let titleLabel = Node<UILabel> { view, layout, _ in
            view.text = "Tinder"
            view.textAlignment = .center
            view.font = view.font.withSize(35)
            layout.marginBottom = 20
        }
        let usernameTextField = Node<UITextField> { [weak self] view, layout, size in
            view.borderStyle = UITextBorderStyle.roundedRect
            layout.marginBottom = 10
            layout.height = 35
            layout.flexGrow = 1
            view.text = self?.state.username
            view.tag = 0
            view.placeholder = "Ingrese su usuario"
            view.addTarget(self, action: #selector(self?.textChanged(textField:)), for: UIControlEvents.editingChanged)
        }
        let passwordTextField = Node<UITextField> { [weak self] view, layout, size in
            view.borderStyle = UITextBorderStyle.roundedRect
            view.tag = 1
            view.text = self?.state.password
            layout.marginBottom = 30
            layout.height = 35
            view.placeholder = "Ingrese su contraseña"
            view.isSecureTextEntry = true
            view.addTarget(self, action: #selector(self?.textChanged(textField:)), for: UIControlEvents.editingChanged)
        }
        let loginButton = Node<UIButton> { [weak self] view, layout, size in
            view.backgroundColor = Color.green
            view.cornerRadius = 5
            view.setTitle(self?.setButtonTitle(), for: [])
            view.addTarget(self, action: #selector(self?.loginButtonPressed), for: .touchUpInside)
            layout.marginBottom = 10
        }
        let modeButton = Node<UIButton> { [weak self] view, layout, size in
            view.backgroundColor = Color.red
            view.cornerRadius = 5
            view.setTitle(self?.setButtonTitle(inverse: true), for: [])
            view.addTarget(self, action: #selector(self?.changeLoginMode), for: .touchUpInside)
        }
        return container.add(children: [titleLabel, usernameTextField, passwordTextField, loginButton, modeButton])
    }
    
    
    private func setButtonTitle(inverse: Bool = false) -> String {
        if inverse {
            return state.loginMode ? "Signup" : "Login"
        }
        return state.loginMode ? "Login" : "Signup"
    }
    
    func changeLoginMode() {
        setState { state in state.loginMode = !state.loginMode }
    }
    
    func loginButtonPressed() {
        let user = PFUser()
        user.username = state.username
        user.password = state.password
        if state.loginMode {
            PFUser.logInWithUsername(inBackground: state.username, password: state.password, block: { (user, error) in
                if error != nil, let error = error as NSError? {
                    var errorMessage = "Login failed - please try again"
                    if let message = error.userInfo["error"] as? String {
                        errorMessage = message
                    }
                    self.setState { state in state.errorMessage = errorMessage }
                } else {
                   print("Login!")
                }
            })
        } else {
            user.signUpInBackground { (success, error) in
                if error != nil, let error = error as NSError? {
                    var errorMessage = "Signup failed - please try again"
                    if let message = error.userInfo["error"] as? String {
                        errorMessage = message
                    }
                    self.setState { state in state.errorMessage = errorMessage }
                } else {
                    print("Signup!")
                }
            }
        }
    }
    
    func textChanged(textField: UITextField) {
        switch textField.tag {
            case 0:
                self.setState(change: { (state) -> (Void) in
                    state.username = textField.text ?? ""
                })
            case 1:
                self.setState(change: { (state) -> (Void) in
                    state.password = textField.text ?? ""
                })
            default:
                return
        }
    }
    
    private func popView(view: UIView, completion: @escaping () -> ()) {
        func animateIn() {
            view.transform = CGAffineTransform(scaleX: 1.1, y: 1.1)
            view.backgroundColor = Color.darkerGreen
        }
        func animateOut(finished: Bool) {
            view.transform = CGAffineTransform.identity
            completion()
        }
        UIView.animate(withDuration: 0.3, animations: animateIn, completion: animateOut(finished:))
    }
}

class LoginViewController: UIViewController, ComponentController {
    
    // Our root component.
    var component = LoginFormComponentView()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Adds the component to the view hierarchy.
        addComponentToViewControllerHierarchy()
    }
    
    // Whenever the view controller changes bounds we want to re-render the component.
    override func viewDidLayoutSubviews() {
        renderComponent()
    }
    
    func configureComponentProps() {
        // No props to configure
        
    }
}
