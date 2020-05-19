import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ToolsComponent } from './components/pages/tools/tools/tools.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'about', component: AboutComponent },
  { path: 'tools', component: ToolsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
