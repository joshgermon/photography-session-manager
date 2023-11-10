package api

import (
	"context"
	"encoding/json"
	"net/http"
)

func (s *server) GetOfferings(w http.ResponseWriter, r *http.Request) {
	offerings, err := s.offeringRepo.GetAll(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	jsonBytes, err := json.Marshal(SuccessResponse{
        Data: offerings,
    })

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}
