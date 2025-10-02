import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Não adicionar token para requisições de autenticação
    if (req.url.includes('/auth/') || req.url.includes('keycloak')) {
      return next.handle(req);
    }

    return from(this.keycloakService.getAuthHeaders()).pipe(
      switchMap(headers => {
        if (headers['Authorization']) {
          const authReq = req.clone({
            setHeaders: headers
          });
          return next.handle(authReq);
        }
        return next.handle(req);
      })
    );
  }
}