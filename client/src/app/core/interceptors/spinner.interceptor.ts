import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService) { }

    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.spinner.show();

        // when the request finishes, wait for a second and hide the spinner
        return next.handle(req).pipe(
            delay(1000),
            finalize(() => this.spinner.hide())
        );
    }
}
