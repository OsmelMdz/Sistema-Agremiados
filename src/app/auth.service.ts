import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInFlag: boolean = false; // Un ejemplo de la bandera que indica si el usuario está autenticado

  constructor() { }

  //seteamos el token
  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

    //obtenemos el token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  //eliminamos el token
  public removeToken(): void {
    localStorage.removeItem('token');
  }

  //seteamos el user
  public setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //obtenemos el user
  public getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  //eliminamos el user
  public removeUser(): void {
    localStorage.removeItem('user');
  }

  //si estamos logeados
  public isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  //verficamos si estamos logeados
  public setLoggedInFlag(flag: boolean): void {
    this.isLoggedInFlag = flag;
}

}
