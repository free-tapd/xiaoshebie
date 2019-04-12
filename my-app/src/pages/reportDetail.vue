<template>
  <div class="report-detail">
    <p class="doctor"><span>医生:</span> <span>{{doctorItem.checkdoctor}} ({{doctorItem.sectionName}})</span></p>
    <p class="check-date"><span>检验时间：{{doctorItem.nyr}}</span> </p>
    <ul class="table-box">
      <li class="report-first-title">
        <p>检查项目</p>
        <p>单位</p>
        <p>参考范围</p>
      </li>
      <li v-for="(v,i) in detailArr" :key="i">
        <p>{{v.itemdetail}}</p>
        <p class="isdown" v-if="v.ResultStatus==-1"> {{v.ReportValue}} </p>
        <p class="isup" v-if="v.ResultStatus==1"> {{v.ReportValue}} </p>
        <p  v-if="v.ResultStatus==0"> {{v.ReportValue}} </p>
        <p>{{v.RefRange}}</p>
      </li>
      
    </ul>
    <!-- 小虎内科 -->
    <ul class="check-list" v-if="false">
      <li> <span>检查名称：</span> <span>胸部ＣＴ</span></li>
      <li> <span>检查类型：</span> <span>常规检查</span></li>
      <li> <span>
          检查方法：
        </span> <span>
          CT拍照
        </span></li>
      <li> <span>影像诊断:</span>
        <span>胸廓对称，所见双侧肋骨走形自然，未见畸形，胸廓对称，所见双侧肋骨走形自然，未见畸形，胸廓对称，所见双侧肋骨走形自然，未见畸形，胸廓对称，所见双侧肋骨走形自然，未见畸形。</span></li>
      <li> <span>临床诊断:</span> <span>胸部正位未见明显异常</span></li>
      <li> <span>检查时间:</span> <span>2018-01-21 11:01</span></li>
    </ul>
  </div>
</template>
<script>
  import {
    post,
    get
  } from "@/utils/http.js"
import { log } from 'util';
  export default {
    data(){
      return {
        detailArr:[],
        doctorItem:{},
      }
    },
    mounted(){
      this.getDetail()
    },
    methods: {
      //获取报告详情
      getDetail() {
        let item= JSON.parse(this.$route.query.item);
        const {itemid}=item;
        this.doctorItem={...item};
        get('ReportController/getLisDetail.do', {
          hospitalCode: this.$store.state.hospitalCode,
          type: 0, //		常规检查:0  微生物检查:1	
          itemid , //	项目id
          PatientType: 0 //		患者类型(默认0)

        }).then(res=>{
          console.log(JSON.parse(res.data) );
          if(res.code==0){
            this.detailArr=JSON.parse(res.data);
          }
          
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .report-detail {
    padding: 41px;
    font-size: 44px;
    font-weight: 400;
    color: rgba(82, 82, 82, 1);
    line-height: 89px;

    >.doctor {}

    >.table-box {
      color: #000000;
      font-size: 36px;

      >.report-first-title {
        padding: 29px 22px;
        background-color: #F8F8F8;
        display: flex;
        align-items: center;
        font-size: 36px;
        color: #000000;

        >p {
          flex: 1;
          text-align: center;
        }
      }

      >li:not(.report-first-title) {
        padding: 50px 22px 30px 22px;
        border-bottom: 1px solid #D7D7D7;
        display: flex;
        align-items: center;

        >p {
          flex: 1;
          text-align: center;
        }
      }

    }

    >.check-list {
      font-size: 36px;
      color: #333;
      line-height: 57px;

      >li {
        font-weight: 400;
        display: flex;
        align-items: flex-start;

        // flex-wrap: wrap;
        >span {
          display: inline-block;
        }

        >span:first-child {
          width: 40*5px;
          min-width: 200px;
        }
      }
    }
  }

  .isdown {
    position: relative;

  }

  .isdown::after {
    width: 24px;
    height: 29px;
    content: "";
    display: block;
    background-image: url('../assets/images/down.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -29/2px;
    right: 10%;
  }
  .isup{
    position: relative;
  }
  .isup::after{
    width: 24px;
    height: 29px;
    content: "";
    display: block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    position: absolute;
    top: 50%;
    margin-top: -29/2px;
    right: 10%;
background-image: url('../assets/images/up.png')!important;
  }

</style>
