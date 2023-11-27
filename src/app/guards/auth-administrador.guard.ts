import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdministrador implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const user = this.authService.getUser();

    if (token && user && user.id_rol === 1) {
      return true;
    } else {
      console.error('Acceso denegado: Rol no reconocido o no autenticado como administrador');
      return false;
    }
  }

}