package repository

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type userRepository struct {
	db *pgxpool.Pool
}

type User struct {
	Id           int       `json:"id"`
	FirstName    string    `json:"firstName"`
	LastName     string    `json:"lastName"`
	EmailAddress string    `json:"emailAddress"`
	MobileNo     *string   `json:"mobileNo,omitempty"`
	PasswordHash string    `json:"password"`
	CreatedAt    time.Time `json:"createdAt"`
}

type UserSession struct {
	Id           string       `json:"id"`
  UserID       int       `json:"userID"`
	ExpiresAt    time.Time `json:"expiresAt"`
}

func NewUserRepository(db *pgxpool.Pool) *userRepository {
	return &userRepository{db: db}
}

// func (u *userRepository) Create(ctx context.Context, user *NewUser) error {
// 	_, err := u.db.Exec(ctx, "INSERT INTO user_account (first_name, last_name, email_address, mobile_number) VALUES ($1, $2, $3, $4, $5)",
// 		user.FirstName, user.LastName, user.EmailAddress, user.MobileNo)
// 	return err
// }

func (u *userRepository) CreateSession(ctx context.Context, userID int) (string, error) {
    // Generate random session id
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		panic(err)
	}
    sessionID := base64.URLEncoding.EncodeToString(b)
    sessionExpiryTime := time.Now().Add(24 * time.Hour)

	_, err = u.db.Exec(ctx, "INSERT INTO user_session (session_id, user_id, expires_at) VALUES ($1, $2, $3)",
		sessionID, userID, sessionExpiryTime)
	return sessionID, err
}

func (u *userRepository) Get(ctx context.Context) ([]User, error) {
	rows, err := u.db.Query(ctx,
		`SELECT customer_id, first_name, last_name, email_address, mobile_number FROM customer LIMIT 100`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	users := []User{}
	for rows.Next() {
		var user User
		err := rows.Scan(&user.Id, &user.FirstName, &user.LastName,
			&user.EmailAddress, &user.MobileNo)

		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (u *userRepository) GetByEmail(ctx context.Context, email string) (User, error) {
	row, err := u.db.Query(ctx,
		`SELECT user_id, first_name, last_name, email_address, mobile_number, password
         FROM user_account
         WHERE email_address=$1
         LIMIT 1`, email)
	if err != nil {
		return User{}, fmt.Errorf("Database query error: %w", err)
	}
	defer row.Close()

	var user User
	if row.Next() {
		err = row.Scan(&user.Id, &user.FirstName, &user.LastName,
			&user.EmailAddress, &user.MobileNo, &user.PasswordHash)
		if err != nil {
			return User{}, fmt.Errorf("Row scan error: %w", err)
		}
	} else {
		return User{}, fmt.Errorf("No customer found with email: %s", email)
	}

	return user, nil
}

func (u *userRepository) GetSessionByID(ctx context.Context, sessionID string) (UserSession, error) {
	row, err := u.db.Query(ctx,
		`SELECT session_id, user_id, expires_at
         FROM user_session
         WHERE session_id=$1
         LIMIT 1`, sessionID)
	if err != nil {
		return UserSession{}, fmt.Errorf("Database query error: %w", err)
	}
	defer row.Close()

	var userSession UserSession
	if row.Next() {
		err = row.Scan(&userSession.Id, &userSession.UserID, &userSession.ExpiresAt)
		if err != nil {
			return UserSession{}, fmt.Errorf("Row scan error: %w", err)
		}
	} else {
		return UserSession{}, fmt.Errorf("No session found")
	}
	return userSession, nil
}

type UserRepository interface {
	Get(ctx context.Context) ([]User, error)
	// GetByID(ctx context.Context, id int) (User, error)
	GetByEmail(ctx context.Context, email string) (User, error)
	CreateSession(ctx context.Context, userID int) (string, error)
	GetSessionByID(ctx context.Context, sessionID string) (UserSession, error)
}
