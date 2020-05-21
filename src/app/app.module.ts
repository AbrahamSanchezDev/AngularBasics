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
import { TopicCreatorComponent } from './components/topic-creator/topic-creator.component';
import { TextFieldComponent } from './components/Input/text-field/text-field.component';
import { InputAreaComponent } from './components/Input/input-area/input-area.component';
import { MultiLineToJsonComponent } from './components/Input/multi-line-to-json/multi-line-to-json.component';
import { InputMultilineComponent } from './components/Input/input-multiline/input-multiline.component';
import { TopicObjModule } from './model/topic-obj/topic-obj.module';
import { CodeDisplayComponent } from './components/Display/code-display/code-display.component';
import { ToolsComponent } from './components/pages/tools/tools/tools.component';
import { TopicSearchComponent } from './components/topic-search/topic-search.component';
import { AddTextComponent } from './components/Input/add-text/add-text.component';
import { TopicSimpleCreatorComponent } from './components/topic-simple-creator/topic-simple-creator.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MainComponent,
    NavControlComponent,
    HowToComponent,
    HowToDisplayComponent,
    TopicCreatorComponent,
    TextFieldComponent,
    InputAreaComponent,
    MultiLineToJsonComponent,
    InputMultilineComponent,
    CodeDisplayComponent,
    ToolsComponent,
    TopicSearchComponent,
    AddTextComponent,
    TopicSimpleCreatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TopicObjModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
