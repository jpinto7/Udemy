package main

import "fmt"

type square struct {
	sideLenght float64
}

type triangle struct {
	height float64
	base   float64
}

type shape interface {
	getArea() float64
}

func main() {
	t1 := triangle{height: 10, base: 20}
	s1 := square{sideLenght: 30}
	printArea(t1)
	printArea(s1)
}

func printArea(sh shape) {
	area := sh.getArea()
	fmt.Println(area)
}

func (t triangle) getArea() float64 {
	return t.base * t.height / 2
}

func (s square) getArea() float64 {
	return s.sideLenght * s.sideLenght
}
