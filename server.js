import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.use(express.json());

const corsOptions = {
	origin: [
		'http://localhost:4321',
		'https://astroproject-production.up.railway.app',
	],
};

app.use(cors(corsOptions));

// Funkcja asynchronicznego wczytywania danych
const loadDB = async () => {
	try {
		const data = await fs.readFile('db.json', 'utf8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Błąd wczytywania db.json:', error);
		return null;
	}
};

// Obsługa requestów z danymi
app.get('/api/projects', async (req, res) => {
	const dbData = await loadDB();
	if (!dbData) return res.status(500).json({ message: 'Błąd serwera' });
	res.json(dbData.projects);
});

app.get('/api/projects/:id', async (req, res) => {
	const dbData = await loadDB();
	if (!dbData) return res.status(500).json({ message: 'Błąd serwera' });

	const projectId = parseInt(req.params.id);
	const project = dbData.projects.find((project) => project.id === projectId);

	if (project) {
		res.json(project);
	} else {
		res.status(404).json({ message: 'Projekt nie znaleziony' });
	}
});

// Start serwera
app.listen(port, host, () => {
	console.log(`Serwer działa na porcie ${port}`);
});
