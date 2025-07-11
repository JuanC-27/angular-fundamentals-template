import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map, tap } from 'rxjs';
import { Course } from '@app/interfaces/course.interface';
import { CoursesService } from './courses.service';

interface Author {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private authors$$ = new BehaviorSubject<Author[]>([]);
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.setLoading(true);
    return this.coursesService.getAll().pipe(
      tap((response) => {
        console.log('Courses fetched:', response);
        if (response.successful) {
          this.courses$$.next(response.result);
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  createCourse(course: Course) {
    this.setLoading(true);
    return this.coursesService.createCourse(course).pipe(
      tap((response) => {
        if (response.successful && response.result) {
          const currentCourses = this.courses$$.getValue();
          this.courses$$.next([...currentCourses, response.result]);
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  getCourse(id: string) {
    this.setLoading(true);
    return this.coursesService.getCourse(id).pipe(
      map((response) => response.result),
      finalize(() => this.setLoading(false)),
    );
  }

  editCourse(id: string, course: Course) {
    this.setLoading(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap((response) => {
        if (response.successful && response.result) {
          const currentCourses = this.courses$$.getValue();
          const updatedCourses = currentCourses.map((c) => (c.id === id ? response.result : c));
          this.courses$$.next(updatedCourses);
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  deleteCourse(id: string) {
    this.setLoading(true);
    return this.coursesService.deleteCourse(id).pipe(
      tap((response) => {
        if (response.successful) {
          const currentCourses = this.courses$$.getValue();
          this.courses$$.next(currentCourses.filter((course) => course.id !== id));
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  filterCourses(value: string) {
    this.setLoading(true);
    return this.coursesService.filterCourses(value).pipe(
      tap((response) => {
        if (response.successful) {
          this.courses$$.next(response.result);
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  getAllAuthors() {
    this.setLoading(true);
    return this.coursesService.getAllAuthors().pipe(
      tap((response) => {
        if (response.successful) {
          this.authors$$.next(response.result);
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  createAuthor(name: string) {
    this.setLoading(true);
    return this.coursesService.createAuthor(name).pipe(
      tap((response) => {
        if (response.successful && response.result) {
          const currentAuthors = this.authors$$.getValue();
          this.authors$$.next([...currentAuthors, response.result]);
        }
      }),
      finalize(() => this.setLoading(false)),
    );
  }

  getAuthorById(id: string) {
    this.setLoading(true);
    return this.coursesService.getAuthorById(id).pipe(
      map((response) => response.result),
      finalize(() => this.setLoading(false)),
    );
  }

  searchCourses(searchTerm: string) {
    if (!searchTerm.trim()) {
      // If search term is empty, load all courses
      return this.getAll();
    } else {
      // Otherwise filter courses by title
      return this.filterCourses(searchTerm);
    }
  }

  private setLoading(isLoading: boolean): void {
    this.isLoading$$.next(isLoading);
  }
}
