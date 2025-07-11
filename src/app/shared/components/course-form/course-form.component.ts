import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Course } from '@app/interfaces/course.interface';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Router } from '@angular/router';

interface Author {
  id: string;
  name: string;
}

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  @Input() courseData: Course | null = null;
  @Output() formSubmit = new EventEmitter<Course>();

  courseForm!: FormGroup;
  allAuthors: Author[] = [];
  availableAuthors: Author[] = [];
  courseAuthors: Author[] = [];
  submitted = false;
  isLoading = false;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStoreService: CoursesStoreService,
    private router: Router,
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.loadAuthors();
    this.initForm();
    if (this.courseData) {
      this.populateForm();
    }
  }

  loadAuthors(): void {
    this.isLoading = true;
    this.coursesStoreService.getAllAuthors().subscribe({
      next: (response) => {
        if (response.successful) {
          this.allAuthors = response.result;
          this.availableAuthors = [...this.allAuthors];

          if (this.courseData && this.courseData.authors) {
            this.processCourseAuthors();
          }
        }
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  initForm(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        name: ['', [Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      }),
    });
  }

  populateForm(): void {
    if (!this.courseData) return;

    this.courseForm.patchValue({
      title: this.courseData.title,
      description: this.courseData.description,
      duration: this.courseData.duration,
    });

    // Process authors after loading author list
    if (this.allAuthors.length > 0) {
      this.processCourseAuthors();
    }
  }

  processCourseAuthors(): void {
    if (!this.courseData || !this.courseData.authors || !this.allAuthors.length) return;

    // Find authors from the course data
    this.courseData.authors.forEach((authorId) => {
      const author = this.allAuthors.find((a) => a.id === authorId);
      if (author) {
        this.courseAuthors.push(author);
        this.authorsArray.push(new FormControl(author));

        // Remove from available authors
        const index = this.availableAuthors.findIndex((a) => a.id === authorId);
        if (index !== -1) {
          this.availableAuthors.splice(index, 1);
        }
      }
    });
  }

  get f() {
    return this.courseForm.controls;
  }
  get authorsArray(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }
  get newAuthorGroup(): FormGroup {
    return this.courseForm.get('newAuthor') as FormGroup;
  }
  get newAuthorControl(): FormControl {
    return this.newAuthorGroup.get('name') as FormControl;
  }

  addAuthorToCourse(author: Author) {
    this.courseAuthors.push(author);
    this.availableAuthors = this.availableAuthors.filter((a) => a.id !== author.id);
    this.authorsArray.push(new FormControl(author));
  }

  removeAuthorFromCourse(author: Author, idx: number) {
    this.availableAuthors.push(author);
    this.courseAuthors = this.courseAuthors.filter((a) => a.id !== author.id);
    this.authorsArray.removeAt(idx);
  }

  createAuthor() {
    const name = this.newAuthorGroup.get('name')?.value.trim();
    if (
      !name ||
      this.availableAuthors.some((a) => a.name === name) ||
      this.courseAuthors.some((a) => a.name === name)
    ) {
      return;
    }

    this.coursesStoreService.createAuthor(name).subscribe({
      next: (response) => {
        if (response.successful && response.result) {
          const newAuthor = response.result;
          this.availableAuthors.push(newAuthor);
          this.allAuthors.push(newAuthor);
          this.newAuthorGroup.reset();
        }
      },
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.courseForm.invalid) return;

    const formData = this.courseForm.value;

    const course: Course = {
      title: formData.title,
      description: formData.description,
      duration: formData.duration,
      authors: formData.authors.map((author: Author) => author.id),
      creationDate: this.courseData?.creationDate || new Date().toISOString(),
    };

    if (this.courseData?.id) {
      course.id = this.courseData.id;
    }

    this.formSubmit.emit(course);
  }

  showError(control: AbstractControl | null): boolean {
    return !!control && control.invalid && (control.touched || this.submitted);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
