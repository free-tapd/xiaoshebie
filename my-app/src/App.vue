<template>
  <div id="app">
    <div class="container">
      <ul class="nav-top">
        <li class="back" @click="back">
          <span class="iconfont icon-xiangzuo"></span>
          <span >返回</span>
        </li>
        <li class="hos-address">
          <img src="./assets/images/logo.png" alt="">

        <li class="waring-date">
          <span>关闭</span>
          <span class="count-down">{{n}}s</span>
        </li>
      </ul>
      <div class="content">

        <router-view />
      </div>
    </div>
    <!-- cover -->
    <div class="cover" v-if="isShow">
      <div class="check-report">
        <p class="report-title">检查报告</p>
        <div class="report-inner">通过对人体血液、尿液等，进行包括血常规、肝功能、肾功能、血糖、大便潜血试验、尿蛋白、尿红细胞、微生物等的化验检查肾和生殖系统等。</div>
        <div class="report-btn" @click="isShow=!isShow">
          我已了解
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex"
  import {
    post,
    get
  } from "@/utils/http.js"
  import {
    setInterval,
    clearInterval
  } from 'timers';
  export default {
    data() {
      return {
        isShow: false,
        userInfo: {},
        n: 200
      }
    },
    name: 'App',
    computed: {
      ...mapState(['hospitalCode'])
    },
    components: {},
    mounted() {
      document.body.style.position = "fixed";
      document.body.style.left = 0;
      document.body.style.right = 0;
      document.body.style.bottom = 0;
      document.body.style.top = 0;
      // this.getUserMessage();
      this.closeReport()
    },
    methods: {
      back() {
        this.$router.back(-1)
      },
      //  定时器时间
      closeReport() {
        let timer = setInterval(() => {
          this.n--
          if (this.n <= 0) {
            clearInterval(timer);
            alert('关闭')
          }


        }, 1000)
      }

    }

  }

</script>

<style scoped lang="less">
  @nav: 122px;
  @t: 24px;
  @b: 34px;
  @l: 59px;
  @r: 59px;

  #app {
    min-height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
    /* padding: 24px 59px 34px; */
    // display: flex;
    // // align-items: stretch;
    // align-items: flex-start;
    background-color: #F8F8F8;

    >.container {
      padding: @t 59px @b;

      >.nav-top {
        display: flex;
        align-items: center;
        font-size: 40px;
        color: #333;
        justify-content: space-between;
        padding-bottom: 24px;

        >.hos-address {
          display: flex;
          align-items: center;

          >img {
            width: 432px;
            height: 91px;
            display: block;
            // border-radius: 50%;
            // margin-right: 15px;
          }
        }

        >.back {
          >.iconfont {
            font-size: 40px;
            color: #333;
          }
        }

        >.waring-date {
          font-size: 54px;
          width: 321px;
          height: @nav;
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 4px;
          line-height: @nav;
          text-align: center;

          >.count-down {
            color: #DB4946;
          }
        }
      }

      >.content {
        display: flex;
        align-items: flex-start;
        position: relative;
        // position: fixed;
        // bottom: @b;
        // left: @l;
        // right: @r;
        // top: @nav+@t;

        >.tab-left {
          flex: 0 0 auto;
        }

        >.right-inner {
          flex: 1 1 auto;
          background-color: #fff;
          margin-left: 18px;
          position: absolute;
          left: 0px+734;
          top: 0;
          right: 0;
          bottom: 0;
          overflow: scroll;
        }
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

  ::-webkit-scrollbar {
    display: none;
  }

</style>
