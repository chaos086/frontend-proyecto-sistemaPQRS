import { Injectable, inject, signal, effect } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface NotificationMessage {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
  summary: string;
  detail: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messageService = inject(MessageService);
  readonly messageQueue = signal<NotificationMessage | null>(null);

  constructor() {
    effect(() => {
      const msg = this.messageQueue();
      if (msg) {
        this.messageService.add({ severity: msg.severity, summary: msg.summary, detail: msg.detail });
      }
    });
  }

  success(detail: string, summary = 'Éxito'): void {
    this.messageQueue.set({ severity: 'success', summary, detail });
  }

  error(detail: string, summary = 'Error'): void {
    this.messageQueue.set({ severity: 'error', summary, detail });
  }

  info(detail: string, summary = 'Información'): void {
    this.messageQueue.set({ severity: 'info', summary, detail });
  }

  warn(detail: string, summary = 'Advertencia'): void {
    this.messageQueue.set({ severity: 'warn', summary, detail });
  }
}
