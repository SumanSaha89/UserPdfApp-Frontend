import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegrationComponent } from './components/integration/integration.component';
import { PdfViewComponent } from './components/pdf-view/pdf-view.component';

const routes: Routes = [
  { path: '', component: IntegrationComponent },
  { path: 'view-pdf', component: PdfViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
