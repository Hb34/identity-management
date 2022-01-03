import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSelectModule} from "@angular/material/select";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  providers:[
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500, verticalPosition: 'top'}}
  ]
})
export class AppMaterialModule { }
