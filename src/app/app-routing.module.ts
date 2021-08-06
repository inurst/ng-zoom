import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HomeComponent } from './containers/home/home.component';
import { FormTestComponent } from './containers/form-test/form-test.component';
 
const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form-test', component: FormTestComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only set true
    )
  ], 
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }