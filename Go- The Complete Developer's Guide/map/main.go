package main

import "fmt"

type person struct {
	name string
	age  int
}

func main() {
	//var colors map[string]string
	juy := []string{"he", "hi"}
	colors := make(map[string]string)
	// //jepe := 4
	// jepe := person{
	// 	name: "Juan",
	// }

	// colors := map[string]string{
	// 	"red":   "#ff0000",
	// 	"green": "#4bf745",
	// }

	colors["white"] = "#ffffff"
	//delete(colors, "white")
	fmt.Println(colors)
	fmt.Printf("v: %p %v\n", &juy, juy)

	for _, hex := range colors {
		fmt.Println(hex)
	}
}
