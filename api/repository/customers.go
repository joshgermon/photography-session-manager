package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type customerRepository struct {
	db *pgxpool.Pool
}

type Customer struct {
	Id           int       `json:"id"`
	FirstName    string    `json:"firstName"`
	LastName     string    `json:"lastName"`
	EmailAddress string    `json:"emailAddress"`
	MobileNo     *string   `json:"mobileNo,omitempty"`
	CreatedAt    time.Time `json:"createdAt"`
}

type NewCustomer struct {
	UserID       int     `json:"userId"`
	FirstName    string  `json:"firstName"`
	LastName     string  `json:"lastName"`
	EmailAddress string  `json:"emailAddress"`
	MobileNo     *string `json:"mobileNo,omitempty"`
}

func NewCustomerRepository(db *pgxpool.Pool) *customerRepository {
	return &customerRepository{db: db}
}

func (c *customerRepository) Create(ctx context.Context, customer *NewCustomer) error {
	_, err := c.db.Exec(ctx, "INSERT INTO customer (user_id, first_name, last_name, email_address, mobile_number) VALUES ($1, $2, $3, $4, $5)",
		customer.UserID, customer.FirstName, customer.LastName, customer.EmailAddress, customer.MobileNo)
	return err
}

func (c *customerRepository) Get(ctx context.Context) ([]Customer, error) {
	rows, err := c.db.Query(ctx,
		`SELECT customer_id, first_name, last_name, email_address, mobile_number FROM customer LIMIT 100`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	customers := []Customer{}
	for rows.Next() {
		var customer Customer
		err := rows.Scan(&customer.Id, &customer.FirstName, &customer.LastName,
			&customer.EmailAddress, &customer.MobileNo)

		if err != nil {
			return nil, err
		}

		customers = append(customers, customer)
	}
	if err != nil {
		return nil, err
	}
	return customers, nil
}

func (c *customerRepository) SearchByName(ctx context.Context, nameQuery string) ([]Customer, error) {
	rows, err := c.db.Query(ctx,
		`SELECT customer_id, first_name, last_name,email_address, mobile_number
         FROM customer
         WHERE first_name ILIKE $1 OR last_name ILIKE $1
         LIMIT 5`,
		"%"+nameQuery+"%")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	customers := []Customer{}
	for rows.Next() {
		var customer Customer
		err := rows.Scan(&customer.Id, &customer.FirstName, &customer.LastName,
			&customer.EmailAddress, &customer.MobileNo)

		if err != nil {
			return nil, err
		}
		customers = append(customers, customer)
	}
	if err != nil {
		return nil, err
	}
	return customers, nil
}

func (c *customerRepository) GetByID(ctx context.Context, id int) (Customer, error) {
	row, err := c.db.Query(ctx,
		`SELECT customer_id, first_name, last_name,email_address, mobile_number
         FROM customer
         WHERE customer_id=$1
         LIMIT 1`, id)
	if err != nil {
		return Customer{}, fmt.Errorf("Database query error: %w", err)
	}
	defer row.Close()

	var customer Customer
	if row.Next() {
		err = row.Scan(&customer.Id, &customer.FirstName, &customer.LastName,
			&customer.EmailAddress, &customer.MobileNo)
		if err != nil {
			return Customer{}, fmt.Errorf("Row scan error: %w", err)
		}
	} else {
		return Customer{}, fmt.Errorf("No customer found with id: %d", id)
	}

	return customer, nil
}

func (c *customerRepository) GetByEmail(ctx context.Context, email string) (Customer, error) {
	row, err := c.db.Query(ctx,
		`SELECT customer_id, first_name, last_name,email_address, mobile_number
         FROM customer
         WHERE email_address=$1
         LIMIT 1`, email)
	if err != nil {
		return Customer{}, fmt.Errorf("Database query error: %w", err)
	}
	defer row.Close()

	var customer Customer
	if row.Next() {
		err = row.Scan(&customer.Id, &customer.FirstName, &customer.LastName,
			&customer.EmailAddress, &customer.MobileNo)
		if err != nil {
			return Customer{}, fmt.Errorf("Row scan error: %w", err)
		}
	} else {
		return Customer{}, fmt.Errorf("No customer found with email: %s", email)
	}

	return customer, nil
}

type CustomerRepository interface {
	Get(ctx context.Context) ([]Customer, error)
	SearchByName(ctx context.Context, nameQuery string) ([]Customer, error)
	GetByID(ctx context.Context, id int) (Customer, error)
	GetByEmail(ctx context.Context, email string) (Customer, error)
	Create(ctx context.Context, customer *NewCustomer) error
}
