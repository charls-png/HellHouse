import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url?: string;
  published_at: string;
  created_at: string;
}

export interface SubscribeData {
  email: string;
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Newsletter - Suscribirse
  subscribe(data: SubscribeData): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/subscribers/subscribe`, data);
  }

  // Newsletter - Desuscribirse
  unsubscribe(token: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/subscribers/unsubscribe/${token}`);
  }

  // Noticias - Obtener todas
  getAllNews(): Observable<ApiResponse<NewsItem[]>> {
    return this.http.get<ApiResponse<NewsItem[]>>(`${this.apiUrl}/news`);
  }

  // Noticias - Obtener últimas
  getLatestNews(limit: number = 5): Observable<ApiResponse<NewsItem[]>> {
    return this.http.get<ApiResponse<NewsItem[]>>(`${this.apiUrl}/news/latest?limit=${limit}`);
  }

  // Noticias - Obtener por ID
  getNewsById(id: string): Observable<ApiResponse<NewsItem>> {
    return this.http.get<ApiResponse<NewsItem>>(`${this.apiUrl}/news/${id}`);
  }

  // Estadísticas
  getSubscriberStats(): Observable<ApiResponse<{ activeSubscribers: number }>> {
    return this.http.get<ApiResponse<{ activeSubscribers: number }>>(`${this.apiUrl}/subscribers/stats`);
  }
}
