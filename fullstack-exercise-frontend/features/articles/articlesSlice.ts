import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../common/axios";
import { Status } from "../../types/status";
import { ArticleShort, ArticlesShortRes } from "./articleTypes";

type ArticlesState = {
  articles: ArticleShort[];
  status: Status;
};

const initialState: ArticlesState = {
  articles: [],
  status: Status.Idle,
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  const response = await axios.get<ArticlesShortRes>("/articles");
  return response.data;
});

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchArticles.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.articles = action.payload.articles;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = Status.Fail;
      });
  },
});

// export const {} = articlesSlice.actions;

export default articlesSlice.reducer;
