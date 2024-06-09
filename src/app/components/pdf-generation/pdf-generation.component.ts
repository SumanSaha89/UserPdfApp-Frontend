import { Component } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pdf-generation',
  templateUrl: './pdf-generation.component.html',
  styleUrls: ['./pdf-generation.component.css']
})
export class PdfGenerationComponent {
  constructor(private pdfService: PdfService) { }

  generatePdf(): void {
    this.pdfService.generatePdf().subscribe(
      (res) => {
        Swal.fire({
          text: 'PDF generated successfully!',
          icon: 'info',
          showCancelButton: false
        })
        // Handle successful response
        console.log('PDF generated successfully:', res);
      },
      (error) => {
        // Handle error
        console.error('Error generating PDF:', error);
      }
    );
  }
}
