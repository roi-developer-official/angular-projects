import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = JSON.parse(localStorage.getItem('token'))

        if(token){
          const mod = req.clone({headers: req.headers.append('Authorization', token.token)})
          return next.handle(mod)
        } 
        return next.handle(req)

    }
    

}