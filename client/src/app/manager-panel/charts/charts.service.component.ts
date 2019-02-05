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
        const body = { abbr: this.data.stock };

        const chart = am4core.create('hourlyChartContainer', am4charts.XYChart);
        chart.paddingRight = 20;

        chart.dateFormatter.inputDateFormat = 'HH:mm, d MMMM';

        const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.baseInterval = {
            'timeUnit': 'minute',
            'count': 1
          };

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

        const lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.dataFields.dateX = 'date';
        lineSeries.dataFields.valueY = 'close';
        lineSeries.defaultState.properties.visible = false;

        lineSeries.hiddenInLegend = true;
        lineSeries.fillOpacity = 0.5;
        lineSeries.strokeOpacity = 0.5;

        const scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(lineSeries);
        chart.scrollbarX = scrollbarX;
        chart.seriesContainer.draggable = false;
        chart.seriesContainer.resizable = false;

        this.http.post(`${this.appConfig.apiUrl}/prices/company`, body).subscribe((res: []) => {
            chart.data = res;
        });

        // Daily chart declaration:

        const daily = am4core.create('dailyChartContainer', am4charts.XYChart);
        daily.paddingRight = 20;

        daily.dateFormatter.inputDateFormat = 'HH:mm, d MMMM';

        const dateAxisD = daily.xAxes.push(new am4charts.DateAxis());
        dateAxisD.renderer.grid.template.location = 0;
        dateAxisD.baseInterval = {
            'timeUnit': 'day',
            'count': 1
          };

        const valueAxisD = daily.yAxes.push(new am4charts.ValueAxis());
        valueAxisD.tooltip.disabled = true;

        const seriesD = daily.series.push(new am4charts.CandlestickSeries());
        seriesD.dataFields.dateX = 'date';
        seriesD.dataFields.valueY = 'close';
        seriesD.dataFields.openValueY = 'open';
        seriesD.dataFields.lowValueY = 'low';
        seriesD.dataFields.highValueY = 'high';
        seriesD.simplifiedProcessing = true;
        seriesD.tooltipText = 'Open: ${openValueY.value}\nLow: ${lowValueY.value}\nHigh: ${highValueY.value}\nClose: ${valueY.value}';

        daily.cursor = new am4charts.XYCursor();

        const lineSeriesD = daily.series.push(new am4charts.LineSeries());
        lineSeriesD.dataFields.dateX = 'date';
        lineSeriesD.dataFields.valueY = 'close';
        lineSeriesD.defaultState.properties.visible = false;

        lineSeriesD.hiddenInLegend = true;
        lineSeriesD.fillOpacity = 0.5;
        lineSeriesD.strokeOpacity = 0.5;

        const scrollbarXD = new am4charts.XYChartScrollbar();
        scrollbarXD.series.push(lineSeries);
        daily.scrollbarX = scrollbarXD;
        daily.seriesContainer.draggable = false;
        daily.seriesContainer.resizable = false;


        this.http.post(`${this.appConfig.apiUrl}/prices/monthly`, body).subscribe((res: []) => {
            daily.data = res;
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
