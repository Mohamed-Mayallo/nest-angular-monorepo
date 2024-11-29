import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, loginSuccess } from '@nest-angular-monorepo/auth-store';
import { User } from '@nest-angular-monorepo/types';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [RouterModule],
  providers: [AuthGuard],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private store: Store) {
    const token = localStorage.getItem('authToken');
    const user =
      localStorage.getItem('authUser') &&
      (JSON.parse(localStorage.getItem('authUser') as string) as User);

    if (token && user) {
      this.store.dispatch(loginSuccess({ token: token, user }));
    }
  }
}
