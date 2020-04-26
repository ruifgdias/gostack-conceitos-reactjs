import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepos(response.data))
  }, []);


  async function handleAddRepository() {
    const newRepo = {
      title: `Desafio ${new Date().getTime()}`,
      url: "http://github.com/...",
      techs: ["Node.js", "..."],
    };

    const repo = await api.post("repositories", newRepo);

    setRepos([...repos, repo.data])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)

    setRepos([...repos.filter(r => r.id !== id)])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repos.map(r => (<li key={r.id}>
              {r.title}
              <button onClick={() => handleRemoveRepository(r.id)}>
                Remover
            </button>
            </li>)
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
