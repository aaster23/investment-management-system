import { NgModule } from '@angular/core';
import {
    MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule, MatSnackBarModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule,
        MatCheckboxModule, MatToolbarModule, FormsModule, MatCardModule, MatFormFieldModule,
        MatInputModule, MatListModule, MatRadioModule, MatSnackBarModule,
    ],

    exports: [MatNativeDateModule, FormsModule,
        MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule,
        MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule, MatSnackBarModule,
    ],

})

export class SharedMaterialModule { }
