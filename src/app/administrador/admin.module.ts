import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from '../home-admin/home-admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { AgremiadoComponent } from './agremiado/agremiado.component';
import { VeragremiadoComponent } from './veragremiado/veragremiado.component';
import { SolicitudComponent } from './solicitud/solicitud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditaragremiadoComponent } from './editaragremiado/editaragremiado.component';
import { AuthGuardAdministrador } from '../guards/auth-administrador.guard';

const routes: Routes = [

  {
    path: 'homeadmin',
    component: HomeAdminComponent, children: [
      {
        path: '',
        component: InicioComponent,
        canActivate: [AuthGuardAdministrador],
       //canActivate: [AdmingGuard] // child route component that the router renders
      },
      { path: 'agremiado', component: AgremiadoComponent, canActivate: [AuthGuardAdministrador] },
      { path: 'veragremiado', component: VeragremiadoComponent, canActivate: [AuthGuardAdministrador] },
      { path: 'solicitud', component: SolicitudComponent, canActivate: [AuthGuardAdministrador] },
      {
        path: '**',
        redirectTo: ''
      }
    ],
  }
]



@NgModule({
  declarations: [
    InicioComponent,
    AgremiadoComponent,
    VeragremiadoComponent,
    SolicitudComponent,
    EditaragremiadoComponent 

  ],
  imports: [
    
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    InicioComponent,
    AgremiadoComponent,
    VeragremiadoComponent,
    SolicitudComponent 

  ]
})
export class AdminModule { }
