import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/interfaces/course.interface';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-add',
  template: `
    <app-course-form (formSubmit)="onSubmit($event)"></app-course-form>
    <div *ngIf="isLoading$ | async" class="loading-indicator">Saving course...</div>
  `,
  styles: [
    `
      .course-add-page {
        padding: 20px;
      }

      .container {
        max-width: 800px;
        margin: 0 auto;
      }

      h1 {
        margin-bottom: 20px;
        color: #333;
      }

      .loading-indicator {
        margin-top: 20px;
        color: #666;
        font-style: italic;
      }
    `,
  ],
})
export class CourseAddComponent implements OnDestroy {
  isLoading$ = this.coursesFacade.isAllCoursesLoading$;
  private destroy$ = new Subject<void>();

  constructor(
    private coursesFacade: CoursesStateFacade,
    private router: Router,
  ) {
    // Subscribe to error messages
    this.coursesFacade.errorMessage$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      if (error) {
        alert('Error creating course');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(course: Course): void {
    this.coursesFacade.createCourse(course);
    // Navigation will be handled by the effect
  }
}
