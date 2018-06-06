<template>
  <div>
    <div class="progress-text clearfix">
      <span class="text-name">{{item.name}}</span>
      <span class="text-value" v-if="item.name === '-'">{{item.value}}</span>
      <span class="text-value" v-else>{{item.value}}{{unit}}</span>
    </div>
    <div class="progress-container"
         @mouseover="show"
         @mouseout="hide"
    >
      <div :class="'progress-innercore progress-suject-bgcolor-'+(index+1)" :style="{width: item.percentage}" >
      </div>
      <div class="progress-tip"
        :style="styleObject"
        ref="tip"
      >
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
    name: 'TopFiveItem',

    props: {
      item: {type:Object},
      unit: {type: String},
      index: {type: Number}
    },

    data(){
      return {
        styleObject:{
          display:'none',
          left:0,
          top: 0
        }
      }
    },

    methods: {
      show(){
        let e = event || window.event;
        this.styleObject.left = e.clientX +10+ 'px';
        this.styleObject.top = e.clientY -12+ 'px';
        this.styleObject.display = 'block';
      },
      hide(){
        this.styleObject.display = 'none';
      }
    },
    mounted(){
      this.$nextTick(function () {

      });
    }

  }
</script>
