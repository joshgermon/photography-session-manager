package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"time"
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

	// Check user password
	user, err := s.userRepo.GetByEmail(context.Background(), userCredentials.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	if userCredentials.Password != user.PasswordHash {
		http.Error(w, "Invalid username or password", http.StatusForbidden)
		return
	}

	sessionID, err := s.userRepo.CreateSession(context.Background(), user.Id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// Create a new cookie
	cookie := http.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		Path:     "/",  // Set the cookie to be accessible from all paths
		Secure:   true, // Set the Secure flag to ensure the cookie is only sent over HTTPS
		HttpOnly: true, // Set the HttpOnly flag to prevent JavaScript access to the cookie
	}

	// Set the cookie in the response
	http.SetCookie(w, &cookie)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Login successful"))
}

func (s *server) GetUserSession(w http.ResponseWriter, r *http.Request) {
  sessionCookie, err := r.Cookie("session_id")
  if err != nil {
    fmt.Printf("sessioon Cookiue not found\n")
    w.WriteHeader(http.StatusUnauthorized)
    return
  }

  // Decode the cookie value
  cookieValue := sessionCookie.Value
  decodedCookieValue, err := url.QueryUnescape(cookieValue)
  if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
  }

	userSession, err := s.userRepo.GetSessionByID(context.Background(), decodedCookieValue)
	if err != nil {
    fmt.Printf("No session found for %s\n", decodedCookieValue)
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

  if userSession.ExpiresAt.Before(time.Now()) {
		http.Error(w, "Expired session", http.StatusUnauthorized)
		return
  }
}
