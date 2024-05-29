package api

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
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


func (s *server) GetGoogleAccessToken(w http.ResponseWriter, r *http.Request) {
  // Get the authorization code from the query parameters
	code := r.URL.Query().Get("code")
  fmt.Printf("code is: %s\n", code)
	if code == "" {
		http.Error(w, "Authorization code not found", http.StatusBadRequest)
		return
	}

	// Exchange authorization code for access token
	tokenURL := "https://oauth2.googleapis.com/token"

	clientID := os.Getenv("GOOGLE_CLIENT_ID")
	clientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
  redirectURI := "http://localhost:3000/settings"

	queryParams := url.Values{}
	queryParams.Set("code", code)
	queryParams.Set("client_id", clientID)
	queryParams.Set("client_secret", clientSecret)
	queryParams.Set("redirect_uri", redirectURI)
	queryParams.Set("grant_type", "authorization_code")

  url := fmt.Sprintf("%s?%s", tokenURL, queryParams.Encode())

// Send POST request
	resp, err := http.Post(url, "", nil)
	if err != nil {
		fmt.Println("Error sending request:", err)
    http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
  fmt.Println("Response status:", resp.Status)

  	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}

  	// Define a struct to unmarshal the JSON response
	var response map[string]interface{}

	// Unmarshal JSON
	err = json.Unmarshal(body, &response)
	if err != nil {
		fmt.Println("Error unmarshalling JSON:", err)
		return
	}

	// Print the JSON response
	fmt.Println("Response:", response)

  return
}
