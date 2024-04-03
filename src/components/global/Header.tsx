import React from 'react';

type Props = { subtitle: string };
const Header = ({ subtitle }: Props) => {
  return (
    <header className="bg-gray-800 text-center h-[100px] flex flex-col justify-center">
      <h3 className="text-3xl text-[#f7914d]">Amigo Secreto</h3>
      <h4 className="text-base">{subtitle}</h4>
    </header>
  );
};

export default Header;
