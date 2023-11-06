package main

import (
	"context"
	"log/slog"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	chiadapter "github.com/awslabs/aws-lambda-go-api-proxy/chi"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/joshgermon/captura-books-go/internal/api"
)


var db, dbErr = pgx.Connect(context.Background(), os.Getenv("DATABASE_URL"))

func main() {
	err := godotenv.Load()

    logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	if dbErr != nil {
		panic(err)
	}

    api := api.NewAPI(context.Background(), logger, db)
    adapter := *chiadapter.NewV2(api.Routes())

    lambda.Start(adapter.ProxyWithContextV2)
}
