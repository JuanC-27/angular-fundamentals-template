import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesListModule } from './courses-list/courses-list.module';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
];

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, CoursesListModule, SharedModule, RouterModule.forChild(routes)],
  exports: [CoursesComponent],
})
export class CoursesModule {}
