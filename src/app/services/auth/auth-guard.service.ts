import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    let returnUrl = '';
    if (route.children != null && route.children.length > 0) {
      route.children[0].url.forEach(segment => {
        returnUrl = returnUrl + '/' + segment;
      });
    }
    if (returnUrl === '/about-us' || returnUrl === '/legal-privacy'
      || returnUrl.includes('/faq-detail')
      || returnUrl === '/term-condition' || returnUrl === '/help') {
      return true;
    }
    // if (!this.authService.isAuthenticated()) {
    //   this.router.navigate(['login'], { queryParams: { returnUrl } });
    //   return false;
    // }
    return true;
  }
}