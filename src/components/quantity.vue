<template>
  <div class="quantity-wrap">
    <span class="subtract" @click="subtractCount()" unselectable="on" onselectstart="return false;">-</span>
    <label class="total-num"><input v-model="buyTotal" @keyup="fixNumber"/></label>
    <span class="add" @click="addCount()" unselectable="on" onselectstart="return false;">+</span>
  </div>
</template>

<script>
    export default {
        name: "quantity",
        props:{
            Max:{
                type:Number,
                default:5
            },
            Min:{
                type:Number,
                default:1
            }
        },
        data(){
            return {
                buyTotal: this.Min
            }
        },
        watch : {
            buyTotal () {
                this.$emit('transmitInformation',this.buyTotal)
            }
        },
        methods:{
            fixNumber () {
                let fix;
                if(typeof this.buyTotal === 'string'){
                    fix=Number(this.buyTotal.replace(/\D/g,''))
                }else{
                    fix = this.buyTotal
                }
                if(fix > this.Max || fix < this.Min){
                    fix = this.Min
                }
                this.buyTotal = fix
            },
            subtractCount(){

                if(this.buyTotal > this.Min){
                    this.buyTotal=Number(this.buyTotal)-1
                }else{
                    this.buyTotal=1
                }

            },
            addCount(){
                if(this.buyTotal < this.Max){
                    this.buyTotal=Number(this.buyTotal)+1
                }else{
                    this.buyTotal=this.Max
                }
            }
        }
    }
</script>

<style scoped lang="scss">

  @import "../../static/style/param";
  .quantity-wrap{
    display: -webkit-flex;
    display: flex;
    .subtract,.add{
      display: block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #DCDFE6;
      cursor: pointer;
      -moz-user-select: none; /*防止鼠标双击选中文字*/
      -khtml-user-select: none;
      user-select: none;
    }
    .total-num{
      display: block;
      width: 50px;
      height: 28px;
      line-height: 28px;
      overflow: hidden;
      text-align: center;
      border-top: 1px solid #DCDFE6;
      border-bottom: 1px solid #DCDFE6;
      font-size: percentage(14/$base_font_size);
      input{
        border: none;
        width: 98%;
        height: 100%;
        padding: 0;
        margin: 0;
        text-align: center;
        &:focus{
          outline: none;
        }
      }
    }
    .subtract{
      border-radius: 4px 0 0 4px;
    }
    .add{
      border-radius: 0 4px 4px 0;
    }
  }
</style>
