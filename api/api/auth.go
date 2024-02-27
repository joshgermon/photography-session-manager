package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

type UserCredentials struct {
    Username string `json:"username"`
    Password string `json:"password"`
}

func (s *server) LoginUser(w http.ResponseWriter, r *http.Request) {
	var userCredentials UserCredentials
	err := json.NewDecoder(r.Body).Decode(&userCredentials)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
    fmt.Printf("User %s\n", userCredentials.Username)

   // Check user password
    user, err := s.userRepo.GetByEmail(context.Background(), userCredentials.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

    fmt.Printf("Password given: %s, Found in db: %s\n", userCredentials.Password, user.PasswordHash)
    fmt.Printf("User %v\n", userCredentials)

    if userCredentials.Password != user.PasswordHash {
		http.Error(w, "Invalid username or password", http.StatusForbidden)
        return
    }

    sessionID, err := s.userRepo.CreateSession(context.Background(), user.Id)

	jsonBytes, err := json.Marshal(SuccessResponse{
		Data: sessionID,
	})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonBytes)
}

