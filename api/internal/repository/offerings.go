package repository

import (
	"context"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

type offeringRepository struct {
	db *pgxpool.Pool
}

type Offering struct {
	Id          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"createdAt"`
}

type OfferingPackage struct {
	Id                int       `json:"id"`
	Name              string    `json:"Name"`
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
        INNER JOIN
            session_package AS sp ON sp.session_type_id = st.session_type_id
        `)
	if err != nil {
		return []OfferingWithPackages{}, err
	}
	defer rows.Close()

	// Create a map to store the results
	offeringsMap := make(map[int]*OfferingWithPackages)

	// Iterate through the rows and scan the results into the slice
	for rows.Next() {
		var offering Offering
		var offeringPackage OfferingPackage
		err := rows.Scan(&offering.Id, &offering.Name, &offering.Description, &offering.CreatedAt,
			&offeringPackage.Id, &offeringPackage.Name, &offeringPackage.DurationInMinutes,
			&offeringPackage.Price, &offeringPackage.CreatedAt)
		if err != nil {
            return []OfferingWithPackages{}, err
		}

		// Check if we've encountered this session before
		if _, ok := offeringsMap[offering.Id]; !ok {
			offeringsMap[offering.Id] = &OfferingWithPackages{
				Offering: offering,
			}
		}

		offeringsMap[offering.Id].Packages = append(offeringsMap[offering.Id].Packages, &offeringPackage)
	}

    // Covert map to slice
    offerings := make([]OfferingWithPackages, 0, len(offeringsMap))
    for  _, value := range offeringsMap {
       offerings = append(offerings, *value)
    }

    return offerings, nil
}

type OfferingRepository interface {
	GetAll(ctx context.Context) ([]OfferingWithPackages, error)
}
