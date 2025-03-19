import { createContext, FC, ReactNode, useState } from "react";
import Character from "../interfaces/types/Chararter";
import apiClient from "../api/apliClient";
import { useEffect } from "react";

interface RickAndMortyProps {
    children: ReactNode;
}

interface RickAndMortyProviderProps {
    //Lo uso en la apertura y cierre del filter en version mobile
    openFilter: boolean;
    setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
    //Para manejo de los filtros
    getCharacter: (specie?: string, status?: string, gender?: string) => Promise<void>;
    chartacters: Character[];
    //Manejo de 
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    //FilterByNombre
    setName: React.Dispatch<React.SetStateAction<string>>
}


const RickAndMortyContext = createContext<RickAndMortyProviderProps | undefined>(undefined);



const RickAndMortyProvider: FC<RickAndMortyProps> = ({ children }) => {
    //Manejo de apertura y cierre del filter
    const [openFilter, setOpenFilter] = useState<boolean>(false);
    //Manejo de los filters

    //State para los personajes filtrados o no
    const [chartacters, setCharacters] = useState<Character[]>([]);
    //State para manejo de la paginacion
    const [page, setPage] = useState<number>(1);
    //State para manejar el filtro por el nombre
    const [name, setName] = useState<string>("");

    useEffect(() => {
        getCharacter();
    }, [page, name])
  

    const getCharacter = async (specie?: string, gender?: string, status?: string,) => {
        const params = new URLSearchParams();
        if (specie) params.append("species", specie);
        if (status) params.append("status", status);
        if (gender) params.append("gender", gender);
        if (page) params.append("page", page.toString());
        //para añadirlo en la query minimo 3 caracteres para evitar sobrecargar el backend jeje xd
        if (name.length > 3) params.append("name", name);

        const baseUrl = "https://rickandmortyapi.com/api/character/";
        const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
        console.log(url)
        try {
            const response = await apiClient.get(url);
            console.log(response.data.results)
            setCharacters(response.data.results || []);
        } catch (error) {
            console.error("Error al obtener personajes:", error);
            setCharacters([]);
        }

    };



    return (
        <RickAndMortyContext.Provider value={{ setOpenFilter, openFilter, getCharacter, chartacters, setPage, page,setName}}>
            {children}
        </RickAndMortyContext.Provider>
    )

}

export default RickAndMortyContext;

export {
    RickAndMortyProvider
}