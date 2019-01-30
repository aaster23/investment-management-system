import { ManageDialogResultModel } from './../../../models/manage-dialog-result.model';
import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-manage-dialog',
  templateUrl: './manage-dialog.component.html',
  styleUrls: ['./manage-dialog.component.css']
})

@Injectable()
export class ManageDialogComponent implements OnInit {

  private managerEmail: string;
  private clientEmail: string;
  private action: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
      this.action = this.data.action;
  }

  getDialogInfo(): ManageDialogResultModel {
    if (this.action === 'Assign Client') {
      return {
          client: this.clientEmail,
          manager: this.managerEmail,
      };
    }

    if (this.action === 'Unassign Manager') {
      return {
          manager: this.managerEmail,
      };
    }

    if (this.action === 'Unassign Client') {
      return {
          client: this.clientEmail,
      };
    }
  }
}
