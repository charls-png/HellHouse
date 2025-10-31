import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../news/news.component';
import { NewsletterComponent } from '../newsletter/newsletter.component';
import { HorrorService } from '../../services/horror.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NewsComponent, NewsletterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  showJumpscare = false;

  constructor(private horrorService: HorrorService) {}

  ngOnInit() {
    // Suscribirse al jumpscare del servicio
    this.horrorService.showJumpscare$.subscribe(show => {
      this.showJumpscare = show;
    });
  }

  onDiscoverClick(event: Event) {
    event.preventDefault();

    // Usar el servicio para activar jumpscare
    this.horrorService.triggerJumpscare();

    // Scroll suave a la sección about después del jumpscare
    setTimeout(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }, 1300);
  }
}
