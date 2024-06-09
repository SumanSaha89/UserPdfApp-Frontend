import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pdf } from '../models/pdf.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private apiUrl = 'http://localhost:3000/pdfs'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  generatePdf(): Observable<Pdf> {
    return this.http.post<Pdf>(`${this.apiUrl}`, {});
  }

  getPdfs(): Observable<Pdf[]> {
    return this.http.get<Pdf[]>(this.apiUrl);
  }

  getPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'blob' });
  }

  getLatestPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/latest/download`, { responseType: 'blob' });
  }
}
