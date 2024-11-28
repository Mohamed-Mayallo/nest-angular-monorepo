import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { selectIsAuthenticated } from '@nest-angular-monorepo/auth-store';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): MaybeAsync<GuardResult> {
    return this.store.select(selectIsAuthenticated).pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) return true;
        return this.router.navigate(['/login']);
      })
    );
  }
}
