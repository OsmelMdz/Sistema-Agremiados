import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:8000/api/';
  constructor(private http: HttpClient, private router: Router) { }

  login(NUE: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
      NUE: NUE,
      password: password
    };

    return this.http.post('http://localhost:8000/api/login', body, { headers: headers });
  }



  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    
   
  }

  
}
