
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ManageService } from 'src/app/core/manage.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private manageService: ManageService,
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
    this.manageService.assignClient(email, manager_email);
  }

  private unassignManagerFromUsers() {
    const manager_email = this.manageForm.controls.managerEmail.value;
    this.manageService.unassignManagerFromUsers(manager_email);
  }
}
