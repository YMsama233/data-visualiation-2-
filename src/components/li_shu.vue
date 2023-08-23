<template>
    <div class="container">
      <div id="graph-chart-container"></div>
    </div>
</template>
  
  <style>
  .tooltip {
    position:absolute;
    width:500px;
    padding:10px;
    font-size:14px;
    text-align:left;
    color:black;
    border:2px solid #ccc;
    background-color:#fff;
    border-radius:5px;
    box-shadow:0 0 10px rgba(0,0,0,0.3);
    margin-bottom:20px;
  }
  </style>
  
  <script>
      import {defineComponent} from 'vue';
      import * as d3 from "d3";
      import axios from "axios";
  
      // var color=d3.interpolateBrBG(0.5);
      export default defineComponent({
          mounted(){
              axios.get("./b.json").then((res) => {
                  console.log(res.data);
                  this.drawGraphChart(res.data);
              });
          },
          methods:{
              drawGraphChart(graph){
              var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
              var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
              var width=w;
              var height=h;
  
              var  img_h=50;
              var  img_w=50;
              var  radius=20;	
  
                  var svg=d3.select("#graph-chart-container")
                            .append("svg")
                            .attr("width",width)
                            .attr("height",height);
  
                  var forceSimulation = d3.forceSimulation(nodes)
                                 .force("center",d3.forceCenter(width/2,height/2)) //中心点
                                 .force("charge",d3.forceManyBody().strength(-100))
                                 .force("link",d3.forceLink().distance(100));									
  
                  //节点数据                  
                  forceSimulation.nodes(graph.nodes).on("tick");
                  console.log(graph.nodes);
                  forceSimulation.force("link").links(graph.links);

  
                  var link = svg.selectAll("path")
                                .data(graph.links)
                                .join("path")
                                .attr("id",function(d,i){return "edgepath"+i;})
                                .attr("class","edges")
                                .attr("fill","black")
                                .attr("stroke","black")
                                .attr("stroke-width",2);
  
                  var text = svg.selectAll(".forcetxt")
                                .data(graph.nodes)
                                .join("text")
                                .attr("class", "forcetxt")
                                .attr("font-family","STXingkai")
                                .attr("dx", d=>(-d.name.length*20/2))
                                .attr("dy", 36)
                                .style("font-size", 20)
                                .style("fill", "black")
                                .text(function(d){
                                  return d.name;
                                });
                  
                  var edges_text = svg.selectAll("g")
                                      .data(graph.links)
                                      .enter()
                                      .append('text')
                                      .append('textPath')
                                      .attr("text-anchor","middle")//居中
                                      .attr("startOffset","50%")
                                      .attr('xlink:href',function(d,i){return "#edgepath"+i;})
                                      .style("font-size", 14)
                                      .style("fill", "black")
                                      .text(function(d){return d.value;});
  
                  var nodes = svg.selectAll(".node")
                                .data(graph.nodes)
                                .join("circle")// enter+append
                                .attr("class","node")
                                .attr("r",radius)
                                .attr("stroke","black")
                                .attr("fill",function(d, i){
                                      //创建圆形图片
                                      var defs = svg.append("defs").attr("id", "imgdefs");
                                      var catpattern = defs.append("pattern")
                                                           .attr("id", "catpattern" + i)
                                                           .attr("height", 1)
                                                           .attr("width", 1);
                                      catpattern.append("image")
                                              .attr("x", - img_w / 4 - 3 )
                                              .attr("y", - img_h / 4 - 3)
                                              .attr("width", img_w*1.5)
                                              .attr("height", img_h*1.5)
                                              .attr("xlink:href","image/"+d.image);//src\components\image
                                      return "url(#catpattern" + i + ")";
                                 })
                                .call(drag());
                  
                  
                  var tooltip = d3.selectAll("body")
                                  .append("div")
                                  .attr("class","tooltip")
                                  .style("opacity", 0.0);

                  nodes.on("mouseover", (d)=>{
                                  console.log(d.srcElement.__data__.intro);
                                  tooltip.html(""+d.srcElement.__data__.intro)
                                         .style("left", d.x+"px")
                                         .style("top", d.y+"px")
                                         .style("opacity", 1);
                                })
                  nodes.on("mouseout",(d)=>{
                                  console.log(d.srcElement.__data__.intro);
                                  tooltip.html("")
                                         .style("left", d.x+"px")
                                         .style("top", d.y+"px")
                                         .style("opacity", 0);
                                })
  
                  forceSimulation.on("tick",()=>{
                                  link.attr("d",function(d){
                                    return "M" + d.source.x + "," + d.source.y + "L" + d.target.x + "," + d.target.y;
                                  }) 
                                  nodes.attr("cx", function(d){return d.x})
                                      .attr("cy", d => d.y);
                                  text.attr("x", d => d.x)
                                      .attr("y", d => d.y);
                                  edges_text.attr("x", d=>((d.source.x + d.target.x)/2))
                                            .attr("y", d=>((d.source.y + d.target.y)/2));
                                          
                  })
                  function drag(){
                    function dragstarted(event, d){
                      if (!event.active) forceSimulation.alphaTarget(0.3).restart();
                      console.log(d)
                      d.fx = d.x;
                      d.fy = d.y;
                    }
                    function dragged(event , d){
                      d.fx = event.x;
                      d.fy = event.y;
                    }
                    function dragended(event, d){
                      if (!event.active) forceSimulation.alphaTarget(0);
                      d.fx = null;
                      d.fy = null;
                    }
                    return d3.drag().on("start", dragstarted)
                                    .on("drag",dragged)
                                    .on("end",dragended);
                  }
              }
              
      }
    })
  </script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
    text-decoration: none;
  }
  
  </style>
  