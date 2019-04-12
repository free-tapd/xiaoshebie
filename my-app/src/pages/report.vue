<template>
  <div class="report-list">
    <p class="report-title">报告列表</p>

    <cellInput type="0" :title="v.itemname" :value="v.yr" :islink="true" :isBorder="true"
      @click.native="changeJump('./reportDetail',{item:JSON.stringify(v) })" v-for="(v,i) in reportArr" :key="i"
      v-if="isCheck==0" />

    <!-- <cellInput type="0" title="乙肝五项对照表" value="06-12" islink="true" isBorder="true"/> -->

    <cellInput type="0" :title="v.ExamBodyPart" :value="v.yr" :islink="true" :isBorder="true"
      @click.native="changeJump('./checkDetail',{item:JSON.stringify(v) })" v-for="(v,i) in reportArr" :key="i"
      v-if="isCheck==1" />

    <!-- <cellInput type="0" title="乙肝五项对照表" value="06-12" islink="true" isBorder="true"/> -->

  </div>
</template>
<script>
  import cellInput from "@/components/cellInput"
  import {
    dateString
  } from "@/utils/date.js"
  export default {
    data() {
      return {
        // checkArr: JSON.parse(this.$route.query.value),
        isCheck: 1,
        reportArr:[]
      }
    },
    components: {
      cellInput
    },
    computed: {
      
    },
    mounted() {
        this.amendDate()
    },
    methods: {
amendDate() {
        // let a = JSON.parse(this.$route.query.value)
        let a = this.$store.state.checkList.value
        console.log(a);
        if (a.length <= 0) {
          return
        } else {


          if (Number(this.$store.state.checkList.isCheck)) {
            //   1 检查报告
            // JSON.stringify

            a.forEach(v => {
              let obj = dateString(v.ExamDate);
              // console.log(obj);
              this.$set(v, 'yr', `${obj.M}-${obj.D}`)
              this.$set(v, 'nyr', `${obj.Y}-${obj.M}-${obj.D}`)
            })
          } else {
            //0检验报告 
            a.forEach(v => {
              let obj = dateString(v.checkdate);
              // console.log(obj);
              this.$set(v, 'yr', `${obj.M}-${obj.D}`)
              this.$set(v, 'nyr', `${obj.Y}-${obj.M}-${obj.D}`)

            })
          }
        }
        this.reportArr=a;
        console.log(this.reportArr);
        
        this.isCheck=this.$store.state.checkList.isCheck;
      }
    }
  }

</script>
<style lang="less" scoped>
  .report-list {
    overflow: scroll;

    >.report-title {
      padding: 41px 47px;
      font-size: 46px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #d7d7d7;
    }
  }

</style>
