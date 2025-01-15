const app = require('./app.js');
const { PORT = 5431 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`))