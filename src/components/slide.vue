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
                effect: 'slide-next',
                flag: true
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
                if(this.flag){
                    /*防止动画没结束前多次点击*/
                    this.flag=false;
                    /*判断滚动方向*/
                    if(this.effect !== "fade"){
                        if(index>this.nowIndex){
                            if(index===this.slides.length-1&&this.nowIndex===0){
                                this.effect = 'slide-prev';
                            }else{
                                this.effect = 'slide-next';
                            }
                        }else if(index<this.nowIndex){
                            if(index===0&&this.nowIndex===this.slides.length-1){
                                this.effect = 'slide-next';
                            }else{
                                this.effect = 'slide-prev';
                            }
                        }
                    }
                    /*动画过度时间为1s，所以1s后可以点击跳转下一页*/
                    setTimeout(()=>{
                        this.flag=true
                    },1000)

                    /*把当前页换成传进来的页*/
                    this.nowIndex = index;

                    /*像父元素传递信息*/
                    this.$emit('on-change',index)
                }
            },
            runInv () {/*自播放方法*/
                this.inv = setInterval(()=>{
                    this.goTo(this.nextIndex)
                },this.invTime)
            },
            clearInv () {/*停止自动播放*/
                clearInterval(this.inv)
            },
            changeType (e) {/*切换效果按钮时间*/
                this.isShow = !this.isShow;
                if(this.isShow){
                    this.effect = 'slide-next'
                }else{
                    this.effect = 'fade'
                }
                /*测试获取自定义属性，和本幻灯片无关*/
                let obj = e.srcElement || e.target;/*做ie和Firefox兼容*/
                let dataId = obj.dataset.id;
                console.log(e)
                console.log(dataId)
            },

        },
        computed: {
            prevIndex () {/*上一页按钮计算属性*/
                if(this.nowIndex === 0){
                    return this.slides.length-1
                }else{
                    return this.nowIndex - 1
                }
            },
            nextIndex () {/*下一页按钮计算属性*/
                if(this.nowIndex === this.slides.length-1){
                    return 0
                }else{
                    return this.nowIndex + 1
                }
            },
            getSlideWidth () {/*和幻灯片无关*/
                this.$nextTick(function(){
                    let dom = this.$refs.imgEle;
                    return dom[0].clientWidth
                })
            },
            getSlideHeight () {/*和幻灯片无关*/
                this.$nextTick(function(){
                    let dom = this.$refs.imgEle;
                    // console.log(dom[0].clientHeight)
                    return dom[0].clientHeight
                })
            }
        },
        mounted () {
            // 启动幻灯片自动播放
            this.runInv ()
        },
        watch: {

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
      .slide-next-enter-active{
        transition: all 1s ease;
        transform: translateX(0);
      }
      .slide-next-leave-active{
        transition: all 1s ease;
        transform: translateX(-100%);
      }
      .slide-next-enter {
        transform:translateX(100%);
      }
      .slide-next-enter-to {
        transform:translateX(0);
      }
      .slide-next-leave {
        transform:translateX(0);
      }
      .slide-next-leave-to {
        transform:translateX(-100%);
      }
      /*动画效果向右进入，向右离开 -100至0,0至100*/
      .slide-prev-enter-active{
        transition: all 1s ease;
        transform: translateX(-100%);
      }
      .slide-prev-leave-active{
        transition: all 1s ease;
        transform: translateX(0);
      }
      .slide-prev-enter {
        transform: translateX(-100%);
      }
      .slide-prev-enter-to {
        transform:translateX(0);
      }
      .slide-prev-leave {
        transform:translateX(0);
      }
      .slide-prev-leave-to {
        transform:translateX(100%);
      }
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
