import { FC } from "react";

interface LocationCardProps {
    name: string;
    type: string;
    onClick?: () => void;
}

const LocationCard: FC<LocationCardProps> = ({ name, type, onClick }) => {
    return (
        <div 
            onClick={onClick} 
            className="w-80 h-20 border border-gray-100 shadow mt-4 flex flex-col justify-center items-center cursor-pointer md:hidden lg:w-48 lg:h-32 lg:grid lg:shadow-md lg:rounded-lg lg:bg-white lg:border lg:border-gray-200 lg:hover:shadow-lg "
        >
            <span className="text-lg font-semibold text-center">{name}</span>
            <span className="text-sm text-gray-600 text-center">{type}</span>
        </div>
    );
};

export default LocationCard;
