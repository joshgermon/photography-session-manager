package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/joshgermon/captura-books-go/internal/api"
)

func main() {
	err := godotenv.Load()
    secret := os.Getenv("JWT_SECRET")

    logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	dbPool, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		panic(err)
	}

	defer dbPool.Close()

    api := api.NewAPI(context.Background(), logger, dbPool, secret)

    logger.Info("Starting up API server", "port", os.Getenv("PORT"))
    err = http.ListenAndServe(":" + os.Getenv("PORT"), api.Routes())

    if err != nil {
        panic(err)
    }
}
