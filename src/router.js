import Vue from 'vue'
import Router from 'vue-router'
import Apply from './views/applylist.vue';
import Putaway from './views/putaway.vue';
import Ordermanage from './components/OrderManage/index.vue'
import OrderDetail from './components/OrderDetail'
import Refund from './components/Refund'
import Details from './views/Details.vue'
import Addcommodity from './views/Addcommodity.vue'
import Commoditydlist from './views/Commoditydlist.vue';
import CreateStore from './views/createStore.vue';
import MyStore from './views/MyStore.vue';
import AllStore from './views/AllStore.vue';
import AddSku from './views/addSku.vue';
import creatTwo from './views/lianxi/Createstore2.vue';
import Statement from './views/statement.vue';
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Home.vue')  //首页
    },
    {
      path: '/putaway',
      name: 'putaway',
      component: Putaway  //添加商品
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('./views/Login.vue')  //登录
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import('./views/register.vue')  //注册
    },
    {
      path: '/classify',
      name: 'classify',
      component: () => import('./views/classify.vue')  //分类
    },
    {
      path: '/details',
      name: 'details',
      component: Details  //商品详情
    },
    {
      path: '/commoditydlist',
      name: 'commoditydlist',
      component: Commoditydlist  //添加平台商品
    },
    {
      path: '/addcommodity',
      name: 'addcommodity',
      component: Addcommodity  //商品列表
    },{
      path: '/ordermanage',
      name: 'ordermanage',
      component: Ordermanage  //订单管理
    }, {
      path: '/orderDetail',
      name: 'orderDetail',
      component: OrderDetail  //订单详情
    },
    {
      path: '/refund',
      name: 'refund',
      component: Refund,  //退款
    },{
      path: '/apply',
      name: 'apply',
      component: Apply  //申请列表
    },
    {
      path: '/SetUpShop',
      name: 'SetUpShop',
      component: () => import('./views/SetUpShop.vue')  //设置店铺
    },
    
    {
      path: '/putaway',
      name: 'Putaway',
      component: Putaway  //添加商品
    },
    {
      path:'/createStore',
      name:'createStore',
      component:CreateStore //创建店铺
    },
    {
      path:'/mystore',
      name:'mystore',
      component:MyStore //我的店铺
    },
    {
      path:'/allstore',
      name:'allstore',
      component:AllStore //店铺列表
    },
    {
      path:'/addsku/:cat_id',
      name:'addsku',
      component:AddSku //添加SKU
    },
    {
      path:'/creatTwo',
      name:'creatTwo',
      component:creatTwo
    },
    {
      path:'/reportform',
      name:'reportform',
      component:()=>import('./views/ReportForm.vue')
    }
  ]
})

