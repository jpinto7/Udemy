// Creating getMilk function
func getMilk() {
    print("go to the shops")
    print("buy 2 cartons of milk")
    print("pay $2")
    print("come home")
}

//func getMilk(howManyMilkCartons: Int) {
//    let priceToPay = howManyMilkCartons * 2
//    print("go to the shops")
//    print("buy \(howManyMilkCartons) cartons of milk")
//    print("pay $\(priceToPay)")
//    print("come home")
//}

func getMilk(howManyMilkCartons: Int, howMuchMoney: Int) -> Int {
    let priceToPay = howManyMilkCartons * 2
    print("go to the shops")
    print("buy \(howManyMilkCartons) cartons of milk")
    print("pay $\(priceToPay)")
    print("come home")
    let change = howMuchMoney - priceToPay
    if change >= 0 {
        return change
    } else {
        return howMuchMoney
    }
}

// Calling getMilk
//getMilk()
//getMilk()
var amountOfChange = getMilk(howManyMilkCartons: 20, howMuchMoney: 100)
//getMilk(howManyMilkCartons: 5)
//getMilk(howManyMilkCartons: 10)
print("Hello, here's your change: $\(amountOfChange)")
