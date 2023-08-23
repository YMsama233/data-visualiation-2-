<template>
    <div class="container">
        <input v-model="user" 
        class="mess"
        size="large" 
        placeholder="输入查询的关键字">
            <button @click="getUser" class="btn"><span>点击生成词云图</span></button>
        <div id="wordcloud"> 
        </div>
    </div>
</template>


<script>
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
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


            var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var h=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            w=w*0.98;
            h=h*0.98;


            var words=new Array(56);

            var book=[];
            book[0]="晋书";book[1]="汉书";
            book[2]="诗经";book[3]="史记";
            book[4]="左传";book[5]="礼记";
            book[6]="论语";book[7]="春秋";
            book[8]="三国";book[9]="宋书";
            book[10]="唐书";book[11]="庄子";
            book[12]="老子";book[13]="周易";
            book[14]="梁书";book[15]="明史";
            book[16]="战国";book[17]="后汉书";
            book[18]="秦";book[19]="汉";
            book[20]="晋";book[21]="孟子";
            book[22]="公羊传";book[23]="东观汉记";
            book[24]="南唐";book[25]="唐";
            book[26]="宋";book[27]="元";
            book[28]="隋";book[29]="明";
            book[30]="清";book[31]="南朝";
            book[32]="五代";book[33]="十国";
            book[34]="韩非子";book[35]="魏";
            book[36]="三国志";book[37]="孝经";
            book[38]="天地";book[39]="项羽本纪";
            book[40]="淮南子";book[41]="无名氏";
            book[42]="金刚经";book[43]="元史";
            book[44]="仪礼";book[45]="诗";
            book[46]="书";book[47]="词";
            book[48]="传";book[49]="记";
            book[50]="荀子";book[51]="赋";
            book[52]="铭";book[53]="论";
            book[54]="经";book[55]="典";


            
            for(var i=0;i<56;i++){ 
                words[i]={text:book[i],size:res.data[i]};
            }
            console.log(words)
                        
            const color = d3.scaleOrdinal(d3.schemeCategory10);
            const svg = d3
                .select('#wordcloud')
                .append('svg')
                .attr('width', w*0.6)
                .attr('height', h*0.8);


            const layout = cloud()
                .size([w*0.6, h*0.7])
                .words(
                words.map(function(d) {
                    return d;
                })
                )
                .padding(5)
                .rotate(function() {
                return Math.random() * 45;
                })
                .font('Impact')
                .fontSize(function(d) {
                return d.size+35;
                })
                .on('end', draw);
                
            console.log(layout)
            layout.start();
            
            function draw(words) {
                svg
                .append('g')
                .attr('transform', `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
                .selectAll('text')
                .data(words)
                .enter()
                .append('text')
                .attr('fill', (_, i) => color(i))
                .style('font-size', function(d) {
                    return `${d.size}px`;
                })
                .style('font-family', 'Impact')
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                    return `translate(${[d.x, d.y]})rotate(${d.rotate})`;
                })
                .text(function(d) {
                    return d.text;
                });
            
            }
        }
    }
}
</script>
 
<style>
.contianer{
    position: relative;
    border: 0;
}
#wordcloud{
    position:relative;
    top:50px;
    left:100px;
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