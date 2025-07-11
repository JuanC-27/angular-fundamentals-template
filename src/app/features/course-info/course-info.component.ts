import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/interfaces/course.interface';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { CoursesStoreService } from 'src/app/services/courses-store.service';
import { UserStateFacade } from '@app/store/user/user.facade';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course: Course = {
    title: '',
    description: '',
    creationDate: '',
    duration: 0,
    authors: [],
  };

  courseId: string = '';
  isLoading$ = this.coursesFacade.isSingleCourseLoading$;
  isAdmin$: Observable<boolean> = this.userFacade.isAdmin$;
  authorNames: string[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesFacade: CoursesStateFacade,
    private coursesStoreService: CoursesStoreService,
    private userFacade: UserStateFacade,
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    if (this.courseId) {
      this.loadCourse();
    } else {
      this.router.navigate(['/courses']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCourse(): void {
    this.coursesFacade.getSingleCourse(this.courseId);

    this.coursesFacade.course$
      .pipe(
        takeUntil(this.destroy$),
        filter((course) => course !== null),
      )
      .subscribe({
        next: (course) => {
          if (course) {
            this.course = course;
            this.loadAuthorsInfo();
          }
        },
      });

    this.coursesFacade.errorMessage$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (error) => {
        if (error) {
          alert('Error loading course');
          this.router.navigate(['/courses']);
        }
      },
    });
  }

  loadAuthorsInfo(): void {
    // Load author details for each author ID
    if (!this.course.authors?.length) {
      return;
    }

    // Get all authors first
    this.coursesStoreService.getAllAuthors().subscribe({
      next: (response) => {
        if (response.successful) {
          // Filter authors by ID
          const courseAuthorIds = this.course.authors || [];
          this.authorNames = response.result
            .filter((author) => courseAuthorIds.includes(author.id))
            .map((author) => author.name);
        }
      },
    });
  }

  onEditCourse(): void {
    this.router.navigate(['/courses/edit', this.courseId]);
  }

  onBackToList(): void {
    this.router.navigate(['/courses']);
  }

  get formattedAuthors(): string {
    return this.authorNames.join(', ');
  }
}
