import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ onChange, placeholder = "Search..." }: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;
