const express = require('express');
const cors = require('cors');
const jsonServer = require('json-server');

const app = express();
const router = jsonServer.router('db.json'); // Podłączenie do pliku db.json

app.use(cors()); // Pozwala na żądania z frontendu
app.use(express.json()); // Obsługa JSON
app.use('/api', router); // Wszystkie żądania będą dostępne pod /api

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`🚀 JSON Server is running on http://localhost:${PORT}/api`);
});
