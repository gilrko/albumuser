import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Album } from '../../types/data';

interface AlbumState {
  users: User[];
  albums: Album[];
  deletedAlbums: string[];
}

const initialState: AlbumState = {
  users: [],
  albums: [],
  deletedAlbums: [],
};

const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setAlbums(state, action: PayloadAction<Album[]>) {
      state.albums = action.payload;
    },
    deleteAlbum(state, action: PayloadAction<string>) {
      state.deletedAlbums.push(action.payload);
    },
  },
});

export const { setUsers, setAlbums, deleteAlbum } = albumSlice.actions;
export default albumSlice.reducer;