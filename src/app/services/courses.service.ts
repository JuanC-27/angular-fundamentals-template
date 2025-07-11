import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Course } from '@app/interfaces/course.interface';

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

interface Author {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/all`);
  }

  createCourse(course: Course): Observable<ApiResponse<Course>> {
    return this.http.post<ApiResponse<Course>>(`${this.apiUrl}/courses/add`, course);
  }

  editCourse(id: string, course: Course): Observable<ApiResponse<Course>> {
    return this.http.put<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`, course);
  }

  getCourse(id: string): Observable<ApiResponse<Course>> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/courses/${id}`);
  }

  filterCourses(value: string): Observable<ApiResponse<Course[]>> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses/filter?title=${value}`);
  }

  getAllAuthors(): Observable<ApiResponse<Author[]>> {
    return this.http.get<ApiResponse<Author[]>>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<ApiResponse<Author>> {
    return this.http.post<ApiResponse<Author>>(`${this.apiUrl}/authors/add`, { name });
  }

  getAuthorById(id: string): Observable<ApiResponse<Author>> {
    return this.http.get<ApiResponse<Author>>(`${this.apiUrl}/authors/${id}`);
  }
}
