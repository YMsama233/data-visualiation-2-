<template>
     <div class="container">
        <input v-model="sql" 
        class="mess"
        size="large" 
        placeholder="输入查询的关键字">
            <button @click="getSql" class="btn"><span>点击生成密度图</span></button>
        <div id="dencontainer"> 
        </div>
    </div>
</template>
<script>
import * as d3 from 'd3';
import { getSqlInfo } from '../axios/api'
export default {
	name: 'sqlInfor',
	data() {
		return {
			sqlInfo: '',
			sql: '',
		}
	},
	methods: {
        async getSql() {
            d3.selectAll("svg").remove();
            let res = await getSqlInfo({ sql: this.sql })

            var width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);

            
            var svg = d3.selectAll("#dencontainer")
                        .attr("class","mysvg")
                        .append("svg")
                        .attr("width",width)
                        .attr("height",height);
            var sum=0;
            var list=[]
            console.log(res)
            for(var i=0;i<13;i++){
                sum=sum+res.data[i]
            }

            var num=0
            for(var j=0;j<13;j++){
                for(var z=0;z<res.data[j];z++){
                    list[num]={x:5*(j+1),y:5}
                    num++;
                }
            }
            console.log(list)
                var g=svg.append("g")
                        .attr("transform","translate(" + 0 + ", " + 300 + ")");

                // 定义时间轴数据
                // var dynastiesData_0 = [
                // { name: "春秋", start: -770, end: -476 },
                // { name: "战国", start: -475, end: -221 },
                // { name: "秦", start: -221, end: -206 },
                // { name: "汉", start: -206, end: 220 },
                // { name: "三国", start: 220, end: 280 },
                // { name: "晋", start: 280, end: 420 },
                // { name: "隋", start: 581, end: 618 },
                // { name: "唐", start: 618, end: 907 },
                // { name: "五代", start: 907, end: 960 },
                // { name: "宋", start: 960, end: 1279 },
                // { name: "元", start: 1279, end: 1368 },
                // { name: "明", start: 1368, end: 1644 },
                // { name: "清", start: 1644, end: 1912 }
                // ];
                var dynastiesData = [
                { name: "春秋", start: 200, end: (width-200)/13+200 },
                { name: "战国", start: (width-200)/13+200, end: (width-200)*2/13+200 },
                { name: "秦", start: (width-200)*2/13+200, end: (width-200)*3/13+200 },
                { name: "汉", start: (width-200)*3/13+200, end: (width-200)*4/13+200 },
                { name: "三国", start: (width-200)*4/13+200, end: (width-200)*5/13+200 },
                { name: "晋", start: (width-200)*5/13+200, end: (width-200)*6/13+200 },
                { name: "隋", start: (width-200)*6/13+200, end: (width-200)*7/13+200 },
                { name: "唐", start: (width-200)*7/13+200, end: (width-200)*8/13+200 },
                { name: "五代", start: (width-200)*8/13+200, end: (width-200)*9/13+200 },
                { name: "宋", start: (width-200)*9/13+200, end: (width-200)*10/13+200 },
                { name: "元", start: (width-200)*10/13+200, end: (width-200)*11/13+200 },
                { name: "明", start: (width-200)*11/13+200, end: (width-200)*12/13+200 },
                { name: "清", start: (width-200)*12/13+200, end: width }
                ];
                var startYear = d3.min(dynastiesData, function(d) { return d.start; });
                var endYear = d3.max(dynastiesData, function(d) { return d.end; });

                // 绘制时间轴
                var x_0 = d3.scaleTime()
                        .domain([startYear, endYear])
                        .range([100, width/1.6]);

                var xAxis_0 = d3.axisBottom(x_0).tickFormat(function() {return "";})
                            .tickSize(0)
                            .tickPadding(8);

                svg.append("g")
                            .attr("transform", "translate(0, " + (height / 2+80) + ")")
                            .call(xAxis_0);

                // 在朝代开始和结束处添加标记点
                for (var i = 0; i < dynastiesData.length; i++) {
                var dynasty = dynastiesData[i];
                var dynastyStart = dynasty.start;
                var dynastyEnd = dynasty.end;
                if (dynastyStart >= startYear && dynastyStart <= endYear) {
                    var xPos = x_0(dynastyStart);
                    // console.log("111111111")
                    // console.log(dynastyStart);
                    svg.append("circle")
                    .attr("cx", xPos)
                    .attr("cy", height/2+80)
                    .attr("r", 5)
                    .attr("fill", "white")
                    .attr("stroke", "black");
                }
                if (dynastyEnd >= startYear && dynastyEnd <= endYear) {
                    var xPos_ = x_0(dynastyEnd);
                    svg.append("circle")
                    .attr("cx", xPos_)
                    .attr("cy", height/2+80)
                    .attr("r", 5)
                    .attr("fill", "white")
                    .attr("stroke", "black");
                }
                svg.append("text")
                .attr("x", (xPos+xPos_)/2 - 10)
                .attr("y", height/2 +70)
                .text(dynasty.name);
                }

                //第二条坐标轴
                var xAxis_2 = d3.axisBottom(x_0).tickFormat(function() {return "";})
                            .tickSize(7)
                            .tickPadding(8);

                svg.append("g")
                            .attr("transform", "translate(0, " + 220 + ")")
                            .call(xAxis_2);

                // for (var j = 0; j < dynastiesData.length; j++) {
                //     var dynasty_2 = dynastiesData[j];
                //     var dynastyStart_2 = dynasty_2.start;
                //     var dynastyEnd_2 = dynasty_2.end;
                //     if (dynastyStart_2 >= startYear && dynastyStart_2 <= endYear) {
                //         var xPos_2 = x_0(dynastyStart_2);
                //         svg.append("circle")
                //         .attr("cx", xPos_2)
                //         .attr("cy", 220)
                //         .attr("r", 5)
                //         .attr("fill", "red");
                //     }
                //     if (dynastyEnd_2 >= startYear && dynastyEnd_2 <= endYear) {
                //         var xPos__2 = x_0(dynastyEnd_2);
                //         svg.append("circle")
                //         .attr("cx", xPos__2)
                //         .attr("cy", 220)
                //         .attr("r", 5)
                //         .attr("fill", "red");
                //     }
                // }

                // Read data
                d3.csv("./data.csv").then(function(data) {
                    data=list;
                    svg.append("g")
                    .attr("transform", "translate(960, 450)")
                    .append("text")
                    .text("时间");

                    var color=d3.schemePastel2;
                    var x = d3.scaleLinear()
                                .domain([5, 70])
                                .range([100, width/1.8]);
                    
                    for(let i=0; i<data.length; i++){
                        data[i].x = Number(data[i].x) + 5*Math.random();
                        // console.log(data[i].x);
                        data[i].y = Number(data[i].y) + 50*Math.random();
                        // console.log(data[i].y);
                    }

                    
                    var densityData = d3.contourDensity()
                                    .y(d=>d.y)
                                    .x(d=>x(d.x))
                                    .thresholds([0.0004, 0.001, 0.0015, 0.0021]);
                    var ddata=densityData(data);
                    // console.log(ddata);

                    var pathgeo0=g.selectAll("path")
                            .data(ddata)
                            .enter()
                            .append("path")
                            .attr("d", d3.geoPath())
                            .attr("fill", (d,i)=>color[i%10])
                            .attr("stroke", "black")
                            .attr("opacity","1");

                    var cir = g.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                            //  .attr("transform","translate(" + 500 + ", " + 400 + ")")
                            .attr("cx", d=>x(d.x))
                            .attr("cy", d=>d.y)
                            .attr("r",3)
                            .attr("fill", "#004FE3")
                            .attr("stroke", "black");
                            
                    pathgeo0.on("mouseover",function()
                    {
                        d3.select(this).attr("stroke-width","2px");
                    })
                    //鼠标移出时通过ID移除标签
                    .on("mouseout",function()
                    {
                        d3.select(this).attr("stroke-width","1px");
                    });

                    cir.on("mouseover",function()
                    {
                        d3.select(this).attr("r","4");
                    })
                    //鼠标移出时通过ID移除标签
                    .on("mouseout",function()
                    {
                        d3.select(this).attr("r","3");
                    });

                });
            }
        }
    }


</script>
<style>
  /* .mysvg{
    position:absolute;
    left: 300px;
    top:50%;
    
  } */
</style>