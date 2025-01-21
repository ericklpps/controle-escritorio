import React from "react";

const BotaoResetar = ({ onReset }) => {
  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700 transition-all"
      onClick={onReset}
    >
      Resetar Mesas
    </button>
  );
};

export default BotaoResetar;
