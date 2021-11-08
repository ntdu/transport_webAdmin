import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipmentReportComponent } from './shipment-report/shipment-report.component';

export const ShipmentManagementRoutedModule = [
    ShipmentReportComponent
]
const routes: Routes = [
    {
        path: '',
        redirectTo: 'shipment-report',
        pathMatch: 'full'
    },
    {
        path: 'shipment-report',
        component: ShipmentReportComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShipmentManagementRoutingModule { }
