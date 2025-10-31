import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeteriorationService {
  private startTime = Date.now();
  private deteriorationLevel$ = new BehaviorSubject<number>(0);
  private checkInterval?: number;

  // Niveles de deterioro:
  // 0 = Normal
  // 1 = Leve (30 segundos)
  // 2 = Moderado (45 segundos)
  // 3 = Severo (1 minuto)
  // 4 = Crítico (1 minuto 15 segundos)
  // 5 = Extremo (1 minuto 30 segundos+)

  constructor() {
    this.startTracking();
  }

  private startTracking() {
    // Actualizar cada segundo
    this.checkInterval = window.setInterval(() => {
      const timeSpent = (Date.now() - this.startTime) / 1000; // Segundos
      const level = this.calculateDeteriorationLevel(timeSpent);

      this.deteriorationLevel$.next(level);
      this.applyDeterioration(level);
    }, 1000);

    // Aplicar nivel inicial
    this.applyDeterioration(0);
  }

  private calculateDeteriorationLevel(seconds: number): number {
    if (seconds < 30) return 0;      // Normal
    if (seconds < 45) return 1;      // Leve (30s)
    if (seconds < 60) return 2;      // Moderado (45s)
    if (seconds < 75) return 3;      // Severo (1m)
    if (seconds < 90) return 4;      // Crítico (1m 15s)
    return 5;                         // Extremo (1m 30s+)
  }

  private applyDeterioration(level: number) {
    const body = document.body;

    // Remover todas las clases de deterioro
    body.classList.remove('deterioration-1', 'deterioration-2', 'deterioration-3', 'deterioration-4', 'deterioration-5');

    // Aplicar clase según el nivel
    if (level > 0) {
      body.classList.add(`deterioration-${level}`);
    }
  }

  getDeteriorationLevel() {
    return this.deteriorationLevel$.asObservable();
  }

  reset() {
    this.startTime = Date.now();
    this.deteriorationLevel$.next(0);
    this.applyDeterioration(0);
  }

  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}

