//
//  ViewController.swift
//  TicTacToe
//
//  Created by Juan Pablo Pinto Santana on 6/24/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit

enum Player {
    case Empty
    case Cross
    case Nought
}

class ViewController: UIViewController {
    
    @IBOutlet var winnerLabel: UILabel!

    @IBOutlet var playAgainButton: UIButton!
    
    
    var activePlayer: Player = .Nought
    var gameActive = true
    var gameState: [Player] = [
        .Empty,
        .Empty,
        .Empty,
        .Empty,
        .Empty,
        .Empty,
        .Empty,
        .Empty,
        .Empty
    ]
    let winningCombinations = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ]
    

    override func viewDidLoad() {
        super.viewDidLoad()
        winnerLabel.isHidden = true
        playAgainButton.isHidden = true
        winnerLabel.center = CGPoint(x: winnerLabel.center.x - 500, y: winnerLabel.center.y)
        playAgainButton.center = CGPoint(x: playAgainButton.center.x - 500, y: playAgainButton.center.y)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    func hasPlayerWon() -> Bool {
        for winningCombination in winningCombinations {
            var crosses = 0
            var noughts = 0
            for position in winningCombination {
                switch (gameState[position]) {
                    case .Cross:
                        crosses += 1
                    case .Nought:
                        noughts += 1
                    case .Empty:
                        break
                }
            }
            if ((noughts == 3) || (crosses == 3)) {
                gameActive = false
                winnerLabel.isHidden = false
                playAgainButton.isHidden = false
                switch (activePlayer) {
                case .Cross:
                    winnerLabel.text = "Crosses has won!"
                case .Nought:
                    winnerLabel.text = "Noughts has won!"
                default:
                    return false
                }
                UIView.animate(withDuration: 1, animations: {
                    self.winnerLabel.center = CGPoint(x: self.winnerLabel.center.x + 500, y: self.winnerLabel.center.y)
                    self.playAgainButton.center = CGPoint(x: self.playAgainButton.center.x + 500, y: self.playAgainButton.center.y)
                })
                return true
            }
        }
        return false
    }
    
    @IBAction func playAgain(_ sender: AnyObject) {
        gameActive = true
        activePlayer = .Nought
        gameState = [
            .Empty,
            .Empty,
            .Empty,
            .Empty,
            .Empty,
            .Empty,
            .Empty,
            .Empty,
            .Empty
        ]
        for i in 1..<10 {
            if let button = view.viewWithTag(i) as? UIButton {
                button.setImage(nil, for: [])
            }
        }
        winnerLabel.isHidden = true
        playAgainButton.isHidden = true
        winnerLabel.center = CGPoint(x: winnerLabel.center.x - 500, y: winnerLabel.center.y)
        playAgainButton.center = CGPoint(x: playAgainButton.center.x - 500, y: playAgainButton.center.y)
    }
    
    @IBAction func buttonPressed(_ sender: AnyObject) {
        if (gameActive) {
            let stateIndex = sender.tag - 1
            switch (activePlayer) {
            case .Nought:
                if (gameState[stateIndex] == .Empty) {
                    sender.setImage(#imageLiteral(resourceName: "nought.png"), for: [])
                    gameState[stateIndex] = .Nought
                    if (hasPlayerWon()) {
                        return

                    }
                    activePlayer = .Cross
                }
            case .Cross:
                if (gameState[stateIndex] == .Empty) {
                    sender.setImage(#imageLiteral(resourceName: "cross.png"), for: [])
                    gameState[stateIndex] = .Cross
                    if (hasPlayerWon()) {
                        return
                        
                    }
                    activePlayer = .Nought
                }
            default:
                return
            }
        }
    }

}

