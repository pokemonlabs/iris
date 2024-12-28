export const TemplateBase = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Iris</title>
    <style>
      {{ style }}
    </style>
  </head>
  <body>
    <div class="card">{{ content }}</div>
  </body>
</html>
  `.trim()
