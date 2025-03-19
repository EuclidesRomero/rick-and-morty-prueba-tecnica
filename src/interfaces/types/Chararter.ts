interface Origin {
    name: string;
    url: string;
  }
  
  interface Location {
    name: string;
    url: string;
  }
  
  interface Character {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown"; 
    species: string;
    type: string;
    gender: "Male" | "Female" | "Genderless" | "unknown"; 
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
  }
  

  export default Character;