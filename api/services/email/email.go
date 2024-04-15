package email

import (
	"bytes"
	"fmt"
	"html/template"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"

)

const (
    Sender = "hello@angelajoshphotography.com.au"

    // The subject line for the email.
    Subject = "Amazon SES Test (AWS SDK for Go)"

    // The character encoding for the email.
    CharSet = "UTF-8"
)

func generateHTMLTemplate(templateName string, templateData interface{}) (string, error) {
	// TODO: Move to S3
	rawHTML, err := os.ReadFile("./templates/booking-confirmation.html")
	if err != nil {
		fmt.Printf("Failed to open template")
		return "", err
	}

	var outputHTML bytes.Buffer

	tmpl, err := template.New("bookingConfirmation").Parse(string(rawHTML))
	err = tmpl.Execute(&outputHTML, templateData)

	return outputHTML.String(), nil
}

func SendTransactionalEmail(templateData map[string]interface{}, recipient string) error {
  fmt.Println("Beginning email process")
  generatedHTML, err := generateHTMLTemplate("booking-confirmation", templateData)
	if err != nil { return err }

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("ap-southeast-2")},
	)

	if err != nil { return err }
	svc := ses.New(sess)

	// Assemble the email.
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			CcAddresses: []*string{},
			ToAddresses: []*string{
				aws.String(recipient),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Html: &ses.Content{
					Charset: aws.String(CharSet),
					Data:    aws.String(generatedHTML),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String(CharSet),
				Data:    aws.String(Subject),
			},
		},
		Source: aws.String(Sender),
	}

  fmt.Println("Attempting to send email")

	// Attempt to send the email.
	result, err := svc.SendEmail(input)
	if err != nil { return err }

  fmt.Println("Email Sent to address: " + recipient)
  fmt.Println(result)

	return nil
}
