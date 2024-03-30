import emailTemplate from "./EmailTemplate";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export default async function sendEmail(to: string, subject: string, text: string) {
  console.log({ to, subject, text });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Geminiwear <geminiwear@resend.dev>",
        to: [to],
        subject: subject,
        html: emailTemplate(text),
      }),
    });
    const responseJson = await response.json();

    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
    return error;
  }
}
