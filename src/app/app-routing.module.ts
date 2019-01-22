import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GameViewComponent} from './game-view/game-view.component';
import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth/login'},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'profile', loadChildren: './profile/profile.module#ProfileModule', canActivate: [AuthGuard]},
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
