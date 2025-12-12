import axios from "axios";
import type { TrendQueryParams, CategoryQueryParams, TrendResponse, CategoryResponse } from "../types";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getTrends = (params?: TrendQueryParams) =>
    API.get<TrendResponse>("/youtube/trends", { params });

export const refreshTrends = (params?: TrendQueryParams) =>
    API.get<TrendResponse>("/youtube/trends/refresh", { params });

export const getCategories = (params?: CategoryQueryParams) =>
    API.get<CategoryResponse>("/youtube/categories", { params });

export const refreshCategories = (params?: CategoryQueryParams) =>
    API.get<CategoryResponse>("/youtube/categories/refresh", { params });
