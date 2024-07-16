sconst express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskdb', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Task Schema and Model
const taskSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  priority: String,
  User: String,
});

const Task = mongoose.model('Task', taskSchema);


// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
