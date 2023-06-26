import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { AdministrationComponent } from './administration/administration.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: PortalComponent },
  { path: 'administration', 
    component: AdministrationComponent, 
    children: [
      {
        path: 'organizations',
        component: OrganizationsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      // {
      //   path: 'organizations',
      //   component: OrganizationsComponent
      // },
      // {
      //   path: 'organizations',
      //   component: OrganizationsComponent
      // }
    ] 
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
