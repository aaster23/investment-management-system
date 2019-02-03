import { AppConfig } from './../../config/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable, OnInit, Input, Output, EventEmitter, Inject, NgZone, AfterViewInit, OnDestroy, } from '@angular/core';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.useTheme(am4themes_animated);
@Injectable()
@Component({
    selector: 'app-charts',
    templateUrl: './charts.service.component.html',
    styleUrls: ['./charts.service.component.css']
})
export class ChartsServiceComponent implements OnInit, AfterViewInit, OnDestroy {
    private chart: am4charts.XYChart;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private zone: NgZone,
        private http: HttpClient,
        private appConfig: AppConfig,
    ) {

    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        const currentdate = new Date().toJSON();
        // const date = currentdate.slice(0, 10).concat(' ', currentdate.slice(11, 19));
        const body = { abbr: this.data.stock };
        console.log(body);

        const chart = am4core.create('chartdiv', am4charts.XYChart);
        chart.paddingRight = 20;

        chart.dateFormatter.inputDateFormat = 'YYYY-MM-dd HH:mm:ss';

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;

        const series = chart.series.push(new am4charts.CandlestickSeries());
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'close';
        series.dataFields.openValueY = 'open';
        series.dataFields.lowValueY = 'low';
        series.dataFields.highValueY = 'high';
        series.simplifiedProcessing = true;
        series.tooltipText = 'Open: ${openValueY.value}\nLow: ${lowValueY.value}\nHigh: ${highValueY.value}\nClose: ${valueY.value}';

        chart.cursor = new am4charts.XYCursor();

        // a separate series for scrollbar
        const lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.dateX = 'date';
        lineSeries.dataFields.valueY = 'close';
        // need to set on default state, as initially series is 'show'
        lineSeries.defaultState.properties.visible = false;

        // hide from legend too (in case there is one)
        lineSeries.hiddenInLegend = true;
        lineSeries.fillOpacity = 0.5;
        lineSeries.strokeOpacity = 0.5;

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(lineSeries);
        chart.scrollbarX = scrollbarX;
        this.http.post(`${this.appConfig.apiUrl}/prices/company`, body).subscribe((res: []) => {
            chart.data = res.slice(0, 100);
            console.log(res.slice(0,1000))
        });
    }
    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }
}
