import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgremiadoService {

  url: string = 'http://localhost:8000/api';

  token: any = '';
  user: any = {};
  datos: any;



  constructor(private http: HttpClient) {

}



getVerAagremido(): Observable<any>{
  return this.http.get<any>(this.url+'/obtenerAgremiados');
}

eliminarAgremiado(id: number): Observable<any> {
  return this.http.delete<any>(`${this.url}/eliminarAgremiado/${id}`);
}

actualizarAgremiado(id: number, datosActualizados: any): Observable<any> {
  return this.http.patch<any>(`${this.url}/actualizarAgremiado/${id}`, datosActualizados);
}

agregarAgremiado(datosNuevoAgremiado: any): Observable<any> {
  return this.http.post<any>(`${this.url}/agregarAgremiado`, datosNuevoAgremiado);
}

private apiUrl = 'http://localhost:8000/api/agregarAgremiado';


agregarAgremiado2(agremiadoData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(this.apiUrl, agremiadoData, { headers });
}


}


