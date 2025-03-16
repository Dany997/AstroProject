import express from 'express';
import fs from 'fs/promises'; // Użyj fs/promises dla ES6
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());

const corsOptions = {
	origin: ['http://localhost:4321'], // Zezwalaj tylko na localhost:4321
};

app.use(cors(corsOptions));

// Wczytanie danych z db.json
const dbData = JSON.parse(await fs.readFile('db.json', 'utf8'));

// Endpoint do pobierania projektów
app.get('/api/projects', (req, res) => {
	res.json(dbData.projects);
});

// Endpoint do pobierania blogów
app.get('/api/blogs', (req, res) => {
	res.json(dbData.blogs);
});

// Uruchomienie serwera
app.listen(port, () => {
	console.log(`Serwer działa na porcie ${port}`);
});
