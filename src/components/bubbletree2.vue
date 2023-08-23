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
var myfile="./a.json"


export default defineComponent({
  mounted() {      
    axios.get(myfile).then((res) => {
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
                .attr("width",w*0.8)
                .attr("height",h);

            var pack=d3.pack().size([w*0.9,h])

            var hidata=d3.hierarchy(data)
                        .sum(d=>d.value)
                        .sort((a,b)=>b.value-a.value);
            console.log(hidata)

            var packdata=pack(hidata);
            var nodes=packdata.descendants()

            console.log(nodes)
            var gc=svg.selectAll('g')
                .data(nodes)
                .enter()
                .append('g')
                .attr("transform",d=>`translate(${d.x},${d.y})`)
                .attr("id",function(d,i){return i;});
            
            var circles=gc.append("circle")
                .attr("cx",0)
                .attr("cy",0)
                .attr("r",d=>d.r)
                .attr("stroke","black")
                .attr("stroke-width","0.2")
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
                                return color[0]
                            case "4":
                                return color[3]
                        }
                    }
                })
                

            var text=gc.append("text")
                .attr("font-size","12")
                .attr("text-anchor","middle")
                .attr("dy","0.5em")
                .attr("fill","white")
                .text(d=>d.r>20?d.data.name:"");
            
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
                .attr("fill","#E3E36A")
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
                .attr("fill","#67D5B5")
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
                .attr("fill","#FFBC42")
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
                .attr("fill","#C16200")
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
                .attr("fill","#49010F")
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
