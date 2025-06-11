const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');
const settlementRoutes = require('./routes/settlements');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/expenses', expenseRoutes);
app.use('/', settlementRoutes);  // for /balances, /settlements, /people

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
  .catch((err) => console.log(err));
