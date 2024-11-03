import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecurityComponent } from './components/security-viewer/security-viewer.component';
import { HttpClientModule } from '@angular/common/http';

//Mat Materials
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule, MatChipGrid, MatChipRow } from '@angular/material/chips';

//Other
import { NgxChartsModule }from '@swimlane/ngx-charts';  
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


@NgModule({
  declarations: [
    AppComponent,
    SecurityComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatProgressBar,
    MatLabel,
    MatFormField,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIcon,
    FormsModule,
    MatDivider,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgxChartsModule,
    MatChipsModule,
    MatChipGrid,
    MatChipRow
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
