import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@nest-angular-monorepo/types';
import {
  logout,
  selectAuthenticatedUser,
} from '@nest-angular-monorepo/auth-store';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  currentUser$: Observable<User>;

  constructor(private store: Store) {
    this.currentUser$ = this.store.select(
      selectAuthenticatedUser
    ) as Observable<User>;
  }

  logout() {
    this.store.dispatch(logout());
  }
}
