# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

# - Go
FROM golang:alpine as backend

LABEL maintainer="Thiago Rodrigues <ti.thiago.rodrigues@gmail.com>"

RUN apk update && apk add --no-cache git

WORKDIR /app

RUN mkdir -p /src 

RUN go mod download 

COPY . .
# Definir diretório de trabalho
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest
RUN apk --no-cache add ca-certificates

WORKDIR /root/
COPY --from=builder /app/main .
COPY --from=builder /app/.env .  
ADD . /src

# Expose port 8080 to the outside world
EXPOSE 8080

#Command to run the executable
CMD ["./main"]
