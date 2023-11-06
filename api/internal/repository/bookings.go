package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5"
)

type bookingRepository struct {
	db *pgx.Conn
}

type Booking struct {
	Id        int       `json:"id"`
	Date      time.Time `json:"date"`
	Location  string    `json:"location"`
	CreatedAt time.Time `json:"createdAt"`
}

type Package struct {
	Id                int     `json:"id"`
	Name              string  `json:"name"`
	DurationInMinutes int     `json:"durationInMinutes"`
	Price             float64 `json:"price"`
	TypeId            int     `json:"typeId"`
	Type              string  `json:"type"`
	TypeDescription   string  `json:"typeDescription"`
}

type BookingDetails struct {
	Booking
	Customer Customer `json:"customer"`
	Package  Package  `json:"package"`
}

type NewBooking struct {
	Date             time.Time `json:"date"`
	Location         string    `json:"location"`
	CustomerID       int       `json:"customerId"`
	SessionPackageId int       `json:"sessionPackageId"`
}

func NewBookingRepository(db *pgx.Conn) *bookingRepository {
	return &bookingRepository{db: db}
}

func (b *bookingRepository) GetAll(ctx context.Context) ([]BookingDetails, error) {
    start := time.Now()
	rows, err := b.db.Query(ctx, `
        SELECT
            s.session_id,
            s.client_id,
            s.session_package_id,
            s.session_date,
            s.location,
            s.created_at,
            c.first_name,
            c.last_name,
            c.email_address,
            st.session_type_id,
            st.name AS session_type,
            st.description,
            sp.name AS session_package,
            sp.duration_in_minutes,
            sp.price
        FROM
            client_session AS s
        INNER JOIN
            client AS c ON s.client_id = c.client_id
        INNER JOIN
            session_package AS sp ON s.session_package_id = sp.session_package_id
        INNER JOIN
            session_type AS st ON sp.session_type_id = st.session_type_id
        LIMIT 100
        `)
	if err != nil {
		return []BookingDetails{}, err
	}
    querytime := time.Since(start)
    fmt.Printf("Query took - %s\n", querytime)
    scanstart := time.Now()
	defer rows.Close()

	var bookings []BookingDetails
	for rows.Next() {
		var booking Booking
		var bookingPackage Package
		var customer Customer
		err := rows.Scan(&booking.Id, &customer.Id, &bookingPackage.Id, &booking.Date, &booking.Location, &booking.CreatedAt,
			&customer.FirstName, &customer.LastName, &customer.EmailAddress, &bookingPackage.TypeId, &bookingPackage.Type,
			&bookingPackage.TypeDescription, &bookingPackage.Name, &bookingPackage.DurationInMinutes, &bookingPackage.Price)
		if err != nil {
			return []BookingDetails{}, err
		}

		response := BookingDetails{
			Booking:  booking,
			Package:  bookingPackage,
			Customer: customer,
		}

		bookings = append(bookings, response)
	}
    scantime := time.Since(scanstart)
    fmt.Printf("Struct scan took - %s\n", scantime)
	return bookings, nil
}

func (b *bookingRepository) GetByID(ctx context.Context, id int) (BookingDetails, error) {
	rows, err := b.db.Query(ctx, `
        SELECT
            s.session_id,
            s.client_id,
            s.session_package_id,
            s.session_date,
            s.location,
            s.created_at,
            c.first_name,
            c.last_name,
            c.email_address,
            st.session_type_id,
            st.name AS session_type,
            st.description,
            sp.name AS session_package,
            sp.duration_in_minutes,
            sp.price
        FROM
            client_session AS s
        INNER JOIN
            client AS c ON s.client_id = c.client_id
        INNER JOIN
            session_package AS sp ON s.session_package_id = sp.session_package_id
        INNER JOIN
            session_type AS st ON sp.session_type_id = st.session_type_id
        WHERE
            session_id=$1
        `, id)
	if err != nil {
		return BookingDetails{}, err
	}
	defer rows.Close()

	var booking Booking
	var bookingPackage Package
	var customer Customer

	if rows.Next() {
		err := rows.Scan(&booking.Id, &customer.Id, &bookingPackage.Id, &booking.Date, &booking.Location, &booking.CreatedAt,
			&customer.FirstName, &customer.LastName, &customer.EmailAddress, &bookingPackage.TypeId, &bookingPackage.Type,
			&bookingPackage.TypeDescription, &bookingPackage.Name, &bookingPackage.DurationInMinutes, &bookingPackage.Price)
		if err != nil {
			return BookingDetails{}, err
		}
	}

	bookingWithCustomer := BookingDetails{
		Booking:  booking,
		Customer: customer,
	}

	return bookingWithCustomer, nil
}

func (b *bookingRepository) Create(ctx context.Context, booking *NewBooking) error {
	_, err := b.db.Exec(ctx, `
        INSERT INTO client_session
            (session_date, location, client_id, session_package_id)
        VALUES ($1, $2, $3, $4)`,
		booking.Date, booking.Location, booking.CustomerID, booking.SessionPackageId)
	return err
}

type BookingRepository interface {
	Create(ctx context.Context, booking *NewBooking) error
	GetAll(ctx context.Context) ([]BookingDetails, error)
	GetByID(ctx context.Context, id int) (BookingDetails, error)
	// GetByCustomerID(ctx context.Context, id int) (Booking, error)
}
