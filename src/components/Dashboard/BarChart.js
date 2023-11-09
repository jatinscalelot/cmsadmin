import React, { useLayoutEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

//chart type
import * as am5percent from "@amcharts/amcharts5/percent";

function BarChart(props) {
    //const chart = useRef(null);
    const chartID = props.chartID;

    useLayoutEffect(() => {
        //var root = am5.Root.new("chartdiv2");
        var legendRoot  = am5.Root.new(chartID);

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        legendRoot .setThemes([am5themes_Animated.new(legendRoot )]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        var chart = legendRoot .container.children.push(
            am5percent.PieChart.new(legendRoot , {
                endAngle: 270
            })
        );

        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        var series = chart.series.push(
            am5percent.PieSeries.new(legendRoot , {
                valueField: "value",
                categoryField: "category",
                endAngle: 270
            })
        );

        series.states.create("hidden", {
            endAngle: -90
        });

        //dataset
        let data = [
            {
                category: "Lithuania",
                value: 501.9
            },
            {
                category: "Czechia",
                value: 301.9
            },
            {
                category: "Ireland",
                value: 201.1
            },
            {
                category: "Germany",
                value: 165.8
            },
            {
                category: "Australia",
                value: 139.9
            },
            {
                category: "Austria",
                value: 128.3
            },
            {
                category: "UK",
                value: 99
            }
        ];

        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        series.data.setAll(data);

        series.appear(1000, 100);
    }, [chartID]);

    return <div className="" id={chartID}></div>;
}
export default BarChart;
