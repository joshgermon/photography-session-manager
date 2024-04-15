package repository

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type bookingRepository struct {
	db *pgxpool.Pool
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
	UserID           int       `json:"userId"`
	Date             time.Time `json:"date"`
	Location         string    `json:"location"`
	CustomerID       int       `json:"customerID"`
	SessionPackageId int       `json:"offeringPackageID"`
}

func NewBookingRepository(db *pgxpool.Pool) *bookingRepository {
	return &bookingRepository{db: db}
}

func (b *bookingRepository) GetAll(ctx context.Context) ([]BookingDetails, error) {
	rows, err := b.db.Query(ctx, `
        SELECT
            s.booking_id,
            s.customer_id,
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
            booking AS s
        INNER JOIN
            customer AS c ON s.customer_id = c.customer_id
        INNER JOIN
            session_package AS sp ON s.session_package_id = sp.session_package_id
        INNER JOIN
            session_type AS st ON sp.session_type_id = st.session_type_id
        LIMIT 100
        `)
	if err != nil {
		return []BookingDetails{}, err
	}
	defer rows.Close()

	bookings := []BookingDetails{}
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
	return bookings, nil
}

func (b *bookingRepository) GetByID(ctx context.Context, id int) (BookingDetails, error) {
	row := b.db.QueryRow(ctx, `
        SELECT
            s.booking_id,
            s.customer_id,
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
            booking AS s
        INNER JOIN
            customer AS c ON s.customer_id = c.customer_id
        INNER JOIN
            session_package AS sp ON s.session_package_id = sp.session_package_id
        INNER JOIN
            session_type AS st ON sp.session_type_id = st.session_type_id
        WHERE
            booking_id=$1
        `, id)

	var booking Booking
	var bookingPackage Package
	var customer Customer

	err := row.Scan(&booking.Id, &customer.Id, &bookingPackage.Id, &booking.Date, &booking.Location, &booking.CreatedAt,
		&customer.FirstName, &customer.LastName, &customer.EmailAddress, &bookingPackage.TypeId, &bookingPackage.Type,
		&bookingPackage.TypeDescription, &bookingPackage.Name, &bookingPackage.DurationInMinutes, &bookingPackage.Price)
	if err != nil {
		return BookingDetails{}, err
	}

	bookingWithCustomer := BookingDetails{
		Booking:  booking,
		Package: bookingPackage,
		Customer: customer,
	}

	return bookingWithCustomer, nil
}

func (b *bookingRepository) Create(ctx context.Context, booking *NewBooking) error {
	_, err := b.db.Exec(ctx, `
        INSERT INTO booking
            (session_date, user_id, location, customer_id, session_package_id)
        VALUES ($1, $2, $3, $4, $5)`,
		booking.Date, 1, booking.Location, booking.CustomerID, booking.SessionPackageId)
	return err
}

func (b *bookingRepository) Delete(ctx context.Context, id int) error {
	_, err := b.db.Exec(ctx, `DELETE FROM booking WHERE booking_id=$1`, id)
	return err
}

type BookingRepository interface {
	Create(ctx context.Context, booking *NewBooking) error
	GetAll(ctx context.Context) ([]BookingDetails, error)
	GetByID(ctx context.Context, id int) (BookingDetails, error)
	Delete(ctx context.Context, id int) error
}
