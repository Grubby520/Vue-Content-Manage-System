<template>
    <div class="el-top5">
        <div class="top5-title">{{topData.title}}</div>
        <div class="top5-content">
            <div v-if="isNoData" class="noData">
            </div>
            <div v-else class="progress-plugin">
              <top-five-item
                v-for="(item, index) in topData.dataList"
                :key="item.name"
                :item="item"
                :unit="topData.unit"
                :index="index"
              ></top-five-item>
            </div>
        </div>
    </div>
</template>

<link rel="stylesheet" href="./topfive.css">

<script>
  import topFiveItem from './topfive-item.vue'
  export default {

    props: {
      topData: {type: Object}
    },

    components: {
      topFiveItem
    },

    data(){
      return {
        isNoData: false,
      }
    },

    created(){
      console.log(this.topData);
//      this.formatData(this.topData.dataList);
//      this.fiveData = Object.assign({},this.topData) ;
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
              if(this.data.valueType === 'value'){
                data[i].percentage = Number(100 * data[i].value / data[0].value).toFixed(2)+'%';
              }
              else if(this.data.valueType === 'rate'){
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
        },
    }
  }
</script>
