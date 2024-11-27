import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@nest-angular-monorepo/material';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-content>Simple card</mat-card-content>
    </mat-card>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}
