import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MainComponent } from './components/pages/main/main.component';
import { NavControlComponent } from './components/nav-control/nav-control.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { HowToDisplayComponent } from './components/how-to-display/how-to-display.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent,
    NavControlComponent,
    HowToComponent,
    HowToDisplayComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
