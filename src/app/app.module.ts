import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormatosComponent } from './formatos/formatos.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { AdminModule } from './administrador/admin.module';
import { UsuarioComponent } from './usuario/usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeAdminComponent,
    FormatosComponent,
    ConvocatoriasComponent,
    ConveniosComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterLink ,
    ReactiveFormsModule,
    RouterModule,
    AdminModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
