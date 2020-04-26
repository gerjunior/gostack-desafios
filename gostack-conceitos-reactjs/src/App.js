import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      "title": "asdfasdf",
      "url": "https://github.com/Gerjunior/DevRadar",
      "techs": [
        "nodeJS",
        "React",
        "React Native"
      ],
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const index = repositories.findIndex(repository => repository.id === id)

    const newList = repositories

    newList.splice(index, 1)

    setRepositories([...newList])
  }

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data)
    })

  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
