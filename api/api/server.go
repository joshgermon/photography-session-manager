package api

import (
	"context"
	"log/slog"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joshgermon/captura-books-go/repository"
)

type server struct {
	logger *slog.Logger

	userRepo repository.UserRepository
	customerRepo repository.CustomerRepository
	bookingRepo  repository.BookingRepository
	offeringRepo repository.OfferingRepository
}

type SuccessResponse struct {
	Data   interface{} `json:"data"`
}

type ErrorResponse struct {
	Error   interface{} `json:"error"`
}

func NewServer(ctx context.Context, logger *slog.Logger, db *pgxpool.Pool) *server {
	userRepo := repository.NewUserRepository(db)
	customerRepo := repository.NewCustomerRepository(db)
	bookingRepo := repository.NewBookingRepository(db)
	offeringRepo := repository.NewOfferingRepository(db)

	return &server{
		logger: logger,

		userRepo: userRepo,
		customerRepo: customerRepo,
		bookingRepo:  bookingRepo,
		offeringRepo: offeringRepo,
	}
}

func (s *server) Routes() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))


	r.Post("/v1/auth/gcal", s.GetGoogleAccessToken)
	r.Post("/v1/auth/login", s.LoginUser)
	r.Get("/v1/auth/session", s.GetUserSession)

	r.Get("/v1/bookings", s.GetBookings)
	r.Get("/v1/bookings/{bookingID}", s.GetBookingByID)
	r.Post("/v1/bookings", s.CreateBooking)
	r.Delete("/v1/bookings/{bookingID}", s.DeleteBooking)

	r.Get("/v1/customers", s.GetCustomers)
	r.Get("/v1/customers/{customerID}", s.GetCustomerByID)
	r.Post("/v1/customers", s.CreateCustomer)

	r.Get("/v1/offerings", s.GetOfferings)

	return r
}
