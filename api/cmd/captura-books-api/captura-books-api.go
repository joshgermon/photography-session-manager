package main

import (
	"context"
	"fmt"
	"log/slog"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/lambda"
	chiadapter "github.com/awslabs/aws-lambda-go-api-proxy/chi"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/joshgermon/captura-books-go/internal/api"
)


var startDB = time.Now()
var dbPool, dbErr = pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
var endDB = time.Since(startDB)

func main() {
    fmt.Printf("DB Connection took - %s \n", endDB)
    start := time.Now()

	err := godotenv.Load()
    secret := os.Getenv("JWT_SECRET")

    logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	if dbErr != nil {
		panic(err)
	}

	defer dbPool.Close()

    api := api.NewAPI(context.Background(), logger, dbPool, secret)

    elapsed := time.Since(start)
    logger.Info("Logger, env, api all setup","time", elapsed)

    adapter := *chiadapter.New(api.Routes())

    logger.Info("Starting up API server", "port", os.Getenv("PORT"))

    lambda.Start(adapter.ProxyWithContext)
}
