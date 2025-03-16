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

// Endpoint do sprawdzenia, czy API działa
app.get('/', (req, res) => {
	res.send('API działa poprawnie!');
});

// Endpoint do pobierania projektów
app.get('/api/projects', (req, res) => {
	res.json(dbData.projects);
});

// Endpoint do pobierania pojedynczego projektu
app.get('/api/projects/:id', (req, res) => {
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
	res.json(dbData.blogs);
});

// Endpoint do pobierania pojedynczego blogu
// Endpoint do pobierania pojedynczego blogu
app.get('/api/blogs/:id', (req, res) => {
	const blogId = parseInt(req.params.id); // Konwertuj na liczbę
	const blog = dbData.blogs.find((blog) => blog.id === blogId);
	if (blog) {
		res.json(blog);
	} else {
		res.status(404).json({ message: 'Blog nie znaleziony' });
	}
});

// Uruchomienie serwera
app.listen(port, () => {
	console.log(`Serwer działa na porcie ${port}`);
});
