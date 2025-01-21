const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//connessione a mongoDB
mongoose.connect('mongodb://localhost/studyTracker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

//definizioni dello schema per le attività
const activitySchema = new mongoose.Schema({
    name: String,
    description: String,
    studyTime: Number
});

const Activity = mongoose.model('Activity', activitySchema);

//definizione delle API
app.get('/activities', async (req, res) => {
    const activities = await Activity.find();
    res.json(activities);
});

//api per aggiungere un'attività
app.post("/api/activities", async (req, res) => {
    const { name, description, studyTime } = req.body;
    const activity = new Activity({ name, description, studyTime });
    await activity.save();
    res.status(201).json(activity);
}
);

//avvio del server
app.listen(3000, () => console.log('Server started on port 5000'));
