# Use the official Go image as a parent image
FROM golang:1.21


# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules manifests and the main.go file into the container
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of your application source code
COPY . .

# Expose the port that your application will listen on
EXPOSE 3333

# Command to run your application
CMD ["make", "run"]

