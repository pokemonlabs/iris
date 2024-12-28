export const TemplateVerificationCode = `
<Card.Header>
  <h2>Single-use verification code</h2>
  <hr />
</Card.Header>

<Card.Body>
  <p>
    You are receiving this e-mail because a request has been made for a unique
    code
  </p>
  <p>Enter the following code for verification</p>
  <p>
    <span class="badge">{{ code }}</span>
  </p>
  <p>Code expires in {{ expiration }}</p>
</Card.Body>

<Card.Footer>
  <p>Sent by Iris</p>
</Card.Footer>
  `.trim()
