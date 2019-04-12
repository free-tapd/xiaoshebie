<template>
  <div class="hello">
    <div class="visiting">
      <p class="v-title">门诊</p>
      <div class="report-box">
        <div class="report-item" :class="{'active-check1':cur==0}" @click="orCheck(0)">
          <div class="img-box">
            <img src="../assets/images/check1.png" alt="">
            <span>检验报告</span>
          </div>
          <span class="iconfont icon-right"></span>

        </div>
        <span class="why-report" @click.stop="whyCheck(0)">什么是检验报告?</span>
      </div>
      <div class="report-box">
        <div class="report-item " :class="{'active-check2':cur==1}" @click="orCheck(1)">
          <div class="img-box">
            <img src="../assets/images/check2.png" alt="">
            <span>检查报告</span>
          </div>
          <span class="iconfont icon-right"></span>

        </div>
        <span class="why-report" @click.stop="whyCheck(1)">什么是检查报告?</span>
      </div>
    </div>


    <!-- cover -->
    <div class="cover" v-if="isShow">
      <div class="check-report">
        <p class="report-title">{{alertObj.title}}</p>
        <div class="report-inner">{{alertObj.content}}</div>
        <div class="report-btn" @click="isShow=!isShow">
          我已了解
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapMutations
  } from 'vuex'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        isShow: false,
        alertObj: {},
        cur: 0,
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      console.log(this.$store.state.itemName);

    },
    methods: {
      ...mapMutations(['selItemName']),
      orCheck(value) {
        this.cur = value;
        this.selItemName(value)
      },
      whyCheck(value) {
        let obj = {}
        if (value == 0) {
          // 检验报告
          obj.title = "检验报告"
          obj.content = "通过对人体血液、尿液等，进行包括血常规、肝功能、肾功能、血糖、大便潜血试验、尿蛋白、尿红细胞、微生物等的化验检查肾和生殖系统等。"
        } else {
          obj.title = "检查报告"
          obj.content = "通过心电图、X光胸透、CT、腹部B超、病理等方式对身体内部器官各种疾病进行筛查，包括肝、胆、脾、肺、肾和生殖系统等。"
        }
        this.alertObj = obj;
        this.isShow = !this.isShow


      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello {
    background-color: black;
    // height: 500px;

  }

  .visiting {
    background-color: #fff;
    padding: 44px;

    >.v-title {
      color: #333;
      font-size: 46px;
      margin-bottom: 70px;
      font-weight: bold;

    }

    >.report-box {
      margin-bottom: 70px;

      >.report-item {
        background: #CECECE;
        box-shadow: 1px 4px 10px 0px rgba(2, 157, 255, 0.2);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 41px;

        &>.img-box {
          display: flex;
          align-items: center;

          >img {
            width: 107px;
            height: 103px;
            display: block;
            margin-right: 45px;
          }

          >span {
            font-size: 46px;
            font-weight: 400;
            color: rgba(255, 254, 254, 1);
          }
        }

        >.iconfont {
          font-size: 35px;
          color: #fff;
        }
      }

      >.why-report {
        font-size: 38px;
        font-weight: 400;
        color: rgba(255, 150, 0, 1);
        line-height: 89px;
      }
    }
  }

  .cover {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .check-report {
    padding: 46px 28px;
    width: 906px-28*2;
    height: 489px-46*2;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: relative;

    >.report-title {
      font-size: 46px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 58px;
      text-align: center;
      margin-bottom: 40px;
    }

    >.report-inner {
      font-size: 36px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }

    >.report-btn {
      text-align: center;
      border-top: 2px solid #D7D7D7;
      padding-top: 34px;
      font-size: 46px;
      font-weight: 400;
      color: rgba(0, 156, 255, 1);
      position: absolute;
      bottom: 34px;
      left: 0;
      right: 0;
    }
  }

  .active-check1 {
    background: linear-gradient(110deg, rgba(59, 179, 255, 1), rgba(0, 156, 255, 1)) !important;
  }

  .active-check2 {
    background: linear-gradient(110deg, rgba(255, 184, 59, 1), rgba(255, 150, 0, 1)) !important;
  }

</style>
