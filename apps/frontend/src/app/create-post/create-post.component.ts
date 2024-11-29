import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@nest-angular-monorepo/material';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { selectAuthLoading } from '@nest-angular-monorepo/auth-store';
import { createPostValidation } from '@nest-angular-monorepo/validation';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { createPost } from '@nest-angular-monorepo/posts-store';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent {
  dialogRef = inject(MatDialogRef<CreatePostComponent>);

  title = new FormControl('', createPostValidation.title.angular);
  content = new FormControl('', createPostValidation.content.angular);

  formGroup = new FormGroup({
    title: this.title,
    content: this.content,
  });

  titleErrorMessage = signal('');
  contentErrorMessage = signal('');
  isLoading = signal(false);

  constructor(private store: Store) {
    merge(this.title.statusChanges, this.title.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateTitleErrorMessage());

    merge(this.content.statusChanges, this.content.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.contentErrorMessage());
  }

  ngOnInit() {
    this.store.select(selectAuthLoading).subscribe((isLoading) => {
      this.isLoading.set(isLoading || false);
    });
  }

  updateTitleErrorMessage() {
    if (this.title.hasError('required')) {
      this.titleErrorMessage.set('You must enter a value');
    } else if (this.title.hasError('minlength')) {
      this.titleErrorMessage.set('Title is too short');
    } else {
      this.titleErrorMessage.set('');
    }
  }

  updateContentErrorMessage() {
    if (this.content.hasError('required')) {
      this.contentErrorMessage.set('You must enter a value');
    } else {
      this.contentErrorMessage.set('');
    }
  }

  create() {
    if (this.formGroup.invalid) return;

    const title = this.formGroup.get('title')!.value as string;
    const content = this.formGroup.get('content')!.value as string;

    this.store.dispatch(createPost({ title, content }));

    this.dialogRef.close();
  }
}
