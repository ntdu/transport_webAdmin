import { Injectable } from '@angular/core';
import { ApiClientService } from '../../../config/api-client.service';

@Injectable({
  providedIn: 'root'
})
export class ShipmentManagementService extends ApiClientService {
  list_api = [
    { key: 'shipmentReportTenDays', link: 'administrations/shipment-report-ten-days' },
    { key: 'newAccountBySixMonth', link: 'administrations/new-account-by-six-month' },
    { key: 'getTopAccount', link: 'administrations/get-top-account' }
  ]
}
