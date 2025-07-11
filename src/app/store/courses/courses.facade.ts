import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from '@app/interfaces/course.interface';
import { CoursesState } from './courses.reducer';
import {
  getAllCourses,
  getCourses,
  getCourse,
  isAllCoursesLoadingSelector,
  isSingleCourseLoadingSelector,
  isSearchingStateSelector,
  getErrorMessage,
} from './courses.selectors';
import * as CoursesActions from './courses.actions';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  // Observable properties
  public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
    select(isAllCoursesLoadingSelector),
  );
  public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
    select(isSingleCourseLoadingSelector),
  );
  public isSearchingState$: Observable<boolean> = this.store.pipe(select(isSearchingStateSelector));
  public courses$: Observable<Course[] | null> = this.store.pipe(select(getCourses));
  public allCourses$: Observable<Course[] | null> = this.store.pipe(select(getAllCourses));
  public course$: Observable<Course | null> = this.store.pipe(select(getCourse));
  public errorMessage$: Observable<string | null> = this.store.pipe(select(getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  // Action dispatching methods
  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title: searchValue }));
  }

  editCourse(body: Course, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ course: body, id }));
  }

  createCourse(body: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
