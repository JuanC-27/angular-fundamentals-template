import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '@app/interfaces/course.interface';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course: Course = {
    title: '',
  };

  @Input() editable: boolean = false;
  @Output() clickOnShow = new EventEmitter<boolean>();

  onShowCourse() {
    this.clickOnShow.emit(true);
  }
}
