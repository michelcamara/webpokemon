import React from 'react';

export default function PokeForm({ tipo, onSubmit, }) {

  async function handleSubmit(e) {
    //prevendo o comportamento padrao do formulario
    e.preventDefault();
    await onSubmit({
      tipo,
    });
  }

  return (
    <button key={tipo} className={tipo} type="submit" onClick={handleSubmit}>{tipo}</button>
  )
} 