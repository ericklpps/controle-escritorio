import React, { useState, useEffect } from "react";
import Mesa from "../components/Mesa";
import api from "../services/api";

const Comercial = () => {
  const [mesasComercial, setMesasComercial] = useState([]);

  // Carregar dados das mesas do Comercial
  useEffect(() => {
    api.get("/mesasComercial").then((response) => setMesasComercial(response.data));
  }, []);

  const adicionarUsuario = (id, nome, tipo) => {
    api.put(`/mesasComercial/${id}`, { id, nome, tipo }).then(() =>
      setMesasComercial((prev) =>
        prev.map((mesa) => (mesa.id === id ? { id, nome, tipo } : mesa))
      )
    );
  };

  const editarUsuario = (id) => {
    const nome = prompt("Digite o novo nome:");
    if (nome) adicionarUsuario(id, nome, "dinamica");
  };

  const excluirUsuario = (id) => {
    api.put(`/mesasComercial/${id}`, { id, nome: "", tipo: "dinamica" }).then(() =>
      setMesasComercial((prev) =>
        prev.map((mesa) =>
          mesa.id === id ? { id, nome: "", tipo: "dinamica" } : mesa
        )
      )
    );
  };

  const resetarTodas = () => {
    mesasComercial.forEach((mesa) => {
      api.put(`/mesasComercial/${mesa.id}`, { id: mesa.id, nome: "", tipo: "dinamica" }).then(() => {
        setMesasComercial((prev) =>
          prev.map((m) =>
            m.id === mesa.id ? { id: m.id, nome: "", tipo: "dinamica" } : m
          )
        );
      });
    });
  };

  return (
    <div className="min-h-screen p-4 bg-blue-600 text-black">
      <h1 className="text-center text-2xl font-bold mb-6 text-white">
        CONTROLE DE LUGARES - COMERCIAL
      </h1>
      <div className="grid grid-cols-3 gap-6 place-items-center">
        {mesasComercial.map((mesa) => (
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
          onClick={resetarTodas}
        >
          Resetar Todas as Mesas
        </button>
      </div>
    </div>
  );
};

export default Comercial;
