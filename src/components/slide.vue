<template>
  <div class="slide-show" @mouseover="clearInv()" @mouseout="runInv()" >
      <transition-group tag="ul" class="slide-img" :name="this.effect">
        <li class="slide"
            v-for="(slide,index) in slides"
            :key="'id'+ index"
            v-show="index === nowIndex">
          <a :href="slide.href">
            <img class="image" :src="slide.src" :alt="slide.title" ref="imgEle">
          </a>
        </li>
      </transition-group>
    <div class="slide-detail">
      <h2>{{slides[nowIndex].title}}</h2>
      <ul title="超出10张显示“当前页/总页数”的形式">
        <li class="prev-btn" @click.stop="goTo(prevIndex)"><a href="javascript:void(0);">&lt;</a></li>
        <li>
          <p v-if="slides.length <= 10">
            <a v-for="(slide,index) in slides"
               :class="{active : index===nowIndex}"
               href="javascript:void(0);"
               @click="goTo(index)"
               >
              {{index+1}}
            </a>
          </p>
          <p v-else>{{nowIndex+1}} / {{slides.length}}</p>
        </li>
        <li class="next-btn" @click.stop="goTo(nextIndex)"><a href="javascript:void(0);">&gt;</a></li>
      </ul>
    </div>
    <button class="change-btn" data-id="btn" @click.stop="changeType($event)">{{effect}}</button>
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
                isShow: true,
                slideWrapWidth: 3000,
                slideWrapHeight: Number,
                effect: 'slide'
            }
        },
        created () {
            /*this.$nextTick(()=>{
                let dom = this.$refs['imgEle'];
                console.log(dom)
                console.log(dom[0].height)
                return dom.clientHeight
            })*/

        },
        methods: {
            goTo (index){
                this.nowIndex = index;
                this.$emit('on-change',index)
                // console.log(this.nowIndex)
            },
            runInv () {
                this.inv = setInterval(()=>{
                    this.goTo(this.nextIndex)
                    // console.log(1)
                },this.invTime)
            },
            clearInv () {
                clearInterval(this.inv)
            },
            changeType (e) {
                this.isShow = !this.isShow
                if(this.isShow){
                    this.effect = 'slide'
                }else{

                    this.effect = 'fade'
                }
                /*获取自定义属性*/
                let obj = e.srcElement || e.target;/*做ie和Firefox兼容*/
                let dataId = obj.dataset.id
                console.log(e)
                console.log(dataId)
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
            },
            getSlideWidth () {
                this.$nextTick(function(){
                    let dom = this.$refs.imgEle;
                    return dom[0].clientWidth
                })
            },
            getSlideHeight () {
                this.$nextTick(function(){
                    let dom = this.$refs.imgEle;
                    // return dom[0].clientHeight
                    console.log(dom[0].clientHeight)
                    this.slideWrapHeight = dom[0].clientHeight
                })
            }
        },
        mounted () {
          // this.getSlideHeight
        },
        watch: {
            /*props: function () {
                this.$nextTick(
                    ()=>{
                        let dom = this.$refs['imgEle'];
                        console.log(dom)
                        console.log(dom[0].height)
                        return dom.clientHeight
                    }
                )
            }*/
        }


    }
</script>

<style scoped lang="scss">
  .slide-show{
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    .slide-img {
      width: 100%;
      height: 490px;
      /*动画效果向左进入，向左离开 100至0,0至-100*/
      .slide-enter-active{
        transition: all 1s ease;
        transform: translateX(0);
      }
      .slide-leave-active{
        transition: all 1s ease;
        transform: translateX(-100%);
      }
      .slide-enter {
        transform:translateX(100%);
      }
      .slide-enter-to {
        transform:translateX(0);
      }
      .slide-leave {
        transform:translateX(0);
      }
      .slide-leave-to {
        transform:translateX(-100%);
      }

      /*动画效果向右进入，向左离开 -100至0,100至0*/
      /*.slide-enter-active {
        transition: all 1s ease;
        transform: translateX(100%)
      }
      .slide-leave-active {
        transition: all 1s ease;
        transform: translateX(0)
      }
      .slide-enter {
        transform: translateX(0)
      }
      .slide-enter-to {
        transform: translateX(100%)
      }
      .slide-leave {
        transform: translateX(-100%)
      }
      .slide-leave-to {
        transform: translateX(0)
      }*/

      /*渐变动画*/
      .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
      .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
      }
      .slide{
        position: absolute;
        display: block;
        width: 100%;
        height: 490px;
        img{
          display: block;
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
        max-width: 45%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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
    .change-btn{
      position: absolute;
      top: 15px;
      right: 15px;
    }
  }
</style>
