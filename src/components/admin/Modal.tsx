import { ReactNode } from 'react';
import { InputField } from './InputField';

type Props = {
  onClose: () => void;
  children: ReactNode;
};
export const Modal = ({ onClose, children }: Props) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex flex-col items-center justify-center overflow-y-auto p-3">
      <div className="w-full max-w-xl bg-gray-800 flex flex-col p-3 rounded-md">
        <div
          className="w-8 h-8 rounded-full self-end bg-gray-800 text-white text-lg flex justify-center items-center cursor-pointer hover:bg-gray-500"
          onClick={onClose}
        >
          X
        </div>
        <div className="bg-gray-800 w-full max-w-xl p-4 mb-5">{children}</div>
      </div>
    </div>
  );
};
