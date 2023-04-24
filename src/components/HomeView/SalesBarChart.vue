<!-- 销量条形统计图 -->
<template>
    <el-container>
        <el-header style="background-color: white; height: 10%;">
            <el-row>
                <el-col :span="10"></el-col>
                <el-col :span="4">药品销量统计图</el-col>
            </el-row>
        </el-header>
        <el-main style="height: 583px;">
            <div id="main" style="width: 100%; height:100%;"></div>
        </el-main>
    </el-container>

</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { reactive, onBeforeMount, onMounted } from 'vue';

var r = reactive({
    medicineSell: [
        {
            sellMedicineName: "11",
            sellNumber: "111",

        },
        {
            sellMedicineName: "22",
            sellNumber: "22",

        },
    ],
    echarts: {
        medicineName: [''],
        medicineSales: [''],
    }
})
onBeforeMount(() => {
    for (var i = 0; i < r.medicineSell.length; ++i) {
        r.echarts.medicineSales[i] = r.medicineSell[i].sellNumber
        r.echarts.medicineName[i] = r.medicineSell[i].sellMedicineName
    }

    console.log("预加载")
})
onMounted(() => {
    init()
})
function init() {
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            // text: '药品销量统计图'
        },
        dataZoom: [
            {
                xAxisIndex: 0,
                show: true,
                type: 'slider',
                startValue: 0,
                endvalue: 10,
                maxValueSpan: 9,
                minValueSpan: 9,
                brushSelect: false,
            }
        ],
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: r.echarts.medicineName,
        },
        yAxis: {},
        series: [
            {
                name: 'sales',
                type: 'bar',
                data: r.echarts.medicineSales,
            }
        ]
    };
    myChart.setOption(option)
}
</script>