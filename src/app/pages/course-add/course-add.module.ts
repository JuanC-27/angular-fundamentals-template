import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './course-add.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CourseAddComponent,
  },
];

@NgModule({
  declarations: [CourseAddComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CourseAddModule {}
