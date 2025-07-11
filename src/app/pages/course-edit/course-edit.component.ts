import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/interfaces/course.interface';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-course-edit',
  template: `
    <div *ngIf="isLoading$ | async" class="loading-indicator">Loading course data...</div>
    <app-course-form *ngIf="course" [courseData]="course" (formSubmit)="onSubmit($event)" />
  `,
  styles: [
    `
      .course-edit-page {
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
export class CourseEditComponent implements OnInit, OnDestroy {
  courseId: string;
  course: Course | null = null;
  isLoading$ = this.coursesFacade.isSingleCourseLoading$;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesFacade: CoursesStateFacade,
  ) {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.coursesFacade.getSingleCourse(this.courseId);

      this.coursesFacade.course$
        .pipe(
          takeUntil(this.destroy$),
          filter((course) => course !== null),
        )
        .subscribe((course) => {
          this.course = course;
        });

      this.coursesFacade.errorMessage$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
        if (error) {
          alert('Error loading course data');
          this.router.navigate(['/courses']);
        }
      });
    } else {
      this.router.navigate(['/courses']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(updatedCourse: Course): void {
    if (!this.courseId) return;
    this.coursesFacade.editCourse(updatedCourse, this.courseId);
    // Navigation will be handled by the effect
  }
}
