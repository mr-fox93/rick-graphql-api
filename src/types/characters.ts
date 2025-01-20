export interface Character {
  id: string;
  name: string;
  species: string;
  image: string;
  gender: string;
  location: {
    name: string;
  };
  episode: [
    {
      id: string;
      name: string;
      episode: string;
    }
  ];
}
