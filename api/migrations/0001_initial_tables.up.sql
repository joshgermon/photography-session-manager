-- User Table
CREATE TABLE user_account (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email_address VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(12),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions Table
CREATE TABLE user_session (
    session_id VARCHAR(128) PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customer Table
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email_address VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(12),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Booking Table
CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    customer_id INT REFERENCES customer(customer_id) NOT NULL,
    session_package_id INT NOT NULL,
    session_date DATE NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session Type Table
CREATE TABLE session_type (
    session_type_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Session Package Table
CREATE TABLE session_package (
    session_package_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_account(user_id) NOT NULL,
    name VARCHAR(255) NOT NULL,
    session_type_id INT REFERENCES session_type(session_type_id) NOT NULL,
    duration_in_minutes INT,
    price INT NOT NULL,
    currency_code VARCHAR(3) DEFAULT 'AUD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Test User
INSERT INTO user_account (first_name, last_name, email_address, password) VALUES (
    'Test', 'Account', 'joshgermon@gmail.com', 'hashed_pw_mocked'
);
