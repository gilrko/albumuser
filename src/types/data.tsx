export interface User {
    id: number;
    name: string;
    albums: Album[];
}

export interface Album {
    id: number;
    title: string;
    userId: number
}

export interface Img {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export interface AppState {
    users: User[];
    albums: Album[];
    deletedAlbums: string[];
  }