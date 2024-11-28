import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '@nest-angular-monorepo/auth-store';

@Component({
  standalone: true,
  imports: [RouterModule],
  providers: [AuthGuard],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
}
