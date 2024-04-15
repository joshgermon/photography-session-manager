package email

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
)

func generateHTMLTemplate(templateName string, templateData interface{}) (string, error) {
  rawHTML, err := os.ReadFile("./templates/booking-confirmation.html")
  if err != nil {
    fmt.Printf("Failed to open template")
    return "", err
  }

  var outputHTML bytes.Buffer

  tmpl, err := template.New("bookingConfirmation").Parse(string(rawHTML));
  err = tmpl.Execute(&outputHTML, templateData)

  return outputHTML.String(), nil

}

// func sendTransactionalEmail(templateID string) error {
// }

