import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const tokenItem = localStorage.getItem("token")
      console.log('#####', this.router.url);
      // if(tokenItem){
      //   this.router.navigate(['/app/dashboard/default'])
      // }  

      if(!tokenItem){
        this.router.navigate(['/auth/modern/signin'])
      }
    return true;
  }
  
}
