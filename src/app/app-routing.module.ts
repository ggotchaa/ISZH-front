import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { AdministrationComponent } from './administration/administration.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirect to the home page
  { path: 'home', component: HomeComponent }, // Home page route
  { path: 'login', component: LoginComponent }, // Login page route
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      {
        path: 'administration',
        component: AdministrationComponent,
        children: [
          {
            path: 'organizations',
            component: OrganizationsComponent
          },
          {
            path: 'users',
            component: UsersComponent
          }
        ]
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
