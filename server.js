import express from 'express';
import fs from 'fs/promises'; // Użyj fs/promises dla ES6
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'; // Dodaj ten import

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const corsOptions = {
	origin: process.env.FRONTEND_URL || 'http://localhost:4321',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	credentials: true,
};

app.use(cors(corsOptions));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware do obsługi statycznych plików
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Wczytanie danych z db.json
let dbData; // Zmień na let, aby można było przypisać wartość wewnątrz async

async function loadDb() {
	try {
		const data = await fs.readFile('db.json', 'utf8');
		dbData = JSON.parse(data);
	} catch (error) {
		console.error('Błąd podczas wczytywania db.json:', error);
		process.exit(1); // Zakończ proces, jeśli nie można wczytać danych
	}
}

// Endpoint do sprawdzenia, czy API działa
app.get('/', (req, res) => {
	res.send('API działa poprawnie!');
});

// Endpoint do pobierania projektów
app.get('/api/projects', (req, res) => {
	if (!dbData) {
		res.status(500).json({ message: 'Dane nie są dostępne' });
	} else {
		res.json(dbData.projects);
	}
});

// Endpoint do pobierania pojedynczego projektu
app.get('/api/projects/:id', (req, res) => {
	if (!dbData) {
		res.status(500).json({ message: 'Dane nie są dostępne' });
		return;
	}

	const projectId = parseInt(req.params.id); // Konwertuj na liczbę
	const project = dbData.projects.find((project) => project.id === projectId);
	if (project) {
		res.json(project);
	} else {
		res.status(404).json({ message: 'Projekt nie znaleziony' });
	}
});

// Endpoint do pobierania blogów
app.get('/api/blogs', (req, res) => {
	if (!dbData) {
		res.status(500).json({ message: 'Dane nie są dostępne' });
	} else {
		res.json(dbData.blogs);
	}
});

// Endpoint do pobierania pojedynczego blogu
app.get('/api/blogs/:id', (req, res) => {
	if (!dbData) {
		res.status(500).json({ message: 'Dane nie są dostępne' });
		return;
	}

	const blogId = parseInt(req.params.id); // Konwertuj na liczbę
	const blog = dbData.blogs.find((blog) => blog.id === blogId);
	if (blog) {
		res.json(blog);
	} else {
		res.status(404).json({ message: 'Blog nie znaleziony' });
	}
});

loadDb().then(() => {
	app.listen(port, () => {
		console.log(`Serwer działa na porcie ${port}`);
	});
});
