import { SES } from "aws-sdk";
import mjml2html from "mjml";
import path from "path";
import fs from "fs";
import Handlebars from "handlebars";
import { Session } from "@/db/schema";
import { getCustomer } from "./customers";
import { getSessionPackage } from "./session";
import { format } from "date-fns";

const ses = new SES({ region: "ap-southeast-2" });

function readMJMLTemplate(templateName: string): string | null {
  const mjmlTemplateDir = path.join(process.cwd(), "mjml-templates");
  const templatePath = path.join(mjmlTemplateDir, `${templateName}.mjml`);
  try {
    return fs.readFileSync(templatePath, "utf-8");
  } catch (error) {
    console.error(`Template ${templateName} not found or could not be read.`);
    throw error;
  }
}

type TemplatedEmail = {
  to: string;
  subject: string;
  data: { [key: string]: any };
  templateName: string;
};

async function sendEmail(email: TemplatedEmail) {
  const mjmlTemplate = readMJMLTemplate(email.templateName);
  const compiledTemplate = Handlebars.compile(mjmlTemplate);
  const mjml = compiledTemplate(email.data);
  const { html } = mjml2html(mjml);

  const params = {
    Destination: { ToAddresses: ["joshgermon@gmail.com"] },
    Message: {
      Body: {
        Html: { Data: html },
      },
      Subject: { Data: email.subject },
    },
    Source: process.env.SOURCE_EMAIL_ADDRESS as string,
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(`Email sent: ${result.MessageId}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
}

export async function sendBookingConfirmationEmail(newSession: Session) {
  const customer = await getCustomer(newSession.clientId);
  const sessionPackage = await getSessionPackage(newSession.sessionPackageId!);

  const confirmationEmail = {
    to: customer.email,
    subject: "Your Booking Confirmation - Angela & Josh Photography",
    data: {
      sessionDate: format(
        new Date(newSession.date),
        "do LLLL, yyyy @ hh:mm aaaa",
      ),
      sessionLocation: newSession.location,
      sessionPackage: `${sessionPackage.session_type?.name} - ${sessionPackage.session_package.name}`,
    },
    templateName: "booking-confirmation",
  };

  await sendEmail(confirmationEmail);
}
