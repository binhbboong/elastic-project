import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()

export class CommonInterceptor implements HttpInterceptor {
  count: number = 0;
  constructor(
    private spinner: NgxSpinnerService
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.count++;

    if (this.count === 1) {
      this.spinner.show();
    }
    let headers = new HttpHeaders();
    request = request.clone({
      headers
    })

    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.count--;
            if (this.count === 0) {
              this.spinner.hide();
            }
          }
        }, (err: any) => {
          this.spinner.hide();
        })
      );
  }
}