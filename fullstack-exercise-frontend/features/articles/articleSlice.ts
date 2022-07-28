import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../common/axios";
import { Status } from "../../types/status";
import { Article } from "./articleTypes";

type ArticleState = {
  article: Article | null;
  status: Status;
};

const initialState: ArticleState = {
  article: null,
  status: Status.Idle,
};

export const fetchArticle = createAsyncThunk("article/fetchArticle", async (id: number) => {
  const response = await axios.get<Article>(`/articles/${id}`);
  return response.data;
});

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticle.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.article = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = Status.Fail;
      });
  },
});

// export const {} = articleSlice.actions;

export default articleSlice.reducer;
