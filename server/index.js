const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const ideasRoutes = require('./routes/idea');

app.use(cors());
app.use(express.json());

app.use('/api/ideas', ideasRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
