import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, NewsItem } from '../../services/api.service';

@Component({
  selector: 'app-news',
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  news: NewsItem[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.isLoading = true;
    this.apiService.getAllNews().subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success && response.data) {
          this.news = response.data;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = 'Error al cargar noticias. Verifica que el backend esté corriendo.';
        console.error('Error:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('es-ES', options);
  }
}
