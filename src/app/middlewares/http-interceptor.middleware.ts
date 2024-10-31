// JwtInterceptorService

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../features/user-auth/services/auth.service';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const securityService = inject(AuthService);

  const authToken = securityService.getToken();

  if (authToken) {
    // Clone the request and add the authorization header
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // Pass the cloned request with the updated header to the next handler
  return next(req);
};
