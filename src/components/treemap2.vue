<template>
    <div class="common-layout">
      <el-container>
        <el-main id="container"></el-main>
        <el-aside width="100px" id="aside">
            <br><br>
        </el-aside>
      </el-container>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import axios from "axios";
  import * as d3 from "d3";
  
  
  export default defineComponent({
    mounted() {      
      axios.get("./a.json").then((res) => {
                  this.drawGraphChart(res.data);
              });        
      },
      methods:{
        drawGraphChart(data){
              var w=screen.width*0.7
              var h=screen.height*0.7
              var color=d3.scaleOrdinal(d3.schemeCategory10)
  
              var svg=d3.select("#container")
                  .append("svg")
                  .attr("width",w)
                  .attr("height",h);
              var treemap=d3.treemap().size([w,h])
              var hidata=d3.hierarchy(data)
                          .sum(d=>d.value)
                          .sort((a,b)=>b.value-a.value);
              console.log(hidata)
              var treedata=treemap(hidata);
              var nodes=treedata.leaves();
              console.log(nodes)
              var gc=svg.selectAll('g')
                  .data(nodes)
                  .enter()
                  .append('g')
                  .attr("transform",function(d){
                      return "translate("+d.x0+","+d.y0+")"
                  })
                  .attr("id",function(d,i){return i;});
              
              var rect=gc.append("rect")
                  .attr("width",d=>d.x1-d.x0)
                  .attr("height",d=>d.y1-d.y0)
                  .attr("fill",function(d){
                      while(d.depth>1)
                          d=d.parent;
                      return color(d.data.color)
                  })
                  .attr("opacity",0.7)
                  .attr("stroke","white");
  
              var text=gc.append("text")
                  .attr("font-size","12")
                  .attr("text-anchor","middle")
                  .attr("x",d=>(d.x1-d.x0)/2)
                  .attr("y",d=>(d.y1-d.y0)/2)
                  .attr("class","txt")
                  .attr("fill","white")
                  .text(d=>(d.data.name+"-"+d.data.p+"%"));

            var a_h=document.getElementById("aside").offsetHeight
            var a_w=document.getElementById("aside").offsetWidth
            console.log(a_h)    
            
            var addition=d3.select("#aside")
                .append("svg")
                .attr("width",a_w)
                .attr("height",a_h/2)

            var exp1=addition
                .append("rect")
                .attr("width",20)
                .attr("height",20)
                .attr("fill","#1F77B4")
                .attr("stroke","black")
                .attr("stroke-width",1)

            var exp1_t=addition
                .append("text")
                .attr("dx",30)
                .attr("dy",20)
                .attr("fill","black")
                .text("非常好")
            
            var exp2=addition
                .append("rect")
                .attr("width",20)
                .attr("height",20)
                .attr("y",50)
                .attr("fill","#FF7F0E")
                .attr("stroke","black")
                .attr("stroke-width",1)

            var exp2_t=addition
                .append("text")
                .attr("dx",30)
                .attr("dy",70)
                .attr("fill","black")
                .text("比较好")

            var exp3=addition
                .append("rect")
                .attr("width",20)
                .attr("height",20)
                .attr("y",100)
                .attr("fill","#2CA02C")
                .attr("stroke","black")
                .attr("stroke-width",1)

            var exp3_t=addition
                .append("text")
                .attr("dx",30)
                .attr("dy",120)
                .attr("fill","black")
                .text("一般")

            var exp4=addition
                .append("rect")
                .attr("width",20)
                .attr("height",20)
                .attr("y",150)
                .attr("fill","#D62728")
                .attr("stroke","black")
                .attr("stroke-width",1)

            var exp4_t=addition
                .append("text")
                .attr("dx",30)
                .attr("dy",170)
                .attr("fill","black")
                .text("比较差")

            var exp5=addition
                .append("rect")
                .attr("width",20)
                .attr("height",20)
                .attr("y",200)
                .attr("fill","#9467BD")
                .attr("stroke","black")
                .attr("stroke-width",1)

            var exp4_t=addition
                .append("text")
                .attr("dx",30)
                .attr("dy",220)
                .attr("fill","black")
                .text("非常差")
        }
    }
  })
  </script>
  