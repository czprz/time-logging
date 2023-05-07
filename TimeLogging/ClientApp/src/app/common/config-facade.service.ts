import { Injectable } from '@angular/core';
import { ConfigRepositoryService } from './config-repository.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigFacadeService {
  constructor(private readonly configRepository: ConfigRepositoryService) {}

  getTheme(): string | null {
    return this.configRepository.get('theme') ?? 'light-theme';
  }

  setTheme(theme: string): void {
    this.configRepository.set('theme', theme);
  }
}
