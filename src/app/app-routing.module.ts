import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {GameViewComponent} from './game-view/game-view.component';
import {AuthGuard} from './guards/auth.guard';
import {BracketViewComponent} from './bracket-view/bracket-view.component';
import {TournamentManagerComponent} from './tournament-manager/tournament-manager.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'landing-pages'},
  {path: 'landing-pages', loadChildren: () => import('./landing-pages/landing-pages.module').then(m => m.LandingPagesModule)},
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'platform', loadChildren: () => import('./platform/platform.module').then(m => m.PlatformModule), canActivate: [AuthGuard]}
  // {path: 'game-view', component: GameViewComponent},
  // {path: 'bracket-view', component: BracketViewComponent},
  // {path: 'tournament-manager', component: TournamentManagerComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules, useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const RoutingComponents = [GameViewComponent, BracketViewComponent, TournamentManagerComponent];
