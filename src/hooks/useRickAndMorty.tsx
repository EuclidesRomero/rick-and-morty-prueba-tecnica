import { useContext } from "react";
import RickAndMortyContext from "../context/RickAndMortyContext";


const useRickAndMorty = () => {
    const context = useContext(RickAndMortyContext);
    if (context == undefined) throw new Error('useAuth debe ser utilizado dentro de un PqrProvider');
    return context;
}

export default useRickAndMorty
