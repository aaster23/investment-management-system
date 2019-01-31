import { CommonModule } from '@angular/common';
import { HttpClientModule, } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared-material.module';
import { HeaderComponent } from './header/header.component';
import { AgGridModule } from 'ag-grid-angular';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AgGridModule
];

@NgModule({
    declarations: [HeaderComponent],
    imports: [...modules, SharedMaterialModule,
    ],
    exports: [...modules, HeaderComponent,
    ]
})
export class SharedModule { }
