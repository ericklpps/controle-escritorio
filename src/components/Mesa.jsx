import React, { useState } from "react";

const Mesa = ({ mesa, onAdicionar, onEditar, onExcluir }) => {
  const [mostrarOpcoes, setMostrarOpcoes] = useState(false);

  const handleAdicionar = () => {
    const nome = prompt("Digite o nome do usuário:");
    const tipo = prompt("Fixa (s/n)?") === "s" ? "fixa" : "dinamica";
    if (nome) onAdicionar(mesa.id, nome, tipo);
  };

  const handleExcluir = () => {
    if (mesa.tipo === "fixa") {
      const senha = prompt("Digite a senha do administrador:");
      if (senha !== "@m1g0") return alert("Senha incorreta!");
    }
    onExcluir(mesa.id);
  };

  return (
    <div
      className={`w-32 h-20 flex flex-col justify-center items-center border rounded-md shadow-lg 
                  ${mostrarOpcoes ? "bg-blue-100" : "bg-white"} 
                  ${mesa.nome ? "border-green-500" : "border-gray-300"}`}
      onClick={() => setMostrarOpcoes(!mostrarOpcoes)}
    >
      <p className="text-sm font-medium">
        {mesa.nome ? `Mesa ${mesa.id}: ${mesa.nome}` : `Mesa ${mesa.id}`}
      </p>
      {mostrarOpcoes && (
        <div className="mt-2 flex flex-col gap-1">
          {!mesa.nome && (
            <button
              className="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600 transition-all"
              onClick={handleAdicionar}
            >
              Adicionar
            </button>
          )}
          {mesa.nome && (
            <>
              <button
                className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600 transition-all"
                onClick={() => onEditar(mesa.id)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600 transition-all"
                onClick={handleExcluir}
              >
                Excluir
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Mesa;
