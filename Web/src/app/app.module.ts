import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ContentComponent } from './content/content.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserActionsComponent } from './header/user-actions/user-actions.component';
import { NavBarComponent } from './header/nav-bar/nav-bar..component';
import { MaterialBlockModule } from './shared/material-block.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MeditationComponent } from './content/meditation/meditation.component';
import { PsyComponent } from './content/psy/psy.component';
import { FinishComponent } from './content/finish/finish.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    LogoComponent,
    NavBarComponent,
    UserActionsComponent,
    MeditationComponent,
    PsyComponent,
    FinishComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexModule,
    FlexLayoutModule,
    MaterialBlockModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
