export const TemplateComponents: Record<string, string> = {
  '<Card>': `
      <div class="card">
    `.trim(),
  '</Card>': '</div>',
  '<Card.Header>': `
      <table 
        class="card-header"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  '</Card.Header>': '</tbody></table>',
  '<Card.Body>': `
      <table 
        class="card-body"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%"
      >
        <tbody>
    `.trim(),
  '</Card.Body>': '</tbody></table>',
  '<Card.Footer>': `
      <table 
        class="card-footer"
        cellpadding="0" 
        cellspacing="0" 
        style="border-collapse:separate;border-spacing:0;table-layout:fixed;width:100%;text-align:center"
      >
        <tbody>
    `.trim(),
  '</Card.Footer>': '</tbody></table>',
  '<p>': '<tr><td><p>',
  '</p>': '</p></td></tr>',
  '<h2>': '<tr><td><h2>',
  '</h2>': '</h2></td></tr>',
  '<hr />': '<tr><td><hr /></td></tr>',
}
