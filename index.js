const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocols",
    important: true,
  },
];

app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => {
    return note.id === id;
  });
  if (note) {
    res.json(note);
  } else {
    res.status(404).end("404 Page not found");
  }
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/notes", (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.filter((note) => {
    note.id !== id;
  });
  response.status(204).end();
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
