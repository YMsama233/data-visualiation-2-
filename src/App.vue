<!-- <script setup>
import Test from './components/sunburn.vue'
</script> -->


<template>
  <div class="back">
      <div class="title">
        <h1 style="margin: 0;">基于成语数据库的可视化处理</h1>
        <p class="from">数据来源：map_cy</p>
      </div>
      <div class="common-layout">
        <el-container>
          <el-container>
            <el-aside width="300px" class="aside" >
              
              <el-scrollbar class="el-scrollbar">
                <div class="pic">
                </div>
                <el-menu 
                default-active="2"
                background-color=#f3d19e
                class="menu"
                @open="handleOpen"
                @close="handleClose"
                >
                  <el-sub-menu index="1">
                    <template #title>
                      <el-icon><Menu/></el-icon><p style="font-size: 24px;color:#b88230">可视化图片列表</p>
                    </template>
                        <el-menu-item index="1-1" ><router-link to="/hist">直方图</router-link></el-menu-item>
                        <el-menu-item index="1-2" ><router-link to="/arc">饼图</router-link></el-menu-item>
                        <el-menu-item index="1-3" ><router-link to="/wordcloud">词云图</router-link></el-menu-item>
                        <el-menu-item index="1-4" ><router-link to="/power">力导向图</router-link></el-menu-item>
                        <el-menu-item index="1-5" ><router-link to="/density">密度图</router-link></el-menu-item>
                        <el-sub-menu index="1-6" class="menu1">
                          <template #title><p style="font-size: 18px;color:#b88230">层次树图</p></template>
                          <el-menu-item index="1-6-1" ><router-link to="/tree1">水平树图</router-link></el-menu-item>
                          <el-menu-item index="1-6-2" ><router-link to="/tree2">圆形树图</router-link></el-menu-item>
                        </el-sub-menu>
                        
                  </el-sub-menu>
                </el-menu>
                <div class="pic">
                </div>
              </el-scrollbar>
            </el-aside>

            <el-main class="el-main">
              <router-view></router-view>
            </el-main>
            


          </el-container>
        </el-container>
      </div>
      <div style="text-align: right;">@20数科　　张劲涛　　赵笑天</div>
    </div>
  </template>

<script>
export default {
  name: 'App',
}
</script>

<style>
.title{
  text-align: center;
  font-size: 46px;
  border: 0;
  margin: 0px;
  padding: 0;
  color:#a86d13;
  stroke:black;
  stroke-width: 5px;

}
body{
  border:0;
  margin:0;
  padding:0;
  background-size: cover;
  background:url(back.png)
}
.el-main{
  position: relative;
  width: 1000px;
  height:700px;
  background-color:#faecd8ad;
  position: relative;
  border: 6px solid #b88230;
  stroke-width: 1px;
}
.aside{
  box-shadow: --el-box-shadow-dark;
  position: relative;
  height:300px;
  background-color:#b88230;
  position: relative;
  border: 6px solid #b88230;
  stroke: #b88230;
  stroke-width: 1px;
  height:700px;
}
.pic{
  width:300px;
  height: 100px;
  background-size:cover;
  background-image: url(qiming1.png);
}
.menu{
  font-weight: bolder;
  height:500px;
}
.menu1{
  height:10;
}
.from{
  font-size: 30px;
  border:0;
  margin: 0;
  text-align: right;
}
a{
  text-decoration: none;
  color:#b88230;
  font-size:18px
}
.router-link-active {
  text-decoration: none;
}

</style>
