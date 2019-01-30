import { ManageDialogComponent } from './manage-dialog/manage-dialog.component';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ManageService } from 'src/app/core/manage.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from 'src/app/core/notification.service';
import { ManageDialogResultModel } from 'src/app/models/manage-dialog-result.model';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
@Injectable()
export class ManageComponent implements OnInit {

  constructor(
    private manageService: ManageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  private unassignClient() {
    this.onActionSelect('Unassign Client').subscribe((result: ManageDialogResultModel) => {
      if (result) {
      this.manageService.unassignClient(result.client);
      }
    });
  }

  private assignClient() {
    this.onActionSelect('Assign Client').subscribe((result: ManageDialogResultModel) => {
      if (result) {
      this.manageService.assignClient(result.client, result.manager);
      }
    });
  }

  private unassignManagerFromUsers() {
    this.onActionSelect('Unassign Manager').subscribe((result: ManageDialogResultModel) => {
      if (result) {
      this.manageService.unassignManagerFromUsers(result.manager);
      }
    });
  }

   onActionSelect(action) {
    const dialogRef = this.dialog.open(ManageDialogComponent,
        {
            data: {
                action
            }
        });

    return dialogRef.afterClosed();
  }
}
