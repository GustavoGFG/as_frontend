import { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ onClose, children }: Props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (
        wrapperRef.current &&
        wrapperRef.current.scrollHeight > wrapperRef.current.clientHeight
      ) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex ${
        isOverflowing ? 'items-start' : 'items-center'
      } justify-center overflow-y-auto p-3`}
    >
      <div
        id="modal-container"
        className="w-full max-w-xl bg-gray-800 flex flex-col p-3 rounded-md"
      >
        <div
          className="w-8 h-8 rounded-full self-end bg-gray-800 text-white text-lg flex justify-center items-center cursor-pointer hover:bg-gray-500"
          onClick={onClose}
        >
          X
        </div>
        <div className="bg-gray-800 w-full max-w-xl p-4 mb-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
