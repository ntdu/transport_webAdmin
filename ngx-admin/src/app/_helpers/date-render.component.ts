import { Component, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
    template: `
        {{ value |  date:'dd/MM/yyyy' }}
    `,
})
export class DateRenderComponent implements ViewCell {
    @Input() value: any;    // This hold the cell value
    @Input() rowData: any;  // This holds the entire row object

    ngOnInit(): void {
      
    }
}