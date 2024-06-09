import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { IntegrationComponent } from './components/integration/integration.component';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfGenerationComponent } from './components/pdf-generation/pdf-generation.component'; // Add this line

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    IntegrationComponent,
    PdfViewComponent,
    SafeUrlPipe,
    PdfGenerationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
