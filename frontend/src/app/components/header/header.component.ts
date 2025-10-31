import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  activeSection = 'inicio';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Esperar un momento para que el DOM esté listo
    setTimeout(() => {
      this.updateActiveSection();
      this.setupClickListeners();
    }, 100);
  }

  setupClickListeners() {
    // Los eventos de Angular ya funcionan, este método es solo respaldo
    // No necesitamos duplicar listeners aquí
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = ['inicio', 'about', 'nosotros', 'news', 'newsletter'];
    const scrollPosition = window.scrollY + 150;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          if (this.activeSection !== section) {
            this.activeSection = section;
            this.cdr.detectChanges();
          }
          break;
        }
      }
    }

    if (window.scrollY < 100 && this.activeSection !== 'inicio') {
      this.activeSection = 'inicio';
      this.cdr.detectChanges();
    }
  }

  scrollToSection(event: Event | null, sectionId: string) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      event.cancelBubble = true;
    }

    console.log('🔵 CLICK CAPTURADO - ScrollToSection:', sectionId);

    if (sectionId === 'inicio') {
      console.log('📜 Scrolling a inicio (top)');
      // Usar múltiples métodos para asegurar que funcione
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });

      // También intentar con scrollIntoView si el elemento existe
      const inicioElement = document.getElementById('inicio');
      if (inicioElement) {
        inicioElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      this.activeSection = 'inicio';
      this.cdr.detectChanges();

      setTimeout(() => {
        this.updateActiveSection();
      }, 300);
      return;
    }

    // Buscar elemento con múltiples intentos
    const findAndScroll = (attempts = 0) => {
      const element = document.getElementById(sectionId);

      if (element) {
        // Calcular posición de manera más precisa
        const headerHeight = 140; // Altura del header sticky
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        const offsetPosition = elementTop - headerHeight;

        console.log(`📜 Scrolling a "${sectionId}" - ElementTop: ${elementTop}, Offset: ${offsetPosition}, HeaderHeight: ${headerHeight}`);

        // Usar scrollIntoView como alternativa si window.scrollTo no funciona
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });

        // También hacer scroll manual para tener más control
        setTimeout(() => {
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
        }, 10);

        this.activeSection = sectionId;
        this.cdr.detectChanges();

        setTimeout(() => {
          this.updateActiveSection();
        }, 500);
      } else if (attempts < 5) {
        // Reintentar hasta 5 veces
        setTimeout(() => findAndScroll(attempts + 1), 100);
      } else {
        console.error(`❌ No se pudo encontrar el elemento "${sectionId}" después de 5 intentos`);
      }
    };

    findAndScroll();
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
