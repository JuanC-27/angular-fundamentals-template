import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '@app/interfaces/course.interface';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStateFacade } from '@app/store/user/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses$ = this.coursesFacade.courses$;
  public isLoading$ = this.coursesFacade.isAllCoursesLoading$;
  public isAdmin$ = this.userFacade.isAdmin$;

  constructor(
    private coursesFacade: CoursesStateFacade,
    private userFacade: UserStateFacade,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    // Load user info if not already loaded
    this.userFacade.getUser();
  }

  loadCourses(): void {
    this.coursesFacade.getAllCourses();
  }

  onSearch(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.loadCourses();
    } else {
      this.coursesFacade.getFilteredCourses(searchTerm);
    }
  }

  onShowCourse(course: Course): void {
    if (course.id) {
      this.router.navigate(['/courses', course.id]);
    }
  }

  onEditCourse(course: Course): void {
    if (course.id) {
      this.router.navigate(['/courses/edit', course.id]);
    }
  }

  onDeleteCourse(course: Course): void {
    if (course.id) {
      this.coursesFacade.deleteCourse(course.id);
    }
  }

  addNewCourse(): void {
    this.router.navigate(['/courses/add']);
  }
}
