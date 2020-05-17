//
//  Question.swift
//  Quizzler-iOS13
//
//  Created by Juan Pablo Pinto on 12/8/19.
//  Copyright © 2019 The App Brewery. All rights reserved.
//

import Foundation

struct Question {
    let text: String
    let answer: Bool
    
    init(q: String, a: Bool) {
        text = q
        answer = a
    }
}
