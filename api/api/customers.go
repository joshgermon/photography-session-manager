package api

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
	"github.com/joshgermon/captura-books-go/repository"
)

func (s *server) GetCustomers(w http.ResponseWriter, r *http.Request) {
	searchQuery := r.URL.Query().Get("search")
	customers := []repository.Customer{}
	var err error

	if searchQuery != "" {
		customers, err = s.customerRepo.SearchByName(context.Background(), searchQuery)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		customers, err = s.customerRepo.Get(context.Background())
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	jsonBytes, err := json.Marshal(SuccessResponse{
		Data: customers,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func (s *server) GetCustomerByID(w http.ResponseWriter, r *http.Request) {
	customerID := chi.URLParam(r, "customerID")
	id, err := strconv.Atoi(customerID)

	customer, err := s.customerRepo.GetByID(context.Background(), id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonBytes, err := json.Marshal(SuccessResponse{
		Data: customer,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

func (s *server) CreateCustomer(w http.ResponseWriter, r *http.Request) {
	customer := repository.NewCustomer{}
    // Temp
    customer.UserID = 1

	err := json.NewDecoder(r.Body).Decode(&customer)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	s.customerRepo.Create(context.Background(), &customer)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNoContent)
}
