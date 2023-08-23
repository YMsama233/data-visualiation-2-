 <template>
    <div class="container">
        <div id="graph-chart-container"></div>
    </div>
  </template>

  <script>
      import {defineComponent} from 'vue';
      import * as d3 from "d3";
      import axios from "axios";
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
  
                  var width=w*0.9;
                  var height=h*0.9;
                  var color=d3.schemeSet1;   
                  
                  var svg=d3.select("#graph-chart-container")
                            .append("svg")
                            .attr("width",width)
                            .attr("height",height);
                  var tree=d3.tree()
                         .size([h,width]);
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
                
                  var radius_c=width/1.9;   
                           
                  var tree_c=d3.cluster()
                            .size([2*Math.PI, radius_c - 470]);
  
                  var root_c=tree_c(hi);
                  var links_c=root_c.links();
  
                  var nodes_c=root_c.descendants();
                
                  var gc_c=svg.append("g")
                            .attr("transform","translate(" + (width/2) + "," + (height/2) + ")");	
                  var paths = gc_c.selectAll("path")
                              .data(links_c)
                              .enter()
                              .append("path")
                              .attr("fill","none")
                              .attr("stroke","#ccc")
                              .attr("d",d3.linkRadial()          //d3.linkHorizontal()
                                          .angle(d => d.x)
                                          .radius(d => d.y)
                              );                        
                  var nod = gc_c.selectAll("circle") 
                              .data(nodes_c)
                              .join("circle")
                              .attr("cx",d=>Math.cos(d.x-Math.PI/2)*d.y)
                              .attr("cy",d=>Math.sin(d.x-Math.PI/2)*d.y)
                              .attr("r",d=>(d.height+2)*2)
                              .attr("fill",(d)=>color[d.height%10])
                              .attr("stroke","white");
                              
                  var texts=gc_c.selectAll("text") 
                              .data(nodes_c)
                              .join("text")
                              .attr("x",d=>Math.cos(d.x-Math.PI/2)*d.y)//坐标（x，y）   x：角度（弧度制） y：距离圆心的距离
                              .attr("y",d=>Math.sin(d.x-Math.PI/2)*d.y)
                              .attr("dx",function(d){
                                if (!d.children&&d.x<Math.PI) return "1em";
                                else {
                                  if (d.children) {
                                    if (d.x<Math.PI) return "-1em";
                                    else return "1em";
                                  }
                                  else if (!d.children) return "-1em";
                                }
                              }) 
                              .attr("dy",function(d){
                                if (!d.children&&d.x<Math.PI) return "0.3em";
                                else {
                                  if (d.children) {
                                    if (d.x<Math.PI) return "0.4em";
                                    else return "0.3em";
                                  }
                                  else if (!d.children) return "0.5em";
                                }
                              })
                              .attr("fill","black")
                              .attr("transform",d=>d.x<Math.PI ? `rotate(${d.x*180/Math.PI-90},${Math.cos(d.x-Math.PI/2)*d.y},${Math.sin(d.x-Math.PI/2)*d.y})`
                                                              :`rotate(${d.x*180/Math.PI+90},${Math.cos(d.x-Math.PI/2)*d.y},${Math.sin(d.x-Math.PI/2)*d.y})`)
                              .attr("text-anchor",function(d){
                                if (!d.children&&d.x<Math.PI) return "strat";
                                else {
                                  if (d.children) {
                                    if (d.x<Math.PI) return "end";
                                    else return "start";
                                  }
                                  else if (!d.children) return "end";
                                }
                              })
                              .attr("font-size",(d)=>(!d.children?"7":"12"))
                              .attr("font-family", "Microsoft YaHei")
                              .attr("font-weight", "bold")
                              .text((d,i)=>i%5==0||d.data.children!=undefined?d.data.col1:'');      
                              
                paths.on("mouseover", function(){
                                  d3.select(this).attr("stroke","blue");
                                });
                paths.on("mouseout",function(){
                                  d3.select(this).attr("stroke","#ccc")
                                });
                nod.on("mouseover", function(){                                 
                                  d3.select(this).attr("r",d=>(d.height+3)*2)
                                });
                nod.on("mouseout",function(){
                                  d3.select(this).attr("r",d=>(d.height+2)*2)
                                });
                texts.on("mouseover",function(){
                                  d3.select(this).attr("font-size",(d)=>(!d.children?"20":"15"))
                })
                texts.on("mouseout",function(){
                                  d3.select(this).attr("font-size",(d)=>(!d.children?"7":"12"))
                })
  
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
  