<template>
    <div class="el-top5">
        <div class="top5-title">{{title}}</div>
        <div class="top5-content">
            <div class="progress-plugin" v-for="(item, index) in data">
                <div class="progress-text clearfix">
                  <span class="text-name">{{item.name}}</span>
                  <span class="text-value" v-if="item.name === '-'">{{item.value}}</span>
                  <span class="text-value" v-else>{{item.value}}{{unit}}</span>
                </div>
                <div class="progress-container"  @mouseover.stop="showTooltip(this)" @mouseout.stop="hideTooltip">
                  <div :class="'progress-innercore progress-suject-bgcolor-'+(index+1)" :style="{width: item.percentage}" >
                  </div>
                  <div class="progress-tip" style="left: 380px; bottom: 13px; display: none;">
                    <ul>
                      <li>
                        <span class="tip-title-icon progress-suject-bgcolor-index"></span>{{item.name}} : {{item.value}}{{unit}}
                      </li>
                    </ul>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'ExTopFive',

    props: {

    },
    data(){
        return {
            title: '这是title',
            valueType: 'value',
            //valueType: 'percentage',
            unit:'GB',
            data: [
              {name: 'small', value: 300},
              {name: 'big', value: 1200},
              {name: 'middle', value: 800}
            ],
          indexClass: 'sss'
        }
    },
    created(){
        this.sortData(this.data);

    },
    methods: {
        /*
        *  数据格式化
        * */
        sortData(data){
          data = data.sort(function (a, b) {//降序排列
            return b.value - a.value;
          });

          for(const i in data){
            data[i].percentage = Number(100 * data[i].value / data[0].value).toFixed(2)+'%';
          }

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
        },

      showTooltip(e){
          let self = this;
          console.log(e);

      },
      hideTooltip(){

      }

    }
  }
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    content: " ";
    /* 1 */
    display: table;
    /* 2 */
  }
  .clearfix:after {
    clear: both;
  }

  .nodata-info {

  }
  /*单数据-top5样式*/
  .top5-title {
    margin-bottom: 20px
  }

  .top5-content {
    height: 200px;
  }

  /*进度条背景样式*/
  .progress-suject-bgcolor-1 {
    background-color: #682D97;
  }

  .progress-suject-bgcolor-2 {
    background-color: #BBA0E8;
  }

  .progress-suject-bgcolor-3 {
    background-color: #F48071;
  }

  .progress-suject-bgcolor-4 {
    background-color: #94C52E;
  }

  .progress-suject-bgcolor-5 {
    background-color: #48BEFF;
  }

  .progress-plugin {
    margin-bottom: 0.5em;
  }

  .progress-text {
    margin-bottom: 0.25em;
  }

  .progress-text .text-name {
    float:left;
  }

  .progress-text .text-value {
    float:right;
  }

  .progress-container {
    position:relative;
    height: 10px;
    background-color: #F4F5F7;
  }

  .progress-container:hover {
    cursor:pointer;
  }

  .progress-tip {
    position: absolute;
    display:none;
    min-width:200px;
    background-color: #fff;
    opacity: 0.8;
    box-shadow: 0 0 5px #ccc;
    padding: 1em;
    z-index: 1000;
  }

  .progress-tip ul > li {
    margin: 0.5em 0;
  }

  .tip-title-icon {
    display:inline-block;
    padding: 0.5em;
    margin-right: 0.5em;
    vertical-align: middle;
  }

  .progress-innercore {
    height: 100%;
  }


</style>
