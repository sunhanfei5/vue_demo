<template>
  <div class="checkbox-wrap">
      <span class="checkbox-item"
            v-for="(item,index) in multipleSelectionList"
            :class="{'active':nowIndexes.indexOf(index) !== -1}"
            @click="toggleSelection(index)"
            unselectable="on"
            onselectstart="return false;"
      >{{item.name}}</span>
  </div>
</template>

<script>
    import _array from 'lodash/array';
    export default {
        name: "multipleSelection",
        props: {
            multipleSelectionList:{
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
                nowIndexes : [0],
            }
        },
        methods:{
            toggleSelection(index){

                    if(_array.indexOf(this.nowIndexes,index) === -1){
                        this.nowIndexes.push(index)
                    }else{
                        if(this.nowIndexes.length > 1){
                            this.nowIndexes= _array.remove(this.nowIndexes, function(i){
                                return i !== index
                            });
                        }

                    }
                    this.$emit('transmitInformation',this.nowIndexes)
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "../../static/style/param.scss";
  .checkbox-wrap{
    display: flex;
    display: -webkit-flex;
    .checkbox-item{
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
