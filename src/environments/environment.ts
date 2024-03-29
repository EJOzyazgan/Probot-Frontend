// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/',
  domain: 'localhost:3000',
  userTokenKey: 'probot-user-token',
  userTokenExpire: 'probot-user-expire',
  userRefreshToken: 'probot-user-refresh',
  paypalClientId: 'AXPXM6dI9D_hYhI3J7uKVw-OxSrGvF6U3AC5-vO9xEhulXx5Zfv6i6aIDwkgEUmtk_EE9Gk2hjN4Lzt1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
