package model

import uuid "github.com/satori/go.uuid"

type User struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Users1 struct {
	User []User
}

func (u *Users1) Add(user User) {

	u.User = append(u.User, user)
}

func NewUser() *User {
	return &User{
		Id: uuid.NewV4().String(),
	}
}
