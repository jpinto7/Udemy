package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	websites := []string{
		"http://google.com",
		"http://stackoverflow.com",
		"http://facebook.com",
		"http://golang.org",
		"http://amazon.com",
		"http://programa.pro",
	}

	c := make(chan string)
	c <- "Hi there!"
	for _, link := range websites {
		go checkLink(link, c)
	}

	for l := range c {
		go func(link string) {
			time.Sleep(5 * time.Second)
			checkLink(link, c)
		}(l)
	}
}

func checkLink(link string, c chan string) {
	_, err := http.Get(link)
	if err != nil {
		fmt.Println(link, "might be down!")
		c <- link
		return
	}
	fmt.Println(link, "is up!")
	c <- link
}
