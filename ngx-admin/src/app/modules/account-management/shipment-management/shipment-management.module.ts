import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DateRenderComponent } from '../../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../../_helpers/gender-render.component';
import { NgSelect2Module } from 'ng-select2';
import { ChartModule } from 'angular2-chartjs';
import { NgxEchartsModule } from 'ngx-echarts';

import {
  NbCardModule,
  NbSpinnerModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbTabsetModule,
  NbMenuModule,
  NbDatepickerModule
} from '@nebular/theme';
import { ShipmentManagementRoutingModule, ShipmentManagementRoutedModule } from './shipment-management-routing.module'
import { ShipmentReportComponent } from './shipment-report/shipment-report.component';
// import { SelectEmployeeComponent } from './select-status/select-status.component';
// import { CreateCustomerAccountComponent } from './create-customer-account/create-customer-account.component';

@NgModule({
  declarations: [
    ...ShipmentManagementRoutedModule,
    ShipmentReportComponent,
    
    // DateRenderComponent,
    // GenderRenderComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbSpinnerModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule,
    NbTabsetModule,
    NbMenuModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    ShipmentManagementRoutingModule,
    NbDatepickerModule,
    ChartModule,
    NgSelect2Module,
    NgxEchartsModule
  ]
})
export class ShipmentManagementModule { }
