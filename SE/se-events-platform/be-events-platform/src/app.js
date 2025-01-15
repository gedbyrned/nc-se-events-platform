const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const { getEvents, getEvent } = require('./controllers/eventsController.js');
const authRoutes = require('./routes/authRoutes.js')
const registrationRoutes = require('./routes/registrationRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

dotenv.config();
const app = express();



// Middleware to parse JSON
app.use(express.json());
app.use(cors());


app.get('/test', (req, res) => {
  res.send('Server is working!');
});

app.get("/api/events", getEvents);
app.get("/api/events/:event_id", getEvent);

app.use("/api", authRoutes);
app.use("/api", registrationRoutes);
app.use("/api", userRoutes);


app.all('*', (req, res) => {
  res.status(404).send({ msg: "404: route not found" });
});

// Error handler middleware
const PORT = process.env.PORT || 5431;


module.exports = app;

// Start server only if the file is not being required by the test
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`);
  });

}
