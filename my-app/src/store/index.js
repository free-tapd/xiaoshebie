
import Vue from 'vue';
import Vuex from 'vuex';
// import * as actions from './actions';
// import * as mutations from './mutations';
// import * as getters from './getters';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
   
    itemName:0,//检验报告
    hospitalCode:"319009",  
    startDate:{},
    endDate:{} ,
    checkList:{
        value:[],
        isCheck:0
    }  
},
  // getters,
  // actions,
  // mutations
  mutations: {
    selItemName(state, change) {
        console.log(change);
        
      state.itemName=change;
    },
    saveDate(state,change){
        if(change.isStart==1){
            //开始时间 
            state.startDate={...change}
        }else{
            //结束时间
            state.endDate={...change}
        }
       

    },
    saveCheckReport(state,change){
        state.checkList=change
    }
   
  }
});

