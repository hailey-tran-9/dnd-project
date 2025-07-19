import { createSlice } from "@reduxjs/toolkit";

const mapsSlice = createSlice({
  name: "maps",
  initialState: {
    maps: {},
    numberOfMaps: 0,
  },
  reducers: {
    loadMaps(state, action) {
      state.maps = action.payload.maps;
      state.numberOfMaps = action.payload.numberOfMaps;
    },
  },
});

export const mapsActions = mapsSlice.actions;

export default mapsSlice.reducer;
