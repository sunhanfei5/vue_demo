<template>
    <div class="radio-wrap">
      <span class="radio-item"
            v-for="(item,index) in singleSelectionList"
            :class="{'active':nowIndex===index}"
            @click="acquireInner(item)"
            unselectable="on"
            onselectstart="return false;"
      >{{item.name}}</span>
    </div>
</template>

<script>
    export default {
        name: "SingleSelection",
        props: {
            singleSelectionList:{
                type:Array,
                default:[
                    {
                        name:'test',
                        id: 0
                    }
                ]
            }
        },
        data () {
            return {
                nowIndex : 0,
                radioInner: null
            }
        },
        methods:{
            acquireInner(data){
                this.nowIndex= data.id;
                this.radioInner= data.name;
                this.$emit('transmitInformation',this.nowIndex)
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "../../static/style/param.scss";
  .radio-wrap{
    display: flex;
    display: -webkit-flex;
    .radio-item{
      display: block;
      height: 28px;
      line-height: 28px;
      padding: 0 18px;
      margin-right: 10px;
      border-radius: 4px;
      border: 1px solid #DCDFE6;
      cursor: pointer;
      font-size: percentage(14/$base_font_size);
      -moz-user-select: none; /*防止鼠标双击选中文字*/
      -khtml-user-select: none;
      user-select: none;
      &.active{
        background-color: #41b883;
        border: 1px solid #41b883;
        color: #ffffff;
      }
    }
  }
</style>
