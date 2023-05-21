// import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
// import { catchError, switchMap, throwError } from "rxjs";
// import { inject } from "@angular/core";
//
// import { ActionAuthLogout, ActionAuthRefresh, AuthStateModel } from "../state";
//
// let isRefreshed = false;
//
// const setAuthorizationHeader = (req: HttpRequest<unknown>, access: string) => {
//   return req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${access}`
//     },
//     withCredentials: true
//   });
// }
//
// const handle401Error: HttpInterceptorFn = (req, next) => {
//   if (!isRefreshed) {
//     isRefreshed = true;
//     const store = inject(Store);
//     const isLoggedIn = store.selectSnapshot<AuthStateModel>('auth').token;
//     if (isLoggedIn) {
//       return store.dispatch(new ActionAuthRefresh).pipe(
//         switchMap(access => {
//           isRefreshed = false;
//           const authorized = setAuthorizationHeader(req, access);
//           return next(authorized);
//         }),
//         catchError(err => {
//           isRefreshed = false;
//           if (err.status == 403) {
//             store.dispatch(new ActionAuthLogout)
//           }
//           return throwError(() => err)
//         })
//       );
//     }
//   }
//   return next(req);
// }
//
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req).pipe(
//     catchError(err => {
//       if (err instanceof HttpErrorResponse && err.status === 401 && !isRefreshed) {
//         return handle401Error(req, next);
//       }
//       return throwError(() => err);
//     })
//   );
// };
