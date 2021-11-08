import { Component, OnInit } from '@angular/core';
import { ShipmentManagementService } from '../shipment-management.service';
import { DateRenderComponent } from '../../../../_helpers/date-render.component';
import { GenderRenderComponent } from '../../../../_helpers/gender-render.component';
import { ToastrService } from '../../../../_helpers/toastrService';
import { NbThemeService, NbColorHelper, NbDialogService } from '@nebular/theme';
import { StringHelpers } from '../../../../_helpers/string-helpers'

@Component({
  selector: 'ngx-shipment-report',
  styleUrls: ['./shipment-report.component.scss'],
  templateUrl: './shipment-report.component.html',
})
export class ShipmentReportComponent implements OnInit {

  total_numbers: any = {};
  chart_colors: any;
  chart_js: any;
  echarts: any;

  sales_order_data: any;
  data2: any;
  data3: any;
  stacked_chart_options: any;
  chart_options: any;
  piechart_options: any;
  themeSubscription: any;

  constructor(
    private toastrService: ToastrService,
		private shipmentManagementService: ShipmentManagementService,
    private dialogService: NbDialogService,
    private theme: NbThemeService,
    private stringHelpers: StringHelpers
	) { }

  loading = false;
  source: any;

	ngOnInit(): void {
    this.loadChartConfig();
    this.loadSalesOrder();
    this.loadNewAccount();
    this.loadTopAccount();
	}

  loadChartConfig() : void {
    let _this = this;

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      this.chart_colors = config.variables;
      this.chart_js = config.variables.chartjs;
      this.echarts = config.variables.echarts;
    });

    this.chart_options = {
      tooltipTemplate: "<%= addCommas(value) %>",
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display: true,
            color: this.chart_js.axisLineColor,
          },
          ticks: {
            fontColor: this.chart_js.textColor,
          },
        }],
        yAxes: [{
          gridLines: {
            display: true,
            color: this.chart_js.axisLineColor,
          },
          ticks: {
            fontColor: this.chart_js.textColor,
            callback: function (value) {
              return _this.stringHelpers.numberFormat(value);
            }
          },
        }],
      },
      legend: false,
    };
    
    this.stacked_chart_options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: _this.chart_js.textColor,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: _this.chart_js.axisLineColor,
            },
            ticks: {
              fontColor: _this.chart_js.textColor,
            },
            stacked: true
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: _this.chart_js.axisLineColor,
            },
            ticks: {
              fontColor: _this.chart_js.textColor,
            },
            stacked: true
          },
        ],
      },
    };

  }

  loadSalesOrder(): void {
    let _this = this;
    let stackedchart_color = [
      _this.chart_colors.dangerLight,
      _this.chart_colors.warningLight,
      _this.chart_colors.primaryLight, 
      _this.chart_colors.infoLight, 
      _this.chart_colors.successLight,
    ]; 

    this.shipmentManagementService.httpGet('shipmentReportTenDays', function(response) {
      console.log(response.data)
      _this.sales_order_data = {
        labels: response.data.list_date.map(d => { let date = new Date(d); return date.getDate() + '/' + (date.getMonth() + 1); }),
        datasets: []
      };

      let i = 0;
      response.data.list_data.forEach(function(item) {
        if (item.status != 'Hủy') {
          _this.sales_order_data.datasets.push({
            data: item.data,
            label: item.status,
            backgroundColor: NbColorHelper.hexToRgbA(stackedchart_color[i++], 0.8)
          });
        }
      });

    }, function() { })
  }

  loadNewAccount() : void {
    let _this = this;

    this.shipmentManagementService.httpGet('newAccountBySixMonth', function(response) {
      let chart_labels = [];
      let chart_datas = [];
      response.data.forEach(item => {
        chart_labels.push(item.month);
        chart_datas.push(item.num_new_account); 
      });

      _this.data2 = {
        labels: chart_labels,
        datasets: [{
          data: chart_datas,
          label: '',
          backgroundColor: NbColorHelper.hexToRgbA(_this.chart_colors.infoLight, 0.8),
        }],
      };
    }, function() { })
  }

  loadTopAccount() : void {
    let _this = this;
    let piechart_color = [
      _this.chart_colors.primaryLight, 
      _this.chart_colors.successLight,
      _this.chart_colors.infoLight, 
      _this.chart_colors.warningLight,
      _this.chart_colors.dangerLight,
    ];
    
    this.shipmentManagementService.httpGet('getTopAccount', function(response) {
      console.log(response.data)
      response.data.sort((a, b) => (a.total_money < b.total_money) ? 1 : -1);
      let chart_labels = [];
      let chart_datas = [];
      let others = 0;

      for (let i=0; i<response.data.length; i++) {
        if (i < 4) {
          chart_labels.push(response.data[i].account);
          chart_datas.push({
            value: Math.round(response.data[i].total_money / 1000000),
            name: response.data[i].account
          });
        }
        else 
          others += Math.round(Number(response.data[i].total_money) / 1000000);
      }

      chart_labels.push("Khác");
      chart_datas.push({
        value: others,
        name: 'Khác'
      });

      _this.piechart_options = {
        backgroundColor: _this.echarts.bg,
        color: piechart_color,
        tooltip: {
          trigger: 'item',
          formatter: '{b} <br/>{c} triệu đồng ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: chart_labels,
          textStyle: {
            color: _this.echarts.textColor,
          },
        },
        series: [
          {
            name: 'Khách hàng',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: chart_datas,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: _this.echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: _this.echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: _this.echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };

    }, function() { })
  }
}
