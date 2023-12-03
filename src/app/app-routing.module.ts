import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormatosComponent } from './formatos/formatos.component';
import { ConvocatoriasComponent } from './convocatorias/convocatorias.component';
import { ConveniosComponent } from './convenios/convenios.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AuthGuardAgremiado } from './guards/auth-agremiado.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'formato', component: FormatosComponent },
  { path: 'convocatoria', component: ConvocatoriasComponent },
  { path: 'convenio', component: ConveniosComponent },
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuardAgremiado]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'ha',
    loadChildren: () => import('./administrador/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }

