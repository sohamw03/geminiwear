export default function emailTemplate(text: string) {
  return `<!DOCTYPE html>
<html>
<head>
  <title>Email Template</title>
</head>
<body>
  <div class="main" style="background-color: #10151d; font-family: Arial, sans-serif; padding: 7rem 1rem; border-radius: 15px;">
    <h1 style="font-weight: 400; font-size: 2.125rem; line-height: 1.235; letter-spacing: 0.00735em; color: #bfc7d2; text-align: center; margin-bottom: 3rem; margin-top: 0;">Geminiwear</h1>
    <div class="container" style="background-color: #10151d; max-width: 30rem; min-height: 15rem; margin: 0 auto; border: 1px solid #2e3c51; border-radius: 15px; padding: 0.5rem;">
      <p id="message" style="color: #bfc7d2; margin: 0.5rem 0; margin-left: 0.5rem; white-space: pre-wrap;">${text}</p>
    </div>
  </div>
</body>
</html>`;
}
