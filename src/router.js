import { createRouter,createWebHashHistory } from "vue-router";
import Sunburn1 from "./components/sunburn1.vue"
import Sunburn2 from "./components/sunburn2.vue"
import Bubble1 from "./components/bubbletree1.vue"
import Bubble2 from "./components/bubbletree2.vue"
import TreeMap1 from "./components/treemap1.vue"
import TreeMap2 from "./components/treemap2.vue"
import userInfo from "./components/userInfo.vue"
import power from "./components/li_shu.vue"
import hist from "./components/hist.vue"
import arc from "./components/arc.vue"
import tree1 from "./components/tree_T.vue"
import tree2 from "./components/tree_T2.vue"
import density from "./components/density_D.vue"


const router=createRouter({
 history:createWebHashHistory(),
 routes:[
    
    {
        path:'/hist',
        component:hist,
    },
    {
        path:'/arc',
        component:arc,
    },
    {
        path:'/tree1',
        component:tree1,
    },
    {
        path:'/tree2',
        component:tree2,
    },
    {
        path:'/density',
        component:density,
    },
    {
        path:'/wordcloud',
        component:userInfo,
    },
    {
        path:'/power',
        component:power,
    }

 ]
});

export default router;