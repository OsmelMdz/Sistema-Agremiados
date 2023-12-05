import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  url: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getVersolicitud(): Observable<any>{
    return this.http.get<any>(this.url+'/obtenerSolicitud');
  }
  agregarSolicitud(nuevaSolicitud: any): Observable<any> {
    const url = `${this.url}/agregarsolicitud`;
    return this.http.post<any>(url, nuevaSolicitud);
  }
  descargarArchivo(nombreArchivo: string): Observable<Blob> {
    const url = `${this.url}/app/public/ruta_del_archivo/${nombreArchivo}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
