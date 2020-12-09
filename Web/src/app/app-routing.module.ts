import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { FinishComponent } from './content/finish/finish.component';
import { MeditationComponent } from './content/meditation/meditation.component';
import { PsyComponent } from './content/psy/psy.component';

const routes: Routes = [
  {path: '', component: ContentComponent},
  {path: 'meditation', component: MeditationComponent},
  {path: 'psy', component: PsyComponent},
  {path: 'finish', component: FinishComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
