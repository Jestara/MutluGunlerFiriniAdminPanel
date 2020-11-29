import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserComponent} from './Pages/user/user.component';
import {CategoryComponent} from './Pages/category/category.component';
import {ProductComponent} from './Pages/product/product.component';
import {ProductDetailComponent} from './Pages/product-detail/product-detail.component';
import {CategoryDetailComponent} from './Pages/category-detail/category-detail.component';
import {BasicElementsComponent} from './forms/basic-elements/basic-elements.component';
import {MenuComponent} from './Pages/menu/menu.component';
import {MenuDetailComponent} from './Pages/menu-detail/menu-detail.component';
import {LoginComponent} from './user-pages/login/login.component';



const routes: Routes = [
  {path: '', redirectTo: '/menu', pathMatch: 'full'},
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)},
  {path: 'category', component: CategoryComponent},
  {path: 'category-detail', component: CategoryDetailComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product-detail', component: ProductDetailComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'menu-detail', component: MenuDetailComponent},
  {path: 'forms', component:BasicElementsComponent}


  /*  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
    { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
    { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },

    { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
    { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
    { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
    { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
    { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
