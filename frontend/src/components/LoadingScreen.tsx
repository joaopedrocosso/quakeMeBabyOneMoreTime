import { AiOutlineLoading } from 'react-icons/ai';

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-black flex items-center justify-center transition-opacity duration-1000 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <AiOutlineLoading className="text-white text-6xl animate-spin" />
    </div>
  );
};

export default LoadingScreen;
