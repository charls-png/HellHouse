import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HorrorService } from '../../services/horror.service';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule, CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.css'
})
export class NewsletterComponent {
  email: string = '';
  name: string = '';
  isLoading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showJumpscare = false;

  constructor(
    private apiService: ApiService,
    private horrorService: HorrorService
  ) {
    // Suscribirse al jumpscare del servicio
    this.horrorService.showJumpscare$.subscribe(show => {
      this.showJumpscare = show;
    });
  }

  onSubmit() {
    // Validación básica
    if (!this.email || !this.email.includes('@')) {
      this.showMessage('Por favor, ingresa un email válido', 'error');
      return;
    }

    this.isLoading = true;
    this.message = '';

    // Llamar al servicio de API
    this.apiService.subscribe({ email: this.email, name: this.name })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            // Mostrar mensaje de éxito primero
            this.showMessage(
              '¡Bienvenido a Hell House! Revisa tu email para confirmar.',
              'success'
            );
            this.email = '';
            this.name = '';

            // Jumpscare con delay de 1-2 segundos para crear suspenso
            const delay = 1000 + Math.random() * 1000; // Entre 1 y 2 segundos
            setTimeout(() => {
              // Activar jumpscare al suscribirse exitosamente
              this.horrorService.triggerJumpscare();
            }, delay);
          } else {
            this.showMessage(response.message || 'Error al suscribirse', 'error');
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error:', error);
          this.showMessage(
            error.error?.message || 'Error al conectar con el servidor. ¿Está el backend corriendo?',
            'error'
          );
        }
      });
  }

  private showMessage(text: string, type: 'success' | 'error') {
    this.message = text;
    this.messageType = type;

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 5000);
  }
}
