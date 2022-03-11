package http

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/thiagorcode/WebFinances/model"
)

type WebServer struct {
	Users *model.Users
}

func NewWebServer() *WebServer {
	return &WebServer{}
}

func (w WebServer) Server() {
	e := echo.New()
	e.GET("/user", w.getAll)
	e.POST("/user", w.createUser)
	e.Logger.Fatal(e.Start(":3333"))
}

func (w WebServer) getAll(c echo.Context) error {
	return c.JSON(http.StatusOK, w.Users)
}

func (w WebServer) createUser(c echo.Context) error {
	user := model.NewUser()

	if err := c.Bind(user); err != nil {
		return err
	}

	w.Users.Add(*user)
	return c.JSON(http.StatusCreated, user)
}
