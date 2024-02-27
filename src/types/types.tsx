import { Album } from "./data";

export type RootStackParamList = {
    Home: undefined;
    AlbumImages: { data: Album }; // Define los parámetros que deseas pasar entre pantallas
  };