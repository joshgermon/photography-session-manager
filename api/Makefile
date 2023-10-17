# Go parameters
GOCMD = go
GOBUILD = $(GOCMD) build
GOCLEAN = $(GOCMD) clean
GORUN = $(GOCMD) run
GOGET = $(GOCMD) get

# Binary output name
BINARY_NAME = captura-books-go

# Build the binary
build:
	$(GOBUILD) -o $(BINARY_NAME) ./cmd/captura-books-api

# Clean up
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)

# Run the application
run:
	$(GORUN) ./cmd/captura-books-api

# Get dependencies
get:
	$(GOGET) ./...

# Default target
default: build

