package api

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/joshgermon/captura-books-go/repository"
	"github.com/joshgermon/captura-books-go/services/email"
)

func (s *server) GetBookings(w http.ResponseWriter, r *http.Request) {
	bookings, err := s.bookingRepo.GetAll(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonBytes, err := json.Marshal(SuccessResponse{
		Data: bookings,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func (s *server) GetBookingByID(w http.ResponseWriter, r *http.Request) {
	bookingID := chi.URLParam(r, "bookingID")
	id, err := strconv.Atoi(bookingID)

	booking, err := s.bookingRepo.GetByID(context.Background(), id)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "", http.StatusNotFound)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonBytes, err := json.Marshal(SuccessResponse{
		Data: booking,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func (s *server) CreateBooking(w http.ResponseWriter, r *http.Request) {
	var booking repository.NewBooking

	err := json.NewDecoder(r.Body).Decode(&booking)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Default user for now
	booking.UserID = 1
	err = s.bookingRepo.Create(context.Background(), &booking)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var emailData = map[string]interface{}{
		"BookingRef":  "224224",
		"Location":    booking.Location,
		"SessionDate": booking.Date.Format(time.RFC1123),
    "PackageName": booking.SessionPackageId,
	}

	// Send email
	err = email.SendTransactionalEmail(emailData, "joshgermon@gmail.com")
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
}

func (s *server) DeleteBooking(w http.ResponseWriter, r *http.Request) {
	bookingID := chi.URLParam(r, "bookingID")
	id, err := strconv.Atoi(bookingID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = s.bookingRepo.Delete(context.Background(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
}
