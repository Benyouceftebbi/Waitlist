
import { google } from 'googleapis';
import { NextResponse } from "next/server";

const GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBQFKO00+olZPf\nZsUnB7fEk9fkZ8k1urWjzbhLr03EaZPJo4w6ouxoyArKAPn9oEmx6WK5KNBP765U\n+/0Gz1cltUQPyNTXS1CI4qbduLZex7uBerRp3XfcxYergj+doSdzkkM8++WoB38B\nc79n7gtVrzIQLeliO4PagYur8zgJ6LkEvz6vpAPXljBYDuXHFzhBO+pkrYyBCHf7\nLdoJ1LpNQy7Xi0IoGKglhYjcYQZ1sJbtFngEZ2gYtfweFxDA/bcx0BHkCbYFOWh8\n2xpoNovoVu3ouXWyMIviaCeHhtGB58jMgCrMhAmy13XfXJV4PDuPzzvxRURvLKGl\nHR4U3G/hAgMBAAECggEAG+N+UT9R583iSmNd610z74oN0NgLfmtaAEWAJb1VoeqX\nRIpg19YgUO924yJonBSwM0faPUdpvJzQfKeQTeseiVdooZswNXvDJ7tcgnNAL7Bv\nsRFgt5sZoQI0AJPU6MN+L9xj7glE4iQRd50Dz+oCDRUHSrTIJqrZGJpeakEOOBud\n9N+OZayJ3TiKIPW8jBAevmLqO7IPBbPrfR85s4GCloU0kOGkqB+J52ozn283KSKS\n8Xv9uVulPsAMTJpB5WiPnAjRXS2VgWBRIYWAAsZ+fk4fAqvWFmdtdrhneEPSX2BO\nmz0SnL+3sQC0ZCy3gnMLoiC3vxiJ9Rc6mzJ7NDXnUwKBgQDrLVEiCbO7jqUX246e\nkgXF9tGK3Q0ppRtn2XcIMmf8c2uaHGsxfJKgM5wbvE4tQo1HCUbK6yp3ujuqMSmT\ns+CojTcFLF8LGqM+IseFBJaigUb5yFYYCov0LXknABsOuSiYBNflqHhC2bjIDL5e\n1Xm374G7zKTp5DE5HkPjZmlKHwKBgQDSXLAJWhMaivdwIq07isgrwKj/6APZTvbq\nN88YUtQvw4Ra5hygYwNwRydQq0y792TCWjAxefC0fCm2LfJjQqrwqcGU3fyVHnrU\n4a06FT78FtAlnt2AP+kqzj/zioDVbs4/5DDNecTWxFI+1xXzWbieZnj3IeOsdGcY\nd7KIzVcF/wKBgF70TCbfHfejj5sDZiE2OiiFEHPt7qua42bZ0gq4N24huBdgVBOG\nBbmzPNuh+zqg/WPqJfA2ZU40HnUIJo5heVr0sXtgP/u+xJyI9GALyzpP0jV2IvTQ\nBVQQrDMIAuS989r1UaqDjBMJz2bOZmrp7JxMkugdp5RcM1eplaWSKv7nAoGAIa8R\nyQ2RTYi/AkerMYORdeANr5x5MUzBoNN658wridJm2R9LqirwnAPoubQUP2znx28l\nlGaQMnZHP5Kv41EDijHEe4/oKACPbpMMZ+aLBVap0bxUf3q8XUxVVSvyYTqy7+wc\nHGrJKBKbkNBkBWlydHq4F+pnSHADKhnQjrNCogUCgYEA1QQLR42sPQh7/YIpqX+2\nTVOZAtyQwoXidep6WJsCtJQlDDUyAsQrBK+XSWDg1JxaR8XvfsI0BFYcwtcaRbTS\no/UKlUIIgK2JlONhA1+InVYjvc86CP5pS506UEgL0WVwzlovyNWaqsEYKxHkZZfz\njHuno7I3A+uJLVKPHzuPDuE=\n-----END PRIVATE KEY-----\n"

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email:process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key:GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',

],
});

const sheets = google.sheets({ version: 'v4', auth });

async function submitEmailToSpreadsheet(email) {
  try {
    const request = {
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: 'A1:A1', // Change this to your sheet name and range
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[email]],
      },
    };
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Email submitted successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error submitting email:', error);
    throw error;
  }
}

export async function GET(req) {
  try {
    // Handle GET request logic here
    return NextResponse.json({ message: "GET request received" }, { status: 200 });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json()


   // Handle POST request logic here
    const email =body.email;

    if (!email) {
      return new NextResponse("Missing field", { status: 400 });
    }

    // Example logic: check if email exists
    const emailExists = false; // Perform your check here

    if (emailExists) {
      return res.status(500).json({ error: "Email already exists" });
    }

    // If email doesn't exist, proceed with saving it or other logic
    // Example: Saving email to a Google Spreadsheet
   await submitEmailToSpreadsheet(email);

     return NextResponse.json({ message: "Email submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
