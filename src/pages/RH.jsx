import React, { useState, useEffect } from "react";
import Mesa from "../components/Mesa";
import api from "../services/api";

const RH = () => {
  const [mesasRH, setMesasRH] = useState([]);

  // Carregar dados do RH
  useEffect(() => {
    api.get("/mesasRH").then((response) => setMesasRH(response.data));
  }, []);

  const adicionarUsuario = (id, nome, tipo) => {
    api.put(`/mesasRH/${id}`, { id, nome, tipo }).then(() =>
      setMesasRH((prev) =>
        prev.map((mesa) => (mesa.id === id ? { id, nome, tipo } : mesa))
      )
    );
  };

  const editarUsuario = (id) => {
    const nome = prompt("Digite o novo nome:");
    if (nome) adicionarUsuario(id, nome, "dinamica");
  };

  const excluirUsuario = (id) => {
    api.put(`/mesasRH/${id}`, { id, nome: "", tipo: "dinamica" }).then(() =>
      setMesasRH((prev) =>
        prev.map((mesa) =>
          mesa.id === id ? { id, nome: "", tipo: "dinamica" } : mesa
        )
      )
    );
  };

  const resetarDinamicas = () => {
    mesasRH
      .filter((mesa) => mesa.tipo === "dinamica")
      .forEach((mesa) => excluirUsuario(mesa.id));
  };

  return (
    <div className="p-4 bg-blue-600">
      <h1 className="text-center text-2xl font-bold mb-6 text-white">
        CONTROLE DE LUGARES - RH
      </h1>
      <div className="grid grid-cols-2 gap-6 place-items-center">
        {mesasRH.map((mesa) => (
          <Mesa
            key={mesa.id}
            mesa={mesa}
            onAdicionar={adicionarUsuario}
            onEditar={editarUsuario}
            onExcluir={excluirUsuario}
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700 transition-all"
          onClick={resetarDinamicas}
        >
          Resetar Mesas
        </button>
      </div>
    </div>
  );
};

export default RH;
