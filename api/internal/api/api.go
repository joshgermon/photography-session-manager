package api

import (
	"context"
	"log/slog"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
    "github.com/go-chi/cors"
	"github.com/go-chi/jwtauth/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joshgermon/captura-books-go/internal/repository"
)

type api struct {
	logger *slog.Logger
	secret string

	customerRepo repository.CustomerRepository
	bookingRepo  repository.BookingRepository
	offeringRepo repository.OfferingRepository
}

func NewAPI(ctx context.Context, logger *slog.Logger, pool *pgxpool.Pool, secret string) *api {
	customerRepo := repository.NewCustomerRepository(pool)
	bookingRepo := repository.NewBookingRepository(pool)
	offeringRepo := repository.NewOfferingRepository(pool)

	return &api{
		logger: logger,
		secret: secret,

		customerRepo: customerRepo,
		bookingRepo:  bookingRepo,
		offeringRepo: offeringRepo,
	}
}

func (a *api) Routes() *chi.Mux {
	r := chi.NewRouter()

	tokenAuth := jwtauth.New("HS256", []byte(a.secret), nil)

	r.Use(jwtauth.Verifier(tokenAuth))
	// r.Use(jwtauth.Authenticator)
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
      r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"https://*", "http://*"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: false,
        MaxAge:           300, // Maximum value not ignored by any of major browsers
      }))

	r.Get("/v1/bookings", a.GetBookings)
	r.Get("/v1/bookings/{bookingID}", a.GetBookingByID)
	r.Get("/v1/customers", a.GetCustomers)
	r.Get("/v1/customers/{customerID}", a.GetCustomerByID)
	r.Post("/v1/customers", a.CreateCustomer)
	r.Get("/v1/offerings", a.GetOfferings)

	return r
}
