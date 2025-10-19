import axios from "axios";
import type { Trend , Category } from "../types";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const getTrends = (params?: object) => 
    API.get<{ success: boolean; data: Trend[] }>("api/youtube/trends", {params});

export const refreshTrends = (params?: object) => 
    API.get<{success: boolean; data: Trend[] }>("api/youtube/trends/refresh",{params});

export const getCategories = (params?: object) => 
    API.get<{success: boolean; data: Category[]}>("api/youtube/categories",{params});

export const refreshCategories = (params?: object) =>
    API.get<{success: boolean; data: Category[]}>("api/youtube/categories/refresh",{params});

