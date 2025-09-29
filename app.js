// app.js
const express = require('express');
const path = require('path');

require('./db/mongoConnect');
const { routesInit } = require('./routes/config_routes'); // קובץ הקונפיג שלך

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// כאן מפעילים את כל הנתיבים דרך הפונקציה
routesInit(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
