import { FC } from "react";

interface CardCharacterProps {
  name: string;
  species: string;
  image: string;
  onClick?: () => void;
}

const CardCharacter: FC<CardCharacterProps> = ({ name, species, image, onClick }) => {
  

  return (
    <div  onClick={onClick} className="w-[312px] rounded-lg overflow-hidden bg-white shadow-md hover:bg-gray-100 active:shadow-sm mb-4 hover:cursor-pointer" >
      <img src={image} alt={name} className="w-full h-[180px] object-cover" />
      <div className="p-2 border-t">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">{species}</p>
      </div>
    </div>
  );
};

export default CardCharacter;