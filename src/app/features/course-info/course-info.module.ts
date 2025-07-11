import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseInfoComponent } from './course-info.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CourseInfoComponent,
  },
];

@NgModule({
  declarations: [CourseInfoComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [CourseInfoComponent],
})
export class CourseInfoModule {}
