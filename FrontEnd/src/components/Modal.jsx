import React from "react";

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white text-black w-full max-w-sm p-6 space-y-4">
        <header className="font-semibold text-lg">{title}</header>
        <section className="text-sm text-secondText">{message}</section>
        <div className="flex justify-end gap-3">
          <button
            className="border border-secondText py-2 px-4 cursor-pointer hover:scale-105 duration-300 ease-in-out"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            className="bg-black text-white py-2 px-4 cursor-pointer hover:scale-105 duration-300 ease-in-out"
            onClick={onConfirm}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
