import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SalesRoutingModule } from './sales-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SalesRoutingModule, HttpClientModule],
})
export class SalesModule {}
