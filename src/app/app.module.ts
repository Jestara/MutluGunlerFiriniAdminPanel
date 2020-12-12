import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { UserComponent } from './Pages/user/user.component';
import {HttpClientModule} from '@angular/common/http';
import {Service} from './Services/service';
import { CategoryComponent } from './Pages/category/category.component';
import { ProductComponent } from './Pages/product/product.component';
import { ProductDetailComponent } from './Pages/product-detail/product-detail.component';
import {CategoryDetailComponent} from './Pages/category-detail/category-detail.component';
import { MenuComponent } from './Pages/menu/menu.component';
import { MenuDetailComponent } from './Pages/menu-detail/menu-detail.component';
import {MaterialModule} from './Module/material/material.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import { DialogComponent } from './Dialogs/dialog/dialog.component';
import {ToastrModule} from "ngx-toastr";
import {MatSortModule} from "@angular/material/sort";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    UserComponent,
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    CategoryDetailComponent,
    MenuComponent,
    MenuDetailComponent,
    DialogComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        HttpClientModule,
        MaterialModule,
        ImageCropperModule,
        ToastrModule.forRoot(),
        MatSortModule
    ],
  providers: [ThemeService, Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
