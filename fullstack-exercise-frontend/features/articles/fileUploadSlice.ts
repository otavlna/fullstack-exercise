import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../common/axios";
import { Status } from "../../types/status";

type FileUploadState = {
  fileName: string | null;
  status: Status;
};

const initialState: FileUploadState = {
  fileName: null,
  status: Status.Idle,
};

export const fetchFileUpload = createAsyncThunk("fileUpload/fileUpload", async (formData: FormData) => {
  const response = await axios.post<string>("/images/upload", formData);
  return response.data;
});

export const fileUploadSlice = createSlice({
  name: "fileUpload",
  initialState,
  reducers: {
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFileUpload.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(fetchFileUpload.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.fileName = action.payload;
      })
      .addCase(fetchFileUpload.rejected, (state, action) => {
        state.status = Status.Fail;
      });
  },
});

export const { setFileName } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
