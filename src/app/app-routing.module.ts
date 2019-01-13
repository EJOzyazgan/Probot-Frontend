import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GameViewComponent} from './game-view/game-view.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'register', loadChildren: './register/register.module#RegisterModule'},
  {path: 'game-view', component: GameViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutingComponents = [GameViewComponent];
