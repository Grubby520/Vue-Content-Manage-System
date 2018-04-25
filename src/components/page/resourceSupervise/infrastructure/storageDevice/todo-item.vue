<template>
  <li>
    <span @mouseover="move" @mouseout="out">{{ title }}</span><button v-on:click="$emit('remove')">X</button>
    <span v-bind:style="styleObject">移入显示</span>
  </li>
</template>
<script>
  export default {
    props: {
        title :{type: String},

    },
    data(){
        return {
          styleObject:{//独立的
            display:'none',
            top:0,
            left:0
          }
        }

    },
    methods:{
      move(){
          this.styleObject.display = 'block';
      },
      out(){
        this.styleObject.display = 'none';
      }
    }
  }
</script>
<style>
  .show{
    display: block;
  }
  .hide{
    display: none;
  }
</style>
