<template>
  <div class="date-packer">
    <div class="date-packer-title">
      <span class="iconfont icon-xiangzuo1" @click.stop="prevMonth"></span>
      <p>{{showDate.year}} {{keepDoubleDigit(showDate.month)}}</p>
      <span class="iconfont icon-right" @click.stop="nextMonth"></span>
    </div>
    <table>
      <thead>
        <tr>
          <th v-for="(v,i) in weeks" :key="i">{{v}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in rows" :key="index">
          <td v-for="(c,j) in item" :key="j" @click="selectDay(c)">
            <span :class="{'active':c.value==selectDate.day}" v-if="isend==1">{{c.value}}</span>
            <span :class="{'active-y':c.value==selectDate.day}" v-else>{{c.value}}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="sure-date" @click="confirm" v-if="false">
      确定
    </div>
  </div>
</template>
<script>
  // 阿拉伯数字 转 汉字数字的基本库
  const weekJson = {
    1: '日',
    2: '一',
    3: '二',
    4: '三',
    5: '四',
    6: '五',
    7: '六',

  };
  const monthJson = {
    1: '一月',
    2: '二月',
    3: '三月',
    4: '四月',
    5: '五月',
    6: '六月',
    7: '七月',
    8: '八月',
    9: '九月',
    10: '十月',
    11: '十一月',
    12: '十二月',
  };
  export default {
    name: 'DatePicker',
    props: {
      // 打开date picker的初始值，必传，格式是（2017-08-11）
      date: {
        type: String,
        required: true
      },
      // 日期最小值
      minDate: {
        type: String,
        default: '1970-01-01'
      },
      // 日期最大值
      maxDate: {
        type: String,
        default: '2020-12-31'
      },
      isend:{
        type:Number,
        default:1
      }
    },
    mounted() {
      // console.log(this.rows);
      //   console.log(this.showDate)
      console.log('是for是开始'+this.isend);
      

    },
    watch:{
      isend(newValue,oldValue){
        console.log(newValue);
        
      }
    },
    computed: {
      yearList() {
        const result = [];
        for (let i = this.copyMinDate.year; i <= this.copyMaxDate.year; i += 1) {
          result.push(i);
        }
        return result;
      },
      title() {
        // calendar 上面的所有 title 信息包括二部分
        return {
          year: '',
          monthday: '',
        };
      },
      rows() {
        const {
          year,
          month
        } = this.showDate;
        const months = (new Date(year, month, 0)).getDate();
        const result = [];
        let row = [];
        let weekValue;
        // 按照星期分组
        for (let i = 1; i <= months; i += 1) {
          // 根据日期获取星期，并让开头是1，而非0
          weekValue = (new Date(year + "-" + month + "-" + i)).getDay() + 1;
          // 判断月第一天在星期几，并填充前面的空白区域
          if (i === 1 && weekValue !== 1) {
            this.addRowEmptyValue(row, weekValue);
            this.addRowDayValue(row, i);
          } else {
            this.addRowDayValue(row, i);
            // 判断月最后一天在星期几，并填充后面的空白区域
            if (i === months && weekValue !== 7) {
              this.addRowEmptyValue(row, (7 - weekValue) + 1);
            }
          }
          // 按照一周分组
          if (weekValue % 7 === 0 || i === months) {
            result.push(row);
            row = [];
          }
        }
        this.showDate.monthStr = monthJson[this.showDate.month];
        return result;
      },
    },
    data() {
      return {
        selectDate: {
          year: '',
          month: '',
          day: '',
          week: '',
          date: '',
          weekStr: '',
          monthStr: '',
        }, // 选择的时间，默认是用户传的date时间
        showDate: {
          year: '',
          month: '',
          day: '',
          week: '',
          date: '',
          monthStr: '',
          weekStr: '',
        },
        copyMinDate: {
          year: '',
          month: '',
          day: '',
        },
        copyMaxDate: {
          year: '',
          month: '',
          day: '',
        },
        toolbar: '',
        fadeXType: 'fadeX_Prev',
        nextMonthClick: false,
        prevMonthClick: false,
        showYear: false,
        weeks: weekJson
      };
    },
    created() {
      this.initDatePicker();
    },
    methods: {
      initDatePicker() {
        this.showDate = {
          ...this.splitDate(this.date, true)
        };
        this.copyMinDate = {
          ...this.splitDate(this.minDate)
        };
        this.copyMaxDate = {
          ...this.splitDate(this.maxDate)
        };
        this.selectDate = {
          ...this.showDate
        };
      },
      splitDate(date, addStr) {
        let result = {};
        const splitValue = date.split('-');
        try {
          if (!splitValue || splitValue.length < 3) {
            throw new Error('时间格式不正确');
          }
          result = {
            year: Number(splitValue[0]),
            month: Number(splitValue[1]),
            day: Number(splitValue[2]),
          };
          if (addStr) {
            result.week = (new Date(`"${result.year}- ${result.month}-${result.day}"`)).getDay() + 1;
            result.monthStr = monthJson[result.month];
            result.weekStr = weekJson[result.week];
          }
        } catch (error) {
          console.error(error);
        }
        console.log(result);

        return result;
      },
      addRowEmptyValue(row, count) {
        for (let w = 1; w < count; w += 1) {
          row.push({
            value: '',
          });
        }
      },
      addRowDayValue(row, i) {
        const value = {
          value: i
        };
        const {
          day,
          month,
          year
        } = this.selectDate;
        const showDate = this.showDate;
        // 判断已经选择的
        if (year === showDate.year && month === showDate.month && day === i) {
          value.selected = true;
        }
        // 当日期在最小值之外，禁止点击
        if (this.isMinLimitMonth() && i < this.copyMinDate.day) {
          value.disabled = true;
        }
        // 当日期在最大值之外，禁止点击
        if (this.isMaxLimitMonth() && i > this.copyMinDate.day) {
          value.disabled = true;
        }
        row.push(value);
      },
      /**
       * 切换到上一个月
       */
      prevMonth() {
        if (this.prevMonthClick) {
          return;
        }
        this.prevMonthClick = true;
        setTimeout(() => {
          this.prevMonthClick = false;
        }, 500);
        this.fadeXType = 'fadeX_Prev';
        // 如何当前月份已经小于等于minMonth 就不让其在执行
        if (this.isMinLimitMonth()) {
          return;
        }
        const {
          year,
          month
        } = this.showDate;
        // 判断当前月份，如果已经等于1（1就是一月，而不是二月）
        if (month <= 1) {
          this.showDate.year = year - 1;
          this.showDate.month = 12;
        } else {
          this.showDate.month -= 1;
        }

        this.saveDateInfo(this.showDate)
      },
      /**
       * 切换到下一个月
       */
      nextMonth() {
        if (this.nextMonthClick) {
          return;
        }
        this.nextMonthClick = true;
        setTimeout(() => {
          this.nextMonthClick = false;
        }, 500);
        this.fadeXType = 'fadeX_Next';
        // 如何当前月份已经大于等于maxMonth 就不让其在执行
        if (this.isMaxLimitMonth()) {
          return;
        }
        const {
          year,
          month
        } = this.showDate;
        // 判断当前月份，如果已经等于12（12就是十二月）
        if (month >= 12) {
          this.showDate.year = year + 1;
          this.showDate.month = 1;
        } else {
          this.showDate.month += 1;
        }
        this.saveDateInfo(this.showDate)
      },

      resetSelectDate(dayValue) {
        this.selectDate = {
          ...this.showDate
        };
        this.selectDate.day = dayValue;
        this.selectDate.week = (new Date(this.showDate.year + "-" + this.showDate.month + "-" + dayValue)).getDay() + 1;
        this.selectDate.weekStr = weekJson[this.selectDate.week];
        console.log(this.selectDate)
      },
      selectDay(d) {
        if (d.disabled || d.selected || d.value === '') {
          return;
        }
        this.resetSelectDate(d.value);
        this.saveDateInfo(this.selectDate)
        this.changeJump('/',{})
      },
      selectYear(value) {
        this.showYear = false;
        this.showDate.year = value;
        let type;
        // 当日期在最小值之外，月份换成最小值月份 或者 当日期在最大值之外，月份换成最大值月份
        if (this.isMinLimitMonth()) {
          type = 'copyMinDate';
        } else if (this.isMaxLimitMonth()) { // 当日期在最大值之外，月份换成最大值月份
          type = 'copyMaxDate';
        }
        if (type) {
          this.showDate.month = this[type].month;
          this.showDate.day = this[type].day;
          this.resetSelectDate(this.showDate.day);
          return;
        }
        let dayValue = this.selectDate.day;
        // 判断日是最大值，防止另一个月没有这个日期
        if (this.selectDate.day > 28) {
          const months = (new Date(this.showDate.year, this.showDate.month, 0)).getDate();
          // 当前月份没有这么多天，就把当前月份最大值赋值给day
          dayValue = months < dayValue ? months : dayValue;
        }
        this.resetSelectDate(dayValue);
      },
      isMinLimitMonth() {
        return this.showDate.year <= this.copyMinDate.year && this.showDate.month <= this.copyMinDate.month;
      },
      isMaxLimitMonth() {
        return this.showDate.year >= this.copyMaxDate.year && this.showDate.month >= this.copyMaxDate.month;
      },
      openYearList() {
        if (this.showYear) {
          this.showYear = false;
          return;
        }
        const index = this.yearList.indexOf(this.selectDate.year);
        this.showYear = true;
        setTimeout(() => {
          this.$refs.yearList.scrollTop = (index - 3) * 40;
        });
      },
      openCalendarList() {
        this.showYear = false;
      },
      // 保持两位数
      keepDoubleDigit(number) {
        return number > 9 ? number : `0${number}`;
      },
      confirm() {
        const {
          year,
          month,
          day,
          week,
          weekStr,
          monthStr
        } = this.selectDate;
        
        this.$emit('confirm', {
          date: `${year}-${this.keepDoubleDigit(month)}-${this.keepDoubleDigit(day)}`,
          year,
          month,
          week,
          monthStr,
          weekStr,
          day,

        });
      },

      cancel() {
        this.$emit('cancel');
      },
      // 保存当时的时间dao store
      saveDateInfo(obj){
          const {
          year,
          month,
          day,
          week,
          weekStr,
          monthStr
        } = obj;
        
        this.$emit('confirm', {
          date: `${year}-${this.keepDoubleDigit(month)}-${this.keepDoubleDigit(day)}`,
          year,
          month,
          week,
          monthStr,
          weekStr,
          day,

        });
      }

    },
  };

</script>



<style lang="less" scoped>
  .date-packer {

    padding: 22px;

    >.date-packer-title {
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      >.iconfont {
        font-size: 35px;
        color: #999;
        font-weight: bold;
      }

      >p {
        font-size: 46px;
        color: #333;
      }
    }

    >table {
      width: 100%;

      >thead {
        >tr {
          >th {
            font-size: 45px;
            color: #333;
            padding: 30px 0;
          }
        }
      }

      >tbody {
        >tr {
          >td {
            text-align: center;
            font-size: 45px;
            color: #333;
            position: relative;
            padding: 15px 0;

            >span {
              display: block;
              width: 73px;
              height: 73px;
              line-height: 73px;
              // text-align: center;
              // color: #fff;
              border-radius: 50%;
              background-color: transparent;
              margin: 0 auto;
            }
          }
        }
      }
    }
    >.sure-date{
      position: absolute;
      right: 54px;
      bottom: 43px;
      font-size: 36px;
      color:#079FFF;
      text-align: right;
    }
  }

  .active {
    background-color: #3BB3FF!important;
    color: #fff;
  } 
  .active-y {
    background-color: #FFA403!important;
    color: #fff;
  }

</style>
