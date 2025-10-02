import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Erro desconhecido';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Erro: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = 'Requisição inválida';
              break;
            case 401:
              errorMessage = 'Não autorizado';
              this.router.navigate(['/login']);
              break;
            case 403:
              errorMessage = 'Acesso negado';
              break;
            case 404:
              errorMessage = 'Recurso não encontrado';
              break;
            case 500:
              errorMessage = 'Erro interno do servidor';
              break;
            default:
              errorMessage = `Erro ${error.status}: ${error.message}`;
          }
        }

        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });

        return throwError(() => error);
      })
    );
  }
}