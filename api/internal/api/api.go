package api

import (
	"context"
	"log/slog"
	"net/http"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5"
	"github.com/joshgermon/captura-books-go/internal/repository"
)

type api struct {
	logger *slog.Logger

	customerRepo repository.CustomerRepository
	bookingRepo  repository.BookingRepository
	offeringRepo repository.OfferingRepository
}

func NewAPI(ctx context.Context, logger *slog.Logger, db *pgx.Conn) *api {
	customerRepo := repository.NewCustomerRepository(db)
	bookingRepo := repository.NewBookingRepository(db)
	offeringRepo := repository.NewOfferingRepository(db)

	return &api{
		logger: logger,

		customerRepo: customerRepo,
		bookingRepo:  bookingRepo,
		offeringRepo: offeringRepo,
	}
}

func (a *api) Routes() *chi.Mux {
	r := chi.NewRouter()

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

	r.Get("/", func (w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("Let's SEE!"))
    })
	r.Get("/v1/bookings", a.GetBookings)
	r.Get("/v1/bookings/{bookingID}", a.GetBookingByID)
	r.Post("/v1/bookings", a.CreateBooking)
	r.Get("/v1/customers", a.GetCustomers)
	r.Get("/v1/customers/{customerID}", a.GetCustomerByID)
	r.Post("/v1/customers", a.CreateCustomer)
	r.Get("/v1/offerings", a.GetOfferings)

	return r
}
