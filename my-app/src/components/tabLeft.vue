<template>
  <div class="co">


    <div class="tab-left">
      <div class="name-card">
        <p class="name" v-cloak>{{userInfo.Name}}</p>
        <p v-cloak><span>身份证号: </span> <span>{{userInfo.IdCardNo}}</span></p>
        <p v-cloak><span>就诊卡号: </span> <span>{{userInfo.CardNum}}</span></p>
      </div>
      <div class="sel-date">
        <p>请选择查询日期</p>
        <div class="date-box">
          <div class="start" @click.stop="changeJump('date',{value:1})">
            <p><span class="icon-start">起</span> <span>{{startDate.date?startDate.date:"开始时间"}}</span></p>
            <span class="iconfont icon-right"></span>
          </div>
          <div class="end" @click.stop="changeJump('date',{value:2})">
            <p><span class="icon-end">止</span> <span>{{endDate.date?endDate.date:"结束时间"}}</span></p>
            <span class="iconfont icon-right"></span>
          </div>
        </div>
        <div class="date-btn" @click="getReport">查询</div>
      </div>
    </div>
    <div class="tab-right">
      <router-view></router-view>
    </div>
    <!-- <div class="cover">

    </div> -->
  </div>
</template>
<script>
  import {
    post,
    get
  } from "@/utils/http.js"
  import {
    mapState,
    mapMutations
  } from "vuex"
  export default {

    data() {
      return {
        userInfo: {},
        checkList:[]
      }
    },
    computed: {
      ...mapState(['hospitalCode', "startDate", "endDate"])
    },
    mounted() {
      this.getUserMessage();
      // console.log(this.startDate);
      // this.getCheckList()

    },
    methods: {
        ...mapMutations(['saveCheckReport']),
      /**
       * @params {String}cardNum  就诊卡号 6620251230
       * @params {Number}hospitalCode 医院代码319009
       */
      getUserMessage() {
        get('RechargeController/getCardInfo.do', {
          cardNum: "E00225634",
          hospitalCode: this.hospitalCode
        }).then(res => {
          if (res.code == 0) {
            this.userInfo = JSON.parse(res.data)[0];
            console.log(this.userInfo);

          }
        })
      },
      /**
       * @params {String}  ：hospitalCode     医院代码
       * @params {String} patientId			HisId 根据查询用户卡信息获取
       * @params {String} IdCard			身份证号
       * @params {string}healthyCard		就诊卡号
       * @params {string} startDate			开始时间	
       * @params {string} endDate			结束时间
       * @params {String} itemName		检查项目
       * @params {Number} patientType		报告类型( 0 )
       * 
       * 测检验报告的数据：张玉洁 13050219890408002X 15930050942 就诊卡号：6620251230
       * 
       */

      getReport(item) {
        let itemName = this.$store.state.itemName; //[0] 检验报告 【1】检查报告
        let params = {
          hospitalCode: this.hospitalCode,
          patientId: this.userInfo.HisId,
          IdCard: "130502195104180328",
          healthyCard: "E00225634",
          startDate: this.startDate.date,
          endDate: this.endDate.date,
          itemName: itemName ? "检查报告" : "检验报告",
          patientType: 0
        }
        if (!params.startDate && !params.endDate) {
          // this.$message('这是一条消息提示');
          alert('请选择开始时间或结束时间')
        } else {

          if (!itemName) {
            get('ReportController/getLisReport.do', params).then(res => {
              if (res.code == 0) {
                this.saveCheckReport({value:[...JSON.parse(res.data)],isCheck:itemName})
                this.changeJump('report', {
                  
                })
              } else {

                alert(res.memo)
              }
            })
          } else {
            this.getCheckList(itemName)
          }

        }
      },
      getCheckList(itemName) {
        get('ReportController/getPacsReport.do?', {
          hospitalCode: "319009",
          IdCard: "130502196204081233",
          patientId: "660001429574",
          healthyCard: "6621252261",
          startDate: "2018-01-12",
          endDate: "2019-04-12",
          itemName: "",
          patientType: 0
        }).then(res => {
          console.log(res)
          if (res.code == 0) {
            console.log(JSON.parse(res.data));

            this.checkList = JSON.parse(res.data);
            this.saveCheckReport({value:[...this.checkList],isCheck:itemName})
            this.changeJump('report', {
                  
                })
          }
        })
      }

    }
  }

</script>

<style lang="less" scoped>
  .co {
    display: flex;
    align-items: center;

    >.tab-left {
      flex: 0 0 auto;
    }

    >.tab-right {
      flex: 1 1 auto;
      background-color: #fff;
      margin-left: 18px;
      position: absolute;
      left: 0px+734;
      top: 0;
      right: 0;
      bottom: 0;
      // width: 1017px;
      overflow: scroll;
    }
  }

  .tab-left {
    // height:500px;
    width: 734px;
    // width: 100%;
    // background-color: #f00;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    >.name-card {
      //   width: 734px-41*2;
      //   height: 262px-41*2;
      margin-bottom: 18px;
      padding: 0 41px;
      background: rgba(255, 255, 255, 1);
      font-size: 36px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 56px;
      height: 262px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      >.name {
        font-size: 46px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 89px;
      }
    }

    >.sel-date {
      display: flex;
      flex-direction: column;
      padding: 27px 45px;
      background: #fff;

      >p {
        width: 271px;
        font-size: 36px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 89px;
      }

      >.date-box {
        margin-top: 32px;

        >.start {
          margin-bottom: 13px;
        }

        >.start,
        .end {
          padding: (47px-30/2px) 44px;
          background: rgba(248, 248, 248, 1);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 38px;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          line-height: 76px;

          >p {
            display: flex;
            align-items: center;
          }
        }

        & .icon-end,
        .icon-start {
          vertical-align: middle;
          display: inline-block;
          width: 43px;
          height: 43px;
          font-size: 24px;
          color: #fff;
          line-height: 43px;
          text-align: center;
          border-radius: 50%;
          background-color: #3BB3FF;
          margin-right: 29px;
        }

        & .icon-end {
          background-color: #FFA403;
        }

        & .iconfont {
          font-size: 35px;

        }
      }

      >.date-btn {
        margin-top: 33px;
        width: 651px;
        height: 139px;
        background: rgba(7, 159, 255, 1);
        border-radius: 4px;
        line-height: 139px;
        text-align: center;
        font-size: 46px;
        color: #fff;
        font-weight: bold;
      }
    }
  }

</style>
