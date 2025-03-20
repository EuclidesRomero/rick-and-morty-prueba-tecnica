import { createContext, FC, ReactNode, useState } from "react";
import { LocationInterface } from "../interfaces/types/LocationsInterface";
import Character from "../interfaces/types/Chararter";
import apiClient from "../api/apliClient";
import { useEffect } from "react";
import { Episode } from "../interfaces/types/Episode";

interface RickAndMortyProps {
  children: ReactNode;
}

interface RickAndMortyProviderProps {
  //Lo uso en la apertura y cierre del filter en version mobile
  openFilter: boolean;
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  //Para manejo de los filtros
  getCharacter: (
    specie?: string,
    status?: string,
    gender?: string
  ) => Promise<void>;
  chartacters: Character[];
  //Manejo de
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  //FilterByNombre
  setName: React.Dispatch<React.SetStateAction<string>>;
  //Obtener las locations
  getLocation: (type?: string, dimension?: string) => Promise<void>;
  locations: LocationInterface[];
  //Para manejar la paginacion en locations
  setPageLocation: React.Dispatch<React.SetStateAction<number>>;
  //Para manejar la paginacion en los episodios. Pd: Estoy reescribiendo una logica, podria reutilizarla pero me da bugs
  setPageEpisodes: React.Dispatch<React.SetStateAction<number>>;
  //Funcion para los episodios
  getEspisodes: () => Promise<void>;
  //Tipamos el arreglo de los apisodes para pasarlos y que pueda ser mostrados por otrs componentes:
  espisodes: Episode[];
  //Para obtener un personaje
  getASingleCharacter: (id: number) => Promise<Character>;
  //Para buscar por episodios
  setEpisodioSearch: React.Dispatch<React.SetStateAction<string>>;
   //Obtener un episodio por id
   getASingleEpisode:(id: number) => Promise<Episode>
   //get single location
   getASingleLocations:(id: number) => Promise<LocationInterface>;
}

const RickAndMortyContext = createContext<
  RickAndMortyProviderProps | undefined
>(undefined);

const RickAndMortyProvider: FC<RickAndMortyProps> = ({ children }) => {
  //Manejo de apertura y cierre del filter
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  //Manejo de los filters

  //State para los personajes filtrados o no
  const [chartacters, setCharacters] = useState<Character[]>([]);
  //State para manejo de la paginacion
  const [page, setPage] = useState<number>(1);
  const [pageLocation, setPageLocation] = useState<number>(1);
  const [pageEpisodes, setPageEpisodes] = useState<number>(1);
  //State para manejar el filtro por el nombre
  const [name, setName] = useState<string>("");
  // Obtenemos las locations
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const [espisodes, setEpisodes] = useState<Episode[]>([]);
  //Episodio a buscar
  const [episodioSearch, setEpisodioSearch] = useState<string>("");
 

  useEffect(() => {
    getCharacter();
  }, [page, name]);

  useEffect(() => {
    getLocation();
  }, [pageLocation]);

  useEffect(() => {
    getEpisodes();
  }, [pageEpisodes, episodioSearch]);

  useEffect(() => {
    return () => {
      setPageEpisodes(1);
      setEpisodioSearch("");
    };
  }, []);

  const getCharacter = async (
    specie?: string,
    gender?: string,
    status?: string
  ) => {
    const params = new URLSearchParams();
    if (specie) params.append("species", specie);
    if (status) params.append("status", status);
    if (gender) params.append("gender", gender);
    if (page) params.append("page", page.toString());
    //para añadirlo en la query minimo 3 caracteres para evitar sobrecargar el backend jeje xd
    if (name.length > 3) params.append("name", name);

    const baseUrl = "https://rickandmortyapi.com/api/character/";
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    console.log(url);
    try {
      const response = await apiClient.get(url);
      console.log(response.data.results);
      setCharacters(response.data.results || []);
    } catch (error) {
      console.error("Error al obtener personajes:", error);
      setCharacters([]);
    }
  };
  const getEpisodes = async () => {
    const params = new URLSearchParams();
    params.append("episode", episodioSearch);
    if (pageEpisodes) params.append("page", pageEpisodes.toString());
    const baseUrl = "https://rickandmortyapi.com/api/episode/";
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    console.log(url);
    try {
      const response = await apiClient.get(url);
      setEpisodes(response.data.results ?? []);
    } catch (error) {
      setEpisodes([]);
    }
  };

  const getLocation = async (type?: string, dimension?: string, name?:string) => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (dimension) params.append("dimension", dimension);
    if (name) params.append("name", name);
    
    if (pageLocation) params.append("page", pageLocation.toString());
    const baseUrl = "https://rickandmortyapi.com/api/location/";
    const url = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    console.log(url);
    try {
      const response = await apiClient.get(url);
      setLocations(response.data.results || []);
    } catch (error) {
      console.error("Error al obtener locations:", error);
      setLocations([]);
    }
  };

  const getASingleCharacter = async (id: number) => {
    try {
      const { data } = await apiClient.get(`/character/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching character:", error);
      throw error;
    }
  };

  const getASingleEpisode = async (id: number) => {
    try {
      const { data } = await apiClient.get(`/episode/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching character:", error);
      throw error;
    }
  };

  const getASingleLocations = async (id: number) => {
    try {
      const { data } = await apiClient.get(`/location/${id}`);
      return data;
    } catch (error) {
      console.error("Error fetching character:", error);
      throw error;
    }
  };

  return (
    <RickAndMortyContext.Provider
      value={{
        setOpenFilter,
        openFilter,
        getCharacter,
        chartacters,
        setPage,
        page,
        setName,
        getLocation,
        locations,
        setPageLocation,
        getEspisodes: getEpisodes,
        setPageEpisodes,
        espisodes,
        getASingleCharacter,
        setEpisodioSearch,
        getASingleEpisode,
        getASingleLocations
        
      }}
    >
      {children}
    </RickAndMortyContext.Provider>
  );
};

export default RickAndMortyContext;

export { RickAndMortyProvider };
