package main

import (
	uuid "github.com/satori/go.uuid"
	"github.com/thiagorcode/WebFinances/http"
	"github.com/thiagorcode/WebFinances/model"
)

func main() {
	user1 := model.User{
		Id:       uuid.NewV4().String(),
		Username: "ThiagoRcode",
		Email:    "thiago@example.com",
		Password: "Teste2123",
	}

	user2 := model.User{
		Id:       uuid.NewV4().String(),
		Username: "ThiagoRcode",
		Email:    "thiago@example.com",
		Password: "Teste2123",
	}

	users := model.Users{}
	users.Add(user1)
	users.Add(user2)

	server := http.NewWebServer()
	server.Users = &users
	server.Server()

}
