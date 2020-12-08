require('dotenv').config()
const app = require('./app');
const port = 8080

app.listen(port, () => {
  console.log(`QuizMe server listening at http://localhost:${port}`)
})