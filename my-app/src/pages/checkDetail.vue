<template>
  <div class="report-detail">
    <p class="doctor"><span>医生:</span> <span>{{doctorItem.checkdoctor}} ({{doctorItem.sectionName}})</span></p>
    <p class="check-date"><span>检验时间：{{doctorItem.nyr}}</span> </p>

    <!-- 小虎内科 -->
    <ul class="check-list" >
      <li> <span>检查名称：</span> <span>{{doctorItem.ExamBodyPart}}</span></li>
      <li> <span>检查类型：</span> <span>{{doctorItem.ModalityType}}</span></li>
      <li> <span>
          检查方法：
        </span> <span>
          {{doctorItem.ExamMethod}}
        </span></li>
      <li> <span>影像诊断:</span>
        <span>{{doctorItem.Impression}}</span></li>
      <li> <span>临床诊断:</span> <span style="color:#666;">{{doctorItem.ClinicDiagnose}}</span></li>
      <li> <span>检查时间:</span> <span style="color:#666">{{doctorItem.nyr}} {{doctorItem.ExamTime}}</span></li>
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
        // get('ReportController/getLisDetail.do', {
        //   hospitalCode: this.$store.state.hospitalCode,
        //   type: 0, //		常规检查:0  微生物检查:1	
        //   itemid , //	项目id
        //   PatientType: 0 //		患者类型(默认0)

        // }).then(res=>{
        //   console.log(JSON.parse(res.data) );
        //   if(res.code==0){
        //     this.detailArr=JSON.parse(res.data);
        //   }
          
        // })
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
