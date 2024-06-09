import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { PdfGenerationComponent } from '../pdf-generation/pdf-generation.component'; // Import the PdfGenerationComponent
import { PdfService } from '../../services/pdf.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  users: User[] = [];
  @Output() editUserEvent = new EventEmitter<User>(); // Output property to emit the user to be edited
  @ViewChild(PdfGenerationComponent) pdfGenerationComponent: PdfGenerationComponent; // ViewChild for PdfGenerationComponent

  constructor(private userService: UserService, private pdfService: PdfService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
        console.log(`User with id ${id} deleted successfully`);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  editUser(user: User): void {
    this.editUserEvent.emit(user); // Emit the user to be edited
  }

  downloadPdf(): void {
    this.pdfService.getLatestPdf().subscribe(
      (pdfBlob: Blob) => {
        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading PDF:', error);
      }
    );
  }

  navigateToViewPDF() {
    this.router.navigate(['/view-pdf']);
  }
}
