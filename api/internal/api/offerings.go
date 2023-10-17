package api

import (
	"context"
	"encoding/json"
	"net/http"
)


func (a *api) GetOfferings(w http.ResponseWriter, r *http.Request) {
    offerings, err := a.offeringRepo.GetAll(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
    }

	jsonBytes, err := json.Marshal(offerings)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}
