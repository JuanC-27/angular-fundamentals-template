import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditComponent } from './course-edit.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CourseEditComponent,
  },
];

@NgModule({
  declarations: [CourseEditComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CourseEditModule {}
