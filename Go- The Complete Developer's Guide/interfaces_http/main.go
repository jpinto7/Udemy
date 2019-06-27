package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

type logWriter struct {
}

func main() {
	resp, err := http.Get("https://google.com")
	jepe := logWriter{}
	if err != nil {
		fmt.Println("Error", err)
		os.Exit(1)
	}
	io.Copy(jepe, resp.Body)
}

func (logWriter) Write(bs []byte) (int, error) {
	fmt.Println(string(bs))
	fmt.Println("Just wrote this many bytes", len(bs))
	return len(bs), nil
}
