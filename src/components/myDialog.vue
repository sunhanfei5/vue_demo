<template>
  <div>
    <div class="dialog-wrap" v-show="isShowDialog">
      <div class="dialog-cover" @click="closeDialog"></div>
      <div class="dialog-content">
        <p class="dialog-close" @click="closeDialog">Close</p>
        <slot>empty</slot>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "myDialog",
        props: {
            isShowDialog : {
                type: Boolean,
                default : false
            }
        },
        data () {
            return {

            }
        },
        methods : {
            closeDialog () {
                this.$emit('close-dialog')
            }
        }
    }
</script>

<style scoped lang="scss">
  .dialog-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;

    .dialog-cover{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.6);
    }
    .dialog-content{
      position: absolute;
      top: 50%;
      right: 0;
      left: 0;
      margin: auto;
      width: 500px;
      transform: translateY(-50%);
      background-color: #ffffff;
      border-top: 5px solid #41b883;
      .dialog-close{
        position: absolute;
        top: 15px;
        right: 15px;
        transition: all 0.3s;
        &:hover{
          color: #a81a0b;
        }
      }
    }
  }
</style>
