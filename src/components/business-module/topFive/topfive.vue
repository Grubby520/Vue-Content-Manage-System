<template>
  <div class="el-top5">
    <div class="top5-title">{{title}}</div>
    <div class="top5-content">
      <div v-if="isNoData" class="noData">
      </div>
      <div v-else class="progress-plugin">
        <top-five-item
          v-for="(item, index) in dataList"
          :key="index"
          :item="item"
          :unit="unit"
          :index="index">
        </top-five-item>
      </div>
    </div>
  </div>
</template>



<script>
  import './topfive.css'
  import topFiveItem from './topfive-item.vue'

  export default {
    name: 'TopFive',

    components: {
      topFiveItem
    },

    props: {
      title: {type: String},
      valueType: {type: String},
      unit: {type: String},
      dataList: {type: Array}
    },

    data(){
      return {
        isNoData: false
      }
    },

    created(){
      this.formatData(this.dataList);
    },

    methods: {
      /* 数据格式化 */
      formatData(data){
        //无数据占位符
        if(!data.length) this.isNoData = true;
        //排序
        data.sort((a, b) => {
          return a.value < b.value;
        });
        /*
         * 1.value，真实数据
         * 2.rate,百分比数据
         * */
        for(const i in data){
          if(this.valueType === 'value'){
            data[i].percentage = Number(100 * data[i].value / data[0].value).toFixed(2)+'%';
          }
          else if(this.valueType === 'rate'){
            data[i].percentage = data[i].value.toFixed(2)+'%';
          }
        }
        //splice补足数组长度
        if(data.length < 5){
          while(5> data.length){
            data.push({
              name: '-',
              value: '-',
              percentage: 0
            });
            data.splice(data.length+1);
          }
        }
        return data;
      }
    }
  }
</script>
