import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import tabLeft from '@/components/tabLeft'
import report from '@/pages/report'
import reportDetail from '@/pages/reportDetail'
import date from '@/pages/date'
import checkDetail from '@/pages/checkDetail'

Vue.use(Router)

export default new Router({
  routes: [
   {
          path: "*",
          redirect: "/"
        },
    {
      path: "/",
      component: tabLeft,
      children: [{
          path: "/",
          component: HelloWorld
        },
       
        {
          path: "report",
          component: report
        },
        {
          path: "reportDetail",
          component: reportDetail
        },{
          path:"checkDetail",
          component:checkDetail
        },

        {
          path: "date",
          component: date,
        }
      ]
    },

  ]
})
