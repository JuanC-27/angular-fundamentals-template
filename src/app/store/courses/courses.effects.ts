import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { CoursesService } from '@app/services/courses.service';
import { CoursesStateFacade } from './courses.facade';
import { Course } from '@app/interfaces/course.interface';
import * as CoursesActions from './courses.actions';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private coursesStateFacade: CoursesStateFacade,
    private router: Router,
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((response) => {
            if (response.successful) {
              return CoursesActions.requestAllCoursesSuccess({ courses: response.result });
            } else {
              return CoursesActions.requestAllCoursesFail({ error: 'Failed to load courses' });
            }
          }),
          catchError((error) =>
            of(
              CoursesActions.requestAllCoursesFail({
                error: error.message || 'Failed to load courses',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.coursesStateFacade.allCourses$),
      map(([action, allCourses]) => {
        const filteredCourses = allCourses ? allCourses.filter((course: Course) =>
          course.title.toLowerCase().includes(action.title.toLowerCase()),
        ) : [];
        return CoursesActions.requestFilteredCoursesSuccess({ courses: filteredCourses });
      }),
      catchError((error) =>
        of(
          CoursesActions.requestFilteredCoursesFail({
            error: error.message || 'Failed to filter courses',
          }),
        ),
      ),
    ),
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((response) => {
            if (response.successful) {
              return CoursesActions.requestSingleCourseSuccess({ course: response.result });
            } else {
              return CoursesActions.requestSingleCourseFail({ error: 'Failed to load course' });
            }
          }),
          catchError((error) =>
            of(
              CoursesActions.requestSingleCourseFail({
                error: error.message || 'Failed to load course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      switchMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          map((response) => {
            if (response.successful) {
              return CoursesActions.requestAllCourses();
            } else {
              return CoursesActions.requestDeleteCourseFail({ error: 'Failed to delete course' });
            }
          }),
          catchError((error) =>
            of(
              CoursesActions.requestDeleteCourseFail({
                error: error.message || 'Failed to delete course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      switchMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map((response) => {
            if (response.successful) {
              return CoursesActions.requestEditCourseSuccess({ course: response.result });
            } else {
              return CoursesActions.requestEditCourseFail({ error: 'Failed to edit course' });
            }
          }),
          catchError((error) =>
            of(
              CoursesActions.requestEditCourseFail({
                error: error.message || 'Failed to edit course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      switchMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map((response) => {
            if (response.successful) {
              return CoursesActions.requestCreateCourseSuccess({ course: response.result });
            } else {
              return CoursesActions.requestCreateCourseFail({ error: 'Failed to create course' });
            }
          }),
          catchError((error) =>
            of(
              CoursesActions.requestCreateCourseFail({
                error: error.message || 'Failed to create course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail,
        ),
        tap(() => {
          this.router.navigate(['/courses']);
        }),
      ),
    { dispatch: false },
  );
}
