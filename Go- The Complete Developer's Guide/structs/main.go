package main

import "fmt"

type contactInfo struct {
	email   string
	zipCode int
}

type person struct {
	firstName string
	lastName  string
	contactInfo
}

func main() {
	jim := person{
		firstName: "Jim",
		lastName:  "Roy",
		contactInfo: contactInfo{
			email:   "jim@gmail.com",
			zipCode: 94000,
		},
	}
	jim.updateName("Johnny")
	jim.print()
}

func (p person) print() {
	fmt.Printf("%+v", p)
}

func (p *person) updateName(newFirstName string) {
	(p).firstName = newFirstName
}
