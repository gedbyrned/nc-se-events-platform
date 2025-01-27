const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const registrationRoutes = require('./routes/registrationRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const signupRoutes = require('./routes/signupRoutes.js'); 
const eventRoutes = require('./routes/eventRoutes.js');

dotenv.config();
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

app.use(cors());

app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.use("/api", eventRoutes);
app.use("/api", authRoutes);
app.use("/api", registrationRoutes);
app.use("/api", userRoutes);
app.use("/api", signupRoutes); 

app.all('*', (req, res) => {
  res.status(404).send({ msg: "404: route not found" });
});

const PORT = process.env.PORT || 5431;

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });
}
