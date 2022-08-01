import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../common/axios";
import { Status } from "../../types/status";
import { CommentInputs } from "../articles/comments";

type CommentsState = {
  status: Status;
  needsRefetch: boolean;
};

const initialState: CommentsState = {
  status: Status.Idle,
  needsRefetch: false,
};

export const postComment = createAsyncThunk("comment/post", async (data: CommentInputs) => {
  const response = await axios.post<Comment>(`articles/${data.articleId}/comments/`, data);
  return response.data;
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    refetched: (state) => {
      state.needsRefetch = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postComment.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.needsRefetch = true;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status = Status.Fail;
      });
  },
});

export const { refetched } = commentsSlice.actions;

export default commentsSlice.reducer;
