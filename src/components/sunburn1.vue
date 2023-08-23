<template>
    <div id="container"></div>
  </template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";
import * as d3 from "d3";


export default defineComponent({
  mounted() {      
    axios.get("./b.json").then((res) => {
                this.drawGraphChart(res.data);
            });        
    },
    methods:{
      drawGraphChart(data){
            var w=screen.width*0.8
            var h=screen.height*0.7
            var color=d3.schemeCategory10

            var svg=d3.select("#container")
                .append("svg")
                .attr("width",w)
                .attr("height",h);
            var radius=w/5+50;
            var partition=d3.partition().size([2*Math.PI,radius])

            var root=partition(d3.hierarchy(data)
                        .sum(d=>d.value)
                        .sort((a,b)=>b.value-a.value))
            console.log(root)

            var links=root.links();
            var nodes=root.descendants()

            console.log(nodes)
            var arcPath=d3.arc()
                .startAngle(d=>d.x0)
                .endAngle(d=>d.x1)
                .innerRadius(d=>d.y0)
                .outerRadius(d=>d.y1-1);

            var gc=svg.append('g')
                .attr("transform",d=>`translate(${w/2},${h/2})`)
            
            var sunb=gc.selectAll("path")
                .data(nodes)
                .join("path")
                .attr("fill-opacity","0.5")
                .attr("fill",d=>{
                    if(d.height==2)
                        return color[7]
                    else if(d.height==1){
                        switch(d.data.color){
                            case "1":
                                return "#E3E36A"
                            case "2":
                                return "#67D5B5"
                            case "3":
                                return "#FFBC42"
                            case "4":
                                return "#C16200"
                            case "5":
                                return "#49010F"
                        }
                    }
                    else{
                        switch(d.data.color){
                            case "1":
                                return color[2]
                            case "2":
                                return color[4]
                            case "3":
                                return color[3]
                        }
                    }
                })
                .attr("stroke","#fff")
                .attr("stroke-width","2")
                .attr("d",function(d){return arcPath(d)})
                

            var text=gc.selectAll("text")
                .data(nodes.filter(d=>(d.y0+d.y1)/2*(d.x1-d.x0)>15))
                .join("text")
                .attr("font-size",d=>(18-d.depth*3))
                .attr("text-anchor","middle")
                // .attr("dy","0.5em")
                .attr("fill","black")
                .attr("transform",function(d){
                    const x=(d.x0+d.x1)/2*180/Math.PI;
                    const y=(d.y0+d.y1)/2;
                    return `rotate(${x-90}) translate(${y},0) rotate(${x<180?0:180})`
                })
                .text(d=>d.data.name);
      }
  }
})
</script>
