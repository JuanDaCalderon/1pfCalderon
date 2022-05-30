import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { alumnosOutput, alumnosApi } from '../other/users';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  constructor(private http: HttpClient) { }
  getAlumnos() {
    return this.http.get <alumnosApi>('https://629415d0089f87a57ac8f2a2.mockapi.io/api/v1/alumnos')
      .pipe(
        map(data => {
          let alumnos: alumnosOutput[] = [];
          for (const id in data) {
            let alumno: alumnosOutput;
            alumno = {
              id: data[id].id,
              nombre: data[id].firstName + " " + data[id].middleName + " " + data[id].LastName,
              curso: data[id].curso,
              clases: data[id].clases,
              avatar: data[id].avatar
            };
            alumnos.push(alumno);
          }
          return alumnos
        }),
        catchError(err => {
          let message: string;
          message = 'Error intentando traer los alumnos, intenta más tarde'
          return throwError(() => message);
        })
      )
  }
}
