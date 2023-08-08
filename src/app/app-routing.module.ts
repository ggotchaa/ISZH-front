import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortalComponent} from './portal/portal.component';
import {AdministrationComponent} from './portal/administration/administration.component';
import {OrganizationsComponent} from './portal/administration/organizations/organizations.component';
import {UsersComponent} from './portal/administration/users/users.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AnimalRegistryComponent} from './portal/animal-accounting/animal-registry/animal-registry.component';
import {AnimalAccountingComponent} from './portal/animal-accounting/animal-accounting.component';
import {RolesAccessesComponent} from "./portal/administration/roles-accesses/roles-accesses.component";
import {AddAnimalsComponent} from "./portal/animal-accounting/animal-registry/add-animals/add-animals.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Домашняя страница'
    }
  }, // Redirect to the home page
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Домашняя страница'
    }
  }, // Home page route
  {
    path: 'login',
    component: LoginComponent,
    data: {
      breadcrumb: 'Вход'
    }
  }, // Login page route
  {
    path: 'portal',
    component: PortalComponent,
    data: {
      breadcrumb: 'Главная'
    }
  },
  {
    path: 'animal-accounting',
    component: AnimalAccountingComponent,
    children: [{
      path: 'animal-registry',
      component: AnimalRegistryComponent,
      data: {
        breadcrumb: 'Реестр Животных' // Breadcrumb label for the Home page
      }
    }],
    data: {
      breadcrumb: 'Учет животных' // Breadcrumb label for the Home page
    }
  },
  {
    path: 'add-animals',
    component: AddAnimalsComponent,
    data: {
      breadcrumb: 'Добавление животных'
    }
  },
  {
    path: 'administration',
    component: AdministrationComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'organizations', component: OrganizationsComponent},
      {path: 'roles-accesses', component: RolesAccessesComponent},
    ],
    data: {
      breadcrumb: 'Администрирование' // Breadcrumb label for the Home page
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
