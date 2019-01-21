import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared-material.module';
import { HeaderComponent } from './header/header.component';

const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
];

@NgModule({
    declarations: [HeaderComponent],
    imports: [...modules, SharedMaterialModule],
    exports: [...modules, HeaderComponent],
})
export class SharedModule { }
