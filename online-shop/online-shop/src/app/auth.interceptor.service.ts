import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


export class AuthInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler){
        const token = localStorage.getItem('token')
        if(token){
          const mod = req.clone({headers: req.headers.append('Authorization', localStorage.getItem('token'))})
          return next.handle(mod)
        } 
        return next.handle(req)

    }
    

}