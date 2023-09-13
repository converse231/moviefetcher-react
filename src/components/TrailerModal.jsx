// TrailerModal.js
import { GrClose } from "react-icons/gr";
/* eslint react/prop-types: 0 */
const TrailerModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="relative z-10 bg-zinc-900 mx-auto w-[75%] h-[70%] rounded shadow-lg">
        <div className="flex justify-between p-4">
          <p className="text-2xl text-zinc-50 font-bold">Movie Trailer</p>
          <button onClick={onClose}>
            <GrClose className="text-2xl text-zinc-50" />
          </button>
        </div>
        <div className=" w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default TrailerModal;
