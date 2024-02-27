import { Album } from "./data";

export type RootStackParamList = {
    Home: undefined;
    AlbumImages: { data: Album };
  };