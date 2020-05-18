import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MainComponent } from './components/pages/main/main.component';
import { NavControlComponent } from './components/nav-control/nav-control.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { HowToDisplayComponent } from './components/how-to-display/how-to-display.component';
import { HowToCreatorComponent } from './components/how-to-creator/how-to-creator.component';
import { TextFieldComponent } from './components/Input/text-field/text-field.component';
import { InputAreaComponent } from './components/Input/input-area/input-area.component';
import { MultiLineToJsonComponent } from './components/Input/multi-line-to-json/multi-line-to-json.component';
import { InputMultilineComponent } from './components/Input/input-multiline/input-multiline.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent,
    NavControlComponent,
    HowToComponent,
    HowToDisplayComponent,
    HowToCreatorComponent,
    TextFieldComponent,
    InputAreaComponent,
    MultiLineToJsonComponent,
    InputMultilineComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
