import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../common/axios";
import { ArticleInputs } from "../../pages/admin/article";
import { Status } from "../../types/status";
import { Article, ArticleShort, ArticlesShortRes } from "./articleTypes";

type ArticlesState = {
  articles: ArticleShort[];
  myArticles: ArticleShort[];
  article: Article | null;
  uploadedArticle: Article | null;
  status: Status;
};

const initialState: ArticlesState = {
  articles: [],
  myArticles: [],
  article: null,
  uploadedArticle: null,
  status: Status.Idle,
};

export const fetchArticles = createAsyncThunk("articles/fetchArticles", async () => {
  const response = await axios.get<ArticlesShortRes>("/articles");
  return response.data;
});

export const fetchMyArticles = createAsyncThunk("articles/fetchMyArticles", async () => {
  const response = await axios.get<ArticlesShortRes>("/articles/admin");
  return response.data;
});

export const fetchArticle = createAsyncThunk("article/fetchArticle", async (id: number) => {
  const response = await axios.get<Article>(`/articles/${id}`);
  return response.data;
});

export const postArticle = createAsyncThunk("article/postArticle", async (data: ArticleInputs) => {
  const response = await axios.post<Article>("/articles", data);
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
      })

      .addCase(fetchMyArticles.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(fetchMyArticles.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.myArticles = action.payload.articles;
      })
      .addCase(fetchMyArticles.rejected, (state, action) => {
        state.status = Status.Fail;
      })

      .addCase(fetchArticle.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.article = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.status = Status.Fail;
      })

      .addCase(postArticle.pending, (state, action) => {
        state.status = Status.Loading;
      })
      .addCase(postArticle.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.uploadedArticle = action.payload;
      })
      .addCase(postArticle.rejected, (state, action) => {
        state.status = Status.Fail;
      });
  },
});

// export const {} = articlesSlice.actions;

export default articlesSlice.reducer;
