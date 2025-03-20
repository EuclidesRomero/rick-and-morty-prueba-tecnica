interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="mt-5 w-40 h-8 rounded-lg bg-white text-blue-300 font-semibold shadow-md hover:bg-gray-100 active:shadow-sm hover:cursor-pointer"
    >
      LOAD MORE
    </button>
  );
};

export default LoadMoreButton;