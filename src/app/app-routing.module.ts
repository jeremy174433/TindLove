import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
  { path: 'details', loadChildren: './pages/details/details.module#DetailsPageModule', canActivate: [AuthGuard] },
  { path: 'sign-in', loadChildren: './pages/sign-in/sign-in.module#SignInPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
