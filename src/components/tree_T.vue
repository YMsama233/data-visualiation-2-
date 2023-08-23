<template>
    <div class="container">
      <div id="graph-chart-container"></div>
    </div>
    <!-- <text x="1500" y="1500" font-size="24">{{ message }}</text> -->
  </template>

  <script>
      import {defineComponent} from 'vue';
      import * as d3 from "d3";
      import axios from "axios";
  
      // var color=d3.interpolateBrBG(0.5);
      export default defineComponent({
          mounted(){
              axios.get("./tree.json").then((res)=>{
                this.drawTreeChart(res.data);
              }) ;
          },
          methods:{
              drawTreeChart(graph){
                  var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                  var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  
                  var width=w*0.95;
                  var height=h*2.5;
                  var color=d3.schemeSet1;   
  
                  var svg=d3.select("#graph-chart-container")
                            .append("svg")
                            .attr("width",width)
                            .attr("height",height);
  
                  var tree=d3.tree()
                         .size([h*2,width*0.9]);
                  var data = graph;
                  console.log(data);
                  var hi=d3.hierarchy(data);
                  console.log(hi);
                  var root=tree(hi);
                  console.log(root);
                  var links=root.links();
                  console.log(links);
                  var nodes=root.descendants();
                  console.log(nodes);
  
                  var gc=svg.append("g")
                            .attr("transform","translate(" + (width/72) + "," + (height/36) + ")");	
                  gc.selectAll("path")
                            .data(links)
                            .enter()
                            .append("path")
                            .attr("fill","none")
                            .attr("stroke","#7A4A10")
                            .attr("stroke-width","1px")
                            .attr("d",d3.linkHorizontal()          //d3.linkHorizontal()
                                        .x(d=>d.y)
                                        .y(d=>d.x)
                            );                        
                  gc.selectAll("circle") 
                              .data(nodes)
                              .join("circle")
                              .attr("cx",d=>d.y)
                              .attr("cy",d=>d.x)
                              .attr("r",d=>(d.height+1)*2)
                              .attr("fill",(d)=>(color[d.height]))
                              .attr("stroke","black")
                              
                  gc.selectAll("text") 
                              .data(nodes)
                              .join("text")
                              .attr("x",(d)=>d.y)
                              .attr("y",d=>d.x)
                              .attr("dx","1em")
                              .attr("dy","0.3em")
                      //        .attr("text-anchor","middle")
                              .attr("font-size",(d)=>(d.height*3+5)*1.5)
                              .attr("fill","black")
                              .attr("font-family", "Microsoft YaHei")
                              .attr("font-weight", "bold")
                      //        .attr("transform",d=>`rotate(90,${d.x},${d.y})`)                        
                              //.text((d,i)=>i%2==0?d.data.name:"");   
                              .text((d,i)=>i%5==0||d.data.children!=undefined?d.data.col1:'');  
                
                //   //Vertical
                //   var gc_v=svg.append("g")
                //               .attr("transform","translate(" + (width/5) + "," + (height/3) + ")");	
                //   gc_v.selectAll("path")
                //             .data(links)
                //             .enter()
                //             .append("path")
                //             .attr("fill","none")
                //             .attr("stroke","#7A4A10")
                //             .attr("stroke-width","2px")
                //             .attr("d",d3.linkVertical()          //d3.linkHorizontal()
                //                         .x(d=>d.x)
                //                         .y(d=>d.y)
                //             );                        
                //   gc_v.selectAll("circle") 
                //               .data(nodes)
                //               .join("circle")
                //               .attr("cx",d=>d.x)
                //               .attr("cy",d=>d.y)
                //               .attr("r",d=>(d.height+2)*3)
                //               .attr("fill",(d)=>(color[d.height]))
                //               .attr("stroke","black");
                              
                //   gc_v.selectAll("text") 
                //               .data(nodes)
                //               .join("text")
                //               .attr("x",(d)=>d.x)
                //               .attr("y",d=>d.y)
                //               .attr("dx","1em")
                //               .attr("dy","0.3em")
                //       //        .attr("text-anchor","middle")
                //               .attr("font-size",(d)=>(d.height*3+10)*1.5)
                //               .attr("fill","black")
                //               .attr("font-family", "Microsoft YaHei")
                //               .attr("font-weight", "bold")
                //               .attr("transform",d=>`rotate(90,${d.x},${d.y})`)                        
                //               //.text((d,i)=>i%2==0?d.data.name:"");   
                //               .text((d,i)=>i%5==0?d.data.col1:'');
                
                //   var radius_c=width/2;   
                           
                //   var tree_c=d3.cluster()
                //             .size([2*Math.PI, radius_c - 470]);
  
                //   var root_c=tree_c(hi);
                //   var links_c=root_c.links();
  
                //   var nodes_c=root_c.descendants();
                
                //   var gc_c=svg.append("g")
                //             .attr("transform","translate(" + (width/2) + "," + (height*7/9) + ")");	
                //   gc_c.selectAll("path")
                //               .data(links_c)
                //               .enter()
                //               .append("path")
                //               .attr("fill","none")
                //               .attr("stroke","#7A4A10")
                //               .attr("d",d3.linkRadial()          //d3.linkHorizontal()
                //                           .angle(d => d.x)
                //                           .radius(d => d.y)
                //               );                        
                //   gc_c.selectAll("circle") 
                //               .data(nodes_c)
                //               .join("circle")
                //               .attr("cx",d=>Math.cos(d.x-Math.PI/2)*d.y)
                //               .attr("cy",d=>Math.sin(d.x-Math.PI/2)*d.y)
                //               .attr("r",d=>(d.height+2)*2)
                //               .attr("fill",(d)=>color[d.height%10])
                //               .attr("stroke","black");
                              
                //   gc_c.selectAll("text") 
                //               .data(nodes_c)
                //               .join("text")
                //               .attr("x",d=>Math.cos(d.x-Math.PI/2)*d.y)//坐标（x，y）   x：角度（弧度制） y：距离圆心的距离
                //               .attr("y",d=>Math.sin(d.x-Math.PI/2)*d.y)
                //               .attr("dx",function(d){
                //                 if (!d.children&&d.x<Math.PI) return "1em";
                //                 else {
                //                   if (d.children) {
                //                     if (d.x<Math.PI) return "-1em";
                //                     else return "1em";
                //                   }
                //                   else if (!d.children) return "-1em";
                //                 }
                //               }) 
                //               .attr("dy",function(d){
                //                 if (!d.children&&d.x<Math.PI) return "0.3em";
                //                 else {
                //                   if (d.children) {
                //                     if (d.x<Math.PI) return "0.4em";
                //                     else return "0.3em";
                //                   }
                //                   else if (!d.children) return "0.5em";
                //                 }
                //               })
                //               .attr("fill",(d)=>color[d.height%10])
                //               .attr("transform",d=>d.x<Math.PI ? `rotate(${d.x*180/Math.PI-90},${Math.cos(d.x-Math.PI/2)*d.y},${Math.sin(d.x-Math.PI/2)*d.y})`
                //                                               :`rotate(${d.x*180/Math.PI+90},${Math.cos(d.x-Math.PI/2)*d.y},${Math.sin(d.x-Math.PI/2)*d.y})`)
                //               .attr("text-anchor",function(d){
                //                 if (!d.children&&d.x<Math.PI) return "strat";
                //                 else {
                //                   if (d.children) {
                //                     if (d.x<Math.PI) return "end";
                //                     else return "start";
                //                   }
                //                   else if (!d.children) return "end";
                //                 }
                //               })
                //               .attr("font-size",(d)=>(!d.children?"24":"14"))
                //               .attr("font-family", "Microsoft YaHei")
                //               .attr("font-weight", "bold")
                //               .text(d=>d.data.name);       
                              
                //   svg.append("text")
                //       .attr("x", 1800)
                //       .attr("y", 700)
                //       .style("fill", "black")
                //       .style("font-size", "24px")
                //       .text("网页作者：赵笑天");
                //   svg.append("text")
                //       .attr("x", 350)
                //       .attr("y", 400)
                //       .style("fill", "black")
                //       .style("font-size", "63px")
                //       .attr("font-family", "Microsoft YaHei")
                //       .attr("font-weight", "bold")
                //       .text("《2022年大学生心理健康状况调查报告》指标可视化");
                //   svg.append("text")
                //       .attr("x", 300)
                //       .attr("y", 500)
                //       .style("fill", "black")
                //       .style("font-size", "24px")
                //       .text("大学生是一个特殊的社会群体, 正经历着从青春期向成年早期的过渡和转变。大学阶段是个体发展、身心成长、知识储备、健康素养培养的关键时期。");
                //   svg.append("text")
                //       .attr("x", 280)
                //       .attr("y", 550)
                //       .style("fill", "black")
                //       .style("font-size", "24px")
                //       .text("2022 年, 我们对全国来自北京、陕西、河南、黑龙江、 贵州、 浙江等31个省、自治区和直辖市的大学生进行了心理健康状况调查, 回收有效问卷75542份。");
                //   svg.append("text")
                //       .attr("x", 1250)
                //       .attr("y", 600)
                //       .style("fill", "black")
                //       .style("font-size", "24px")
                //       .attr("font-weight", "bold")
                //       .text("——《2022年大学生心理健康状况调查报告》方 圆 王路石 陈祉妍");
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
  