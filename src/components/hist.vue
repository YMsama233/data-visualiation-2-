<template>
    <div class="container">
        <input v-model="user" 
        class="mess"
        size="large" 
        placeholder="输入查询的关键字">
            <button @click="getUser" class="btn"><span>点击生成直方图</span></button>
        <div id="histcontainer"> 
        </div>
    </div>
</template>


<script>
import * as d3 from 'd3';
//导入我们之前写的接口
import { getUserInfo } from '../axios/api'
export default {
	name: 'userInfor',
	data() {
		return {
			userInfo: '',
			user: '',
		}
	},
	methods: {
        
		async getUser() {
            d3.selectAll("svg").remove();
            console.log("start")
			let res = await getUserInfo({ user: this.user })
			console.log(res, '/api', '获取的用户信息')
			this.userInfo = res.data

            var w=1100;
            var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            w=w*0.98;
            h=h*0.98;
            console.log(w,h)

            var words=new Array(16);

            var book=[];
            book[0]="晋书";book[1]="汉书";
            book[2]="诗经";book[3]="史记";
            book[4]="左传";book[5]="礼记";
            book[6]="论语";book[7]="春秋";
            book[8]="三国";book[9]="宋书";
            book[10]="唐书";book[11]="庄子";
            book[12]="老子";book[13]="周易";
            book[14]="梁书";book[15]="明史";
           
            
            for(var i=0;i<16;i++){ 
                words[i]=res.data[i];
            }
            
            console.log(words)
                        
            const color = d3.scaleOrdinal(d3.schemeCategory10);
           
            var svg=d3.select("#histcontainer")
                    .append("svg")
                    .attr("width",w)
                    .attr("height",h)
                    .attr("transform","translate(50,0)");
            svg.selectAll("rect")
                .data(Object.values(words))
                .enter()
                .append("rect")
                .attr("x",function(d,i){return (w/17)*i})
                .attr("y",d=>(h-d/50*h-100))
                .attr("width",w/17-5)
                .attr("height",function(d){return d/50*h})
                .attr("fill",(d,i)=>color(i));
            svg.selectAll("text1")
                .data(Object.values(words))
                .enter()
                .append("text")
                .attr("x",function(d,i){return (w/17)*i})
                .attr("y",d=>(h-d/50*h-120))
                .attr("dx",w/17/2-22)
                .attr("fill","#b88230")
                .attr("font-size","18px")
                .attr("font-weight","bold")
                .text(function(d){return d+"次"});
            svg.selectAll("text2")
                .data(Object.keys(words))
                .enter()
                .append("text")
                .attr("x",function(d,i){return (w/17)*i})
                .attr("y",h-75)
                .attr("dx",w/17/2-23)
                .attr("fill","#b88230")
                .attr("font-weight","bold")
                .attr("font-size","20px")
                .text(function(d,i){return book[i]});
            
            
        }
    }
}
</script>
 
<style>
.contianer{
    position: relative;
    border: 0;
}
#histcloud{
    position:relative;

}

input{
        margin: 10px 0;
    }
.mess {
    position: relative;
    left:30%;
     width: 200px;
     height: 30px;
     border: 1px solid #139be1;
     border-radius: 5px;
     color: #b88230;
     font-size: 18px;
     font-weight: bold;
     background-color: #faf1d8;
     text-indent: 10px;
}
.btn{
   width: 200px;
   height: 30px; 
   color: #fff; 
   background: linear-gradient(0deg,#f3d19e 0%, #b88230 100%);
   font-family: 'Lato', sans-serif;
   font-weight: 500;
   border-radius: 10px;
   box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
   7px 7px 20px 0px rgba(0, 0, 0, .1),
   4px 4px 5px 0px rgba(0, 0, 0, .1);
   transition: all 0.3s ease;
   cursor: pointer;
   border: none;
   position: relative;
    left:33%;
   padding: 0;
}
.btn span{
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    font-size: 20px;
}
.btn::before,.btn::after{
    position:absolute;
    content: '';
    top: 0;
    right: 0;
    background: #b88230;
    transition: all 0.3s ease;
}
.btn::before{
    width: 0;
    height: 2px;
}
.btn::after{
    height: 0;
    width: 2px;
}
.btn span::before,
.btn span::after{
    position:absolute;
    content: '';
    bottom: 0;
    left: 0;
    background: #b88230;
    transition: all 0.3s ease;
}
.btn span::before{
    width: 0;
    height: 2px;
}
.btn span::after{
    height: 0;
    width: 2px;
}

.btn:hover{
    background: transparent;
    color: #b88230;
}

.btn:hover::before{
    width: 100%;
}
.btn:hover::after{
    height: 100%;
}
.btn span:hover::before{
    width: 100%;
}
.btn span:hover::after{
    height: 100%;
}




</style>