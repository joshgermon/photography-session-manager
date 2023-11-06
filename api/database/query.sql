-- name: GetCustomers :many
SELECT customer_id, first_name, last_name,email_address, mobile_number FROM customer LIMIT 100;

-- name: GetCustomerByID :one
SELECT customer_id, first_name, last_name,email_address, mobile_number FROM customer
WHERE customer_id=$1
LIMIT 1;

-- name: GetCustomerByEmail :one
SELECT customer_id, first_name, last_name,email_address, mobile_number FROM customer
WHERE email_address=$1
LIMIT 1;

-- name: SearchCustomer :many
SELECT customer_id, first_name, last_name,email_address, mobile_number FROM customer
WHERE first_name
ILIKE $1 OR last_name
ILIKE $1 LIMIT 5;

-- name: CreateCustomer :exec
INSERT INTO customer (first_name, last_name, email_address, mobile_number) VALUES ($1, $2, $3, $4);

-- name: GetBookings :many
SELECT
    b.booking_id,
    b.customer_id,
    b.session_package_id,
    b.session_date,
    b.location,
    b.created_at,
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
    booking AS b
INNER JOIN
    customer AS c ON b.customer_id = c.customer_id
INNER JOIN
    session_package AS sp ON b.session_package_id = sp.session_package_id
INNER JOIN
    session_type AS st ON sp.session_type_id = st.session_type_id
LIMIT 50;

-- name: GetBookingByID :one
SELECT
    b.booking_id,
    b.customer_id,
    b.session_package_id,
    b.session_date,
    b.location,
    b.created_at,
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
    booking AS b
INNER JOIN
    customer AS c ON b.customer_id = c.customer_id
INNER JOIN
    session_package AS sp ON b.session_package_id = sp.session_package_id
INNER JOIN
    session_type AS st ON sp.session_type_id = st.session_type_id
WHERE
    booking_id=$1;

-- name: CreateBooking :exec
INSERT INTO booking
    (session_date, location, customer_id, session_package_id)
VALUES ($1, $2, $3, $4);
