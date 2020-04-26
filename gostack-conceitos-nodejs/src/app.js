const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0
  }

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  let repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "ID not found." })
  }

  let repository = repositories[repositoryIndex]

  repository = {
    id: id,
    title: title,
    url: url,
    techs: techs,
    likes: repository.likes
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "ID not found." })
  }

  repositories.splice(repositoryIndex, 1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(rep => rep.id === id)

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "ID not found." })
  }

  const repository = repositories[repositoryIndex]

  repository.likes += 1

  repositories[repositoryIndex] = repository

  return response.json(repository)

});

module.exports = app;
