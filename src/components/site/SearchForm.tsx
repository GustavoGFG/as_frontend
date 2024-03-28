'use client';

import { transformCPF } from '@/utils/transformCPF';
import { useState } from 'react';

type Props = {
  onSearchButton: (cpfInput: string) => void;
  loading: boolean;
};

export const SearchForm = ({ onSearchButton, loading }: Props) => {
  const [cpfInput, setCpfInput] = useState('');

  return (
    <div>
      <p className="mb-3 text-xl">Qual seu CPF?</p>
      <input
        className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-50"
        type="text"
        inputMode="numeric"
        placeholder="Digite seu CPF"
        autoFocus
        value={cpfInput}
        onChange={e => setCpfInput(transformCPF(e.target.value))}
        disabled={loading}
      />
      <button
        className="w-full p-3 mt-3 rounded-lg text-white text-4xl bg-blue-800 border-b-4 border-blue-600 active:border-b-0 active:border-blue-800 active:border-t-4 active:border-t-slate-900 disabled:opacity-50"
        onClick={() => onSearchButton(cpfInput)}
        disabled={loading}
      >
        {loading ? 'Buscando...' : 'Entrar'}
      </button>
    </div>
  );
};
