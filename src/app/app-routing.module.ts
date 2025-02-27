import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionsComponent } from './questions/questions.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {
    path:'',redirectTo:'welcome',pathMatch:"full"

  },
  {
    path:"header",component:HeaderComponent
  },
  {
    path:"welcome",component:WelcomeComponent
  },
  {
    path:"questions",component:QuestionsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
