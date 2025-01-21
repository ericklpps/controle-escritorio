import React, { useState, useEffect } from "react";
import Mesa from "./components/Mesa";
import BotaoResetar from "./components/BotaoResetar";
import api from "./services/api";

const App = () => {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    api.get("/mesas").then((response) => setMesas(response.data));
  }, []);

  const adicionarUsuario = (id, nome, tipo) => {
    api.put(`/mesas/${id}`, { id, nome, tipo }).then(() =>
      setMesas((prev) =>
        prev.map((mesa) => (mesa.id === id ? { id, nome, tipo } : mesa))
      )
    );
  };

  const editarUsuario = (id) => {
    const nome = prompt("Digite o novo nome:");
    if (nome) adicionarUsuario(id, nome, "dinamica");
  };

  const excluirUsuario = (id) => {
    api.put(`/mesas/${id}`, { id, nome: "", tipo: "dinamica" }).then(() =>
      setMesas((prev) =>
        prev.map((mesa) => (mesa.id === id ? { id, nome: "", tipo: "dinamica" } : mesa))
      )
    );
  };

  const resetarDinamicas = () => {
    mesas
      .filter((mesa) => mesa.tipo === "dinamica")
      .forEach((mesa) => excluirUsuario(mesa.id));
  };

  return (
    <div className="p-4 bg-blue-600">
      <h1 className="text-center text-2xl font-bold mb-6 text-white">CONTROLE DE LUGARES</h1>
      <hr></hr>
      <br></br>
      <h2 className="text-center text-2xl font-bold mb-6 text-white">SALA DIRETORIA</h2>
      <br></br>
      <div className="grid grid-cols-4 gap-6 place-items-center">
        {mesas
          .sort((a, b) => b.id - a.id)
          .map((mesa) => (
            <Mesa
              key={mesa.id}
              mesa={mesa}
              onAdicionar={adicionarUsuario}
              onEditar={editarUsuario}
              onExcluir={excluirUsuario}
            />
          ))}
      </div>
      <br></br>
      <div className="mt-10 flex justify-center">
        <BotaoResetar onReset={resetarDinamicas} />
      </div>
    </div>
  );
};

export default App;
