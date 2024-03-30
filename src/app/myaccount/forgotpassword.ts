"use server";

export async function forgotpassword() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Mailing System <pms@resend.dev>",
        to: ["waghmare.22111255@viit.ac.in"],
        subject: `${name} sent you a message!`,
        html: `<a href="https://geminiwear.sohamw.tech/forgotpassword"`,
      }),
    });
    const responseJson = await response.json();

    if (response.ok && response.status === 200) {
      return res.status(200).json({ responseJson, payload: { name: name, email: email, message: message } });
    } else {
      return res.status(response.status).json({ error: "Resend error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}
