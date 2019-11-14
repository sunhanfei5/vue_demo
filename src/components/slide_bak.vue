<template>
  <div class="slide-show" @mouseover="clearInv()" @mouseout="runInv()">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans-old">
          <img :src="slides[nowIndex].src" v-if="!isShow" :alt="slides[nowIndex].title">
        </transition>
        <transition name="slide-trans">
          <img :src="slides[nowIndex].src" v-if="isShow" :alt="slides[nowIndex].title">
        </transition>
      </a>
    </div>
    <div class="slide-detail">
      <h2>{{slides[nowIndex].title}}</h2>
      <ul>
        <li class="prev-btn" @click="goTo(prevIndex)"><a href="javascript:void(0);">&lt;</a></li>
        <li>
          <a v-for="(slide,index) in slides"
             :class="{active : index===nowIndex}"
             href="javascript:void(0);"
             @click="goTo(index)">
            {{index+1}}
          </a>
        </li>
        <li class="next-btn" @click="goTo(nextIndex)"><a href="javascript:void(0);">&gt;</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Slide",
        props : {
            slides: {
                type: Array,
                default: []
            },
            invTime: {
                type: Number,
                default: 3000
            }
        },
        data() {
            return{
                nowIndex: 0,
                isShow: true
            }
        },
        methods: {
            goTo (index){
                this.isShow = false;
                setTimeout(()=>{
                    this.isShow = true;
                    this.nowIndex = index;
                },10)

                // console.log(this.nowIndex)
            },
            runInv () {
                this.inv = setInterval(()=>{
                    this.goTo(this.nextIndex)
                    //console.log(1)
                },this.invTime)
            },
            clearInv () {
                clearInterval(this.inv)
            }
        },
        computed: {
            prevIndex () {
                if(this.nowIndex === 0){
                    return this.slides.length-1
                }else{
                    return this.nowIndex - 1
                }
            },
            nextIndex () {
                if(this.nowIndex === this.slides.length-1){
                    return 0
                }else{
                    return this.nowIndex + 1
                }
            }
        },
        mounted () {
            this.runInv();
        }
    }
</script>

<style scoped lang="scss">
  .slide-show{
    position: relative;
    width: 100%;
    margin: 0 auto;
    .slide-img {
      .slide-trans-enter-active,
      .slide-trans-leave-active,
      .slide-trans-old-enter-active,
      .slide-trans-old-leave-active{
        transition: all 0.8s;
      }
      .slide-trans-enter {
        transform:translateX(870px);
      }
      .slide-trans-enter-to {
        transform:translateX(-870px);
      }
      .slide-trans-old-leave{
        transform:translateX(870px);
      }
      .slide-trans-old-leave-to{
        transform:translateX(-870px);
      }
      a{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow: hidden;
        img{
          width: 100%;
        }
      }

    }
    .slide-detail{
      position: absolute;
      bottom: 0;
      left:0;
      width: 100%;
      background-color: rgba(0,0,0,0.5);
      color: #ffffff;
      h2{
        height: 30px;
        line-height: 30px;
        padding-left: 25px;
      }
      ul{
        position: absolute;
        right:5px;
        top:0;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        li{
          height: 30px;
          line-height:30px;
          margin: 0 10px;
          a{
            padding: 0 3px;
            &.active{
              color: #41b883;
            }
          }
          &.prev-btn a,&.next-btn a{
            display: block;
            width: 25px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
