import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AdminGuard } from './user/guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./pages/registration/registration.module').then((m) => m.RegistrationModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'courses',
    loadChildren: () => import('./features/courses/courses.module').then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'courses/add',
    loadChildren: () =>
      import('./pages/course-add/course-add.module').then((m) => m.CourseAddModule),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: 'courses/edit/:id',
    loadChildren: () =>
      import('./pages/course-edit/course-edit.module').then((m) => m.CourseEditModule),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: 'courses/:id',
    loadChildren: () =>
      import('./features/course-info/course-info.module').then((m) => m.CourseInfoModule),
    canLoad: [AuthorizedGuard],
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/courses',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
