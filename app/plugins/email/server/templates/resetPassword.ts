export const TemplateResetPassword = `
<Card.Header>
  <h2>Password Reset</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>We received a request to reset your password.</p>
  <p>Click the button below to reset it</p>
  <p>
    <a href="{{ url_password_reset }}" target="_blank">Reset Password</a>
  </p>
  <p>If you did not request a password reset, ignore this email.</p>
</Card.Body>

<Card.Footer>
  <p>Sent by Iris</p>
</Card.Footer>
  `.trim()
