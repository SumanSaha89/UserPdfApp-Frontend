import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { TableComponent } from '../table/table.component';
import { FormComponent } from '../form/form.component';
@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.css']
})
export class IntegrationComponent {
  userToEdit: User | null = null;

  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(FormComponent) formComponent: FormComponent;


  onEditUser(user: User): void {
    this.userToEdit = user;
    this.formComponent.loadUserData();
  }

  onUserSaved(): void {
    this.userToEdit = null;
    this.tableComponent.loadUsers(); // Reload the user list
  }
}
