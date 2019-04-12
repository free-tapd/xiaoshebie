<template>
  <div class="dete">
    <datePacker :date="value" @confirm="confirm" :isend="setDate"/>
  </div>
</template>
<script>
// import Calendar from 'vue2-slot-calendar';
import datePacker from "@/components/datePacker"
import { getDay } from "@/utils/date.js"
import {mapMutations} from "vuex"
import { get } from 'http';
  export default {
    data() {
      return {
        disabled: [],
        value: getDay(),
        setDate:1
        
      };
    },
    components: {
      datePacker,
    },
    watch:{
			'$route'(to,from){
        this.setDate=this.$route.query.value
        console.log(typeof this.setDate)
        // console.log(this.setDate);
        
      }
    },
    mounted(){
      // console.log(getDay());s
      
    },
    methods:{
      ...mapMutations(['saveDate']),
      confirm(msg){
        // this.$emit('confirm',msg)
        console.log(msg);
        
        this.saveDate({...msg,isStart:this.$route.query.value})
        // console.log(this.$store.state)
      }
    }

  };

</script>
