import { Component, OnInit } from '@angular/core';
import { PdfService } from '../../services/pdf.service';
import { Pdf } from '../../models/pdf.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})
export class PdfViewComponent implements OnInit {
  pdfs: Pdf[];
  selectedPdfUrl: SafeResourceUrl | undefined;

  constructor(private pdfService: PdfService, private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
    this.loadPdfs();
  }

  loadPdfs(): void {
    this.pdfService.getPdfs().subscribe(
      (pdfs) => {
       this.pdfs = pdfs;
      },
      (error) => {
        console.error('Error loading PDFs:', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
  selectPdf(pdf: Pdf): void {
    this.pdfService.getPdf(pdf.id).subscribe(
      (pdfBlob: Blob) => {
        const objectURL = URL.createObjectURL(pdfBlob);
        this.selectedPdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectURL);
      },
      (error) => {
        console.error('Error loading PDF:', error);
      }
    );
  }

  downloadPdf(pdf: Pdf): void {
    this.pdfService.getPdf(pdf.id).subscribe(
      (pdfBlob: Blob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users_${pdf.id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading PDF:', error);
      }
    );
  }
}
