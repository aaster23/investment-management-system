import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ManageService } from 'src/app/core/manage.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/core/notification.service';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
@Injectable()
export class ManageComponent implements OnInit {
  private manageForm: FormGroup;

  private userEmail: AbstractControl;
  private managerEmail: AbstractControl;

  private selectedForm: string;
  private credentialsError: string = null;

  private notificationservice: NotificationService;

  constructor(
    private formBuilder: FormBuilder,
    private manageService: ManageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.manageForm = this.formBuilder.group({
      userEmail: ['', Validators.pattern('.+\@.+\..+')],
      managerEmail: ['', Validators.pattern('.+\@.+\..+')],
    });
    this.userEmail = this.manageForm.get('userEmail');
    this.managerEmail = this.manageForm.get('managerEmail');
  }

  private unassignClient() {
    const email = this.manageForm.controls.userEmail.value;
    this.manageService.unassignClient(email);
  }

  private assignClient() {
    const email = this.manageForm.controls.userEmail.value;
    const manager_email = this.manageForm.controls.managerEmail.value;
    this.onActionSelect('Assign Client');
    // this.manageService.assignClient(email, manager_email);
    // this.manageService.selectedEvent('assignClient');
  }

  private unassignManagerFromUsers() {
    const manager_email = this.manageForm.controls.managerEmail.value;
    this.manageService.unassignManagerFromUsers(manager_email);
  }

  onActionSelect(action) {
    const dialogRef = this.dialog.open(ManageDialogComponent,
        {
            data: {
                action
            }
        });

    dialogRef.afterClosed().subscribe((result) => {
          return this.notificationservice.openSnackBar('Invalid unit or price', 'OK', 'red');
        })
  }
}
