export const TemplateStyle = `
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.6;
    color: rgba(41, 41, 41, 1);
  }

  .card {
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    font-size: 16px;
  }

  h1,
  h2,
  h3 {
    font-weight: 700;
    text-transform: uppercase;
    color: black;
  }

  p {
    width: 100%;
  }

  .card-header,
  .card-body,
  .card-footer {
    padding-top: 28px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .card-body,
  .card-footer {
    padding-bottom: 28px;
  }

  .card-body {
    color: rgba(41, 41, 41, 1);
  }

  .card-footer {
    color: white;
    font-size: 13px;
    background: black;
  }

  hr {
    width: 100%;
    border-top: 1px solid black;
  }

  .badge,
  a {
    color: #4f4f4f;
    background: white;
    font-size: 16px;
    font-weight: 700;
    padding: 12px 16px 12px 16px;
    border: 1px solid grey;
    border-radius: 4px;
    text-decoration: none;
  }

  a {
    cursor: pointer;
  }

  a:hover {
    color: black;
    border-color: black;
  }

  td {
    width: 100%;
  }
`
