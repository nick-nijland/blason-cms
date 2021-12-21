import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CmsComponent } from './cms/cms.component';
import { FaqComponent } from './cms/faq/faq.component';
import { ProductsComponent } from './cms/products/products.component';
import { ContentComponent } from './cms/content/content.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['veelgestelde-vragen']);

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } },
  {
    path: '',
    component: CmsComponent,
    children: [
      {
        path: '',
        component: CmsComponent
      },
      {
        path: 'veelgestelde-vragen',
        component: FaqComponent
      },
      {
        path: 'content',
        component: ContentComponent
      },
      {
        path: 'producten',
        component: ProductsComponent
      },
    ],
    canActivate: [AngularFireAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }