package repository

import (
	"context"
	"database/sql"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type offeringRepository struct {
	db *pgxpool.Pool
}

type OfferingPackageJoin struct {
	SessionTypeId          int
	SessionTypeName        string
	SessionTypeDescription string
	SessionTypeCreatedAt   time.Time
	PackageId              sql.NullInt64
	PackageName            sql.NullString
	DurationInMinutes      sql.NullInt64
	Price                  sql.NullInt64
	PackageCreatedAt       sql.NullTime
}

type Offering struct {
	Id          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
}

type OfferingPackage struct {
	Id                int       `json:"id"`
	Name              string    `json:"name"`
	DurationInMinutes int       `json:"durationInMinutes"`
	Price             float64   `json:"price"`
	CreatedAt         time.Time `json:"createdAt"`
}

type OfferingWithPackages struct {
	Offering
	Packages []*OfferingPackage `json:"packages"`
}

func NewOfferingRepository(db *pgxpool.Pool) *offeringRepository {
	return &offeringRepository{db: db}
}

func (o *offeringRepository) GetAll(ctx context.Context) ([]OfferingWithPackages, error) {
	rows, err := o.db.Query(ctx, `
        SELECT
            st.session_type_id,
            st.name,
            st.description,
            st.created_at,
            sp.session_package_id,
            sp.name AS session_package,
            sp.duration_in_minutes,
            sp.price,
            sp.created_at
        FROM
            session_type AS st
        LEFT JOIN
            session_package AS sp ON sp.session_type_id = st.session_type_id
        `)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	// Create a map to store the results
	offeringsMap := make(map[int]*OfferingWithPackages)

	// Iterate through the rows and scan the results into the slice
	for rows.Next() {
		var row OfferingPackageJoin
		var offeringPackage OfferingPackage

		err := rows.Scan(&row.SessionTypeId, &row.SessionTypeName, &row.SessionTypeDescription,
			&row.SessionTypeCreatedAt, &row.PackageId, &row.PackageName, &row.DurationInMinutes,
			&row.Price, &row.PackageCreatedAt)

		if err != nil {
			return nil, err
		}

		// Check if we've encountered this session before
		if _, ok := offeringsMap[row.SessionTypeId]; !ok {
			offeringsMap[row.SessionTypeId] = &OfferingWithPackages{
				Offering: Offering{
					Id:          row.SessionTypeId,
					Name:        row.SessionTypeName,
					Description: row.SessionTypeDescription,
					CreatedAt:   row.SessionTypeCreatedAt,
				},
			}
		}

		if row.PackageId.Valid {
			offeringPackage = OfferingPackage{
				Id:                int(row.PackageId.Int64),
				Name:              row.PackageName.String,           // Use .String to get the string value
				DurationInMinutes: int(row.DurationInMinutes.Int64), // Convert sql.NullInt64 to int
				Price:             float64(row.Price.Int64),         // Convert sql.NullInt64 to float64
				CreatedAt:         row.PackageCreatedAt.Time,        // Use .Time to get the time value
			}
			offeringsMap[row.SessionTypeId].Packages = append(offeringsMap[row.SessionTypeId].Packages, &offeringPackage)
		}
	}

	// Covert map to slice
	offerings := make([]OfferingWithPackages, 0, len(offeringsMap))
	for _, value := range offeringsMap {
		offerings = append(offerings, *value)
	}

	return offerings, nil
}

type OfferingRepository interface {
	GetAll(ctx context.Context) ([]OfferingWithPackages, error)
}
