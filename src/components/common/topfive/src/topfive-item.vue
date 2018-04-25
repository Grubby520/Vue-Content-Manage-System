<template>
  <div>
    <div class="progress-text clearfix">
      <span class="text-name">{{item.name}}</span>
      <span class="text-value" v-if="item.name === '-'">{{item.value}}</span>
      <span class="text-value" v-else>{{item.value}}{{unit}}</span>
    </div>
    <div class="progress-container">
      <div :class="'progress-innercore progress-suject-bgcolor-'+(index+1)" :style="{width: item.percentage}" >
      </div>
      <div class="progress-tip"
           :style="styleObject">
        <ul>
          <li v-if="item.name === '-'">
            <span class="tip-title-icon progress-suject-bgcolor-index"></span>{{item.name}} : {{item.value}}
          </li>
          <li v-else>
            <span class="tip-title-icon progress-suject-bgcolor-index"></span>{{item.name}} : {{item.value}}{{unit}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    props: {
      item: {type:Object},
      unit: {type: String}
    },

    data(){
      return {
        styleObject:{
          display:'none',
          left:0,
          bottom:0
        }
      }
    }
  }
</script>
