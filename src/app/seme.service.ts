import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Seme } from './seme';
import { Semina } from './Semina';

@Injectable({ providedIn: 'root' })

export class SemeService {
  private semiUrl = 'http://localhost:3000/api/semi';
  private seminaUrl = 'http://localhost:3000/api/semina';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      alert('Errore: ' + error.error);

      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getSemi(): Observable<Seme[]> {
    return this.http.get<Seme[]>(this.semiUrl)
      .pipe(
        catchError(this.handleError<Seme[]>('getSemi', []))
      );
  }

  getSemine(): Observable<Semina[]> {
    return this.http.get<Semina[]>(this.seminaUrl)
      .pipe(
        catchError(this.handleError<Semina[]>('getSemine', []))
      );
  }

  getSemineCon(date: string[]): Observable<Semina[]> {
    return this.http.put<Semina[]>(this.seminaUrl, date, this.httpOptions)
      .pipe(
        catchError(this.handleError<Semina[]>(`getSemine date=${date}`, []))
      );
  }

  getSemeNo404<Data>(nome: string): Observable<Seme> {
    const url = `${this.semiUrl}/?nome=${nome}`;
    return this.http.get<Seme[]>(url)
      .pipe(
        map(semi => semi[0]),
        catchError(this.handleError<Seme>(`getSeme nome=${nome}`))
      );
  }

  getSeme(nome: string): Observable<Seme> {
    const url = `${this.semiUrl}/${nome}`;
    return this.http.get<Seme>(url).pipe(
      catchError(this.handleError<Seme>(`getSeme nome=${nome}`))
    );
  }


  searchSemi(term: string): Observable<Seme[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Seme[]>(`${this.semiUrl}/?nome=${term}`).pipe(
      catchError(this.handleError<Seme[]>('searchSemi', []))
    );
  }

  addSeme(seme: Seme): Observable<Seme> {
    return this.http.post<Seme>(this.semiUrl, seme, this.httpOptions).pipe(
      catchError(this.handleError<Seme>('addSeme'))
    );
  }

  addSemina(semina: Semina): Observable<Semina> {
    return this.http.post<Semina>(this.seminaUrl, semina, this.httpOptions).pipe(
      catchError(this.handleError<Semina>('addSemina'))
    );
  }

  deleteSeme(seme: Seme | string): Observable<Seme> {
    const nome = typeof seme === 'string' ? seme : seme.nome;
    const url = `${this.semiUrl}/${nome}`;
    return this.http.delete<Seme>(url, this.httpOptions).pipe(
      catchError(this.handleError<Seme>('deleteSeme'))
    );
  }

  updateSeme(seme: Seme): Observable<any> {
    return this.http.put(this.semiUrl, seme, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateSeme'))
    );
  }
}