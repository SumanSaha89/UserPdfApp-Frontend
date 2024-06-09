import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {
  userForm: FormGroup;
  @Input() userToEdit: User | null = null; // Input property to receive the user to edit
  @Output() userSaved = new EventEmitter<void>(); // Output event to notify the parent component

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userToEdit && changes.userToEdit.currentValue) {
      this.loadUserData();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.userToEdit) {
      this.loadUserData();
    }
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  loadUserData(): void {
    // if (this.userToEdit) {
      this.userForm.patchValue({
        name: this.userToEdit.name,
        email: this.userToEdit.email,
        phoneNumber: this.userToEdit.phoneNumber,
        address: this.userToEdit.address
      });
    // }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    if (this.userToEdit) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    const user: User = this.userForm.value;
    this.userService.createUser(user).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.userForm.reset();
        this.userSaved.emit(); // Emit the userSaved event
        Swal.fire({
          text: 'User created successfully!',
          icon: 'info',
          showCancelButton: false
        })
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  updateUser(): void {
    if (!this.userToEdit || !this.userToEdit.id) {
      console.error('User to edit does not have an ID.');
      return;
    }

    const updatedUser: User = { ...this.userToEdit, ...this.userForm.value, id: this.userToEdit.id }; // Ensure id is included
    this.userService.updateUser(updatedUser.id, updatedUser).subscribe( // Pass the user ID and updated data
      (response) => {
        console.log('User updated successfully:', response);
        this.userForm.reset();
        this.userToEdit = null; // Clear the userToEdit after updating
        this.userSaved.emit(); // Emit the userSaved event
        Swal.fire({
          text: 'User updated successfully!',
          icon: 'info',
          showCancelButton: false
        })
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
