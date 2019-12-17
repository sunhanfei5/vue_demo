<template>
  <div class="product-wrap">
    <div class="product-up-inner">
      <div class="product-up-detail">
        <h2 class="product-detail-title">91助手</h2>
        <p class="product-up-detail-text">大数据用户行为分析产品 , 神策数据 , 数据分析必备工具 , 自定义多维度分析 , 深度洞察用户数据 , 可实现多维度 , 精细化的统计分析 , 秒级处理 , 实时更新 ；针对企业级客户的自助式用户行为分析平台。实时数据采集、建模、分析，驱动市场营销、产品优化、用户运营、管理监控。</p>
      </div>
      <div class="product-up-buys">
        <div class="product-up-buys-list">
          <div class="product-up-buys-list-name">购买数量：</div>
          <div class="product-up-buys-list-detail">
              <v-quantity
                @transmitInformation="getInformation('buyTotal',$event)"
              ></v-quantity>
          </div>
        </div>
        <div class="product-up-buys-list">
          <div class="product-up-buys-list-name">购买类型：</div>
          <div class="product-up-buys-list-detail">
            <v-selection
                         :selections="productsTypes"
                         @transmitInformation="getInformation('productTypesId',$event)"
            ></v-selection><!-- v-if="isShow"-->
          </div>
        </div>
        <div class="product-up-buys-list">
          <div class="product-up-buys-list-name">有效时间：</div>
          <div class="product-up-buys-list-detail">
            <v-single-selection
              :singleSelectionList="radioList"
              @transmitInformation="getInformation('validTimeId',$event)"
            ></v-single-selection>
          </div>
        </div>
        <div class="product-up-buys-list">
          <div class="product-up-buys-list-name">产品版本：</div>
          <div class="product-up-buys-list-detail">
            <v-multiple-selection
              :multipleSelectionList = "checkboxList"
              @transmitInformation="getInformation('productEditionId',$event)"
            ></v-multiple-selection>
          </div>
        </div>
        <div class="product-up-buys-list">
          <div class="product-up-buys-list-name">总价：</div>
          <div class="product-up-buys-list-detail">{{buyInformationList.totalPrices}} <span>元</span></div>
        </div>
        <div class="product-up-buys-list">
          <div class="product-up-buys-list-name"></div>
          <div class="product-up-buys-list-detail">
            <el-button
              type="primary"
              @click="submit()"
              round>
              立即购买
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="product-down-inner">
      <div class="product-down-detail">
        <h2 class="product-detail-title">产品介绍</h2>
        <h3 class="product-detail-subhead">技术和产品优势</h3>
        <p class="product-detail-subhead-desc"> 基于国际领先的大数据技术能力、百度海量的数据资源，倾情打造。</p>
        <div class="product-tec-content">
          <div class="product-tec-item">
            <img src="../../../static/images/products/product-use.png" alt="极简接入">
            <div class="product-tec-item-title">极简接入</div>
            <div class="product-tec-item-desc">零成本接入，辅以完备的指导说明，践行简单易用、即安即用的理念。</div>
          </div>
          <div class="product-tec-item">
            <img src="../../../static/images/products/product-perf.png" alt="秒级响应">
            <div class="product-tec-item-title">秒级响应</div>
            <div class="product-tec-item-desc">百度成熟的分布式计算框架、海量数据存储引擎等先进技术，数据秒级响应。</div>
          </div>
          <div class="product-tec-item">
            <img src="../../../static/images/products/product-stable.png" alt="稳定性强">
            <div class="product-tec-item-title">稳定性强</div>
            <div class="product-tec-item-desc">冷热双备、大规模服务器集群的稳定性保证，确保网站数据安全、稳定、实时。</div>
          </div>
          <div class="product-tec-item">
            <img src="../../../static/images/products/product-export.png" alt="数据导出">
            <div class="product-tec-item-title">数据导出</div>
            <div class="product-tec-item-desc">流量、消费与用户业务数据无缝对接, 开放数据支持用户自建数据平台。</div>
          </div>
          <div class="product-tec-item">
            <img src="../../../static/images/products/product-resource.png" alt="海量资源">
            <div class="product-tec-item-title">海量资源</div>
            <div class="product-tec-item-desc">丰富的用户标签和大数据用户理解，助力用户洞察、人群精细化分组。</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import vSelection from '../../components/selection'
    import vSingleSelection from '../../components/singleSelection'
    import vMultipleSelection from '../../components/multipleSelection'
    import vQuantity from '../../components/quantity'
    export default {
        name: "nineOneAssistant",
        components:{vSelection,vSingleSelection,vMultipleSelection,vQuantity},
        data(){
            return{
                isShow : false,
                productsTypes:[
                    {
                        "label": "入门版",
                        "value": 0
                    },
                    {
                        "label": "中级版",
                        "value": 1
                    },
                    {
                        "label": "高级版",
                        "value": 2
                    }
                ],
                buyInformationList:{
                    buyTotal : 1,
                    productTypesId : 0,
                    validTimeId:0,
                    productEditionId:[0],
                    totalPrices:100
                },
                checkboxList:[
                    {
                        name:'客户版',
                        id: 0
                    },
                    {
                        name:'代理服务',
                        id: 1
                    },
                    {
                        name:'高级版',
                        id: 2
                    }
                ],
                radioList:[
                    {
                        name:'一年',
                        id: 0
                    },
                    {
                        name:'二年',
                        id: 1
                    },
                    {
                        name:'三年',
                        id: 2
                    }
                ],
            }
        },
        created() {
            /*this.$axios
                .post('/api/products',{})
                .then(
                    (dataList)=>{
                        //console.log(dataList.data.productsTypes);
                        this.productsTypes = dataList.data.productsTypes;
                        this.isShow = true;
                    }
                )
                .catch((err) => {
                    console.error(err)
                })*/
        },
        methods:{
            getInformation(attr,val){
                this.buyInformationList[attr] = val
                this.getPrice ()
            },
            getPrice () {
                let resParams = {
                    buyTotal: this.buyInformationList.buyTotal,
                    productTypesId: this.buyInformationList.productTypesId,
                    validTimeId: this.buyInformationList.validTimeId,
                    productEditionId: this.buyInformationList.productEditionId.join(','),
                }
                this.$axios
                    .get('/static/json/getPrice.json')
                    .then((res)=>{
                        // console.log(res.data)
                        // let data = JSON.parse(res.data)
                        this.buyInformationList.totalPrices =res.data.getPrice.amount;
                    })
            },
            submit(){
                console.log(this.buyInformationList)
            }
        },
    }
</script>

<style scoped lang="scss">
  @import "../../../static/style/param";
  .product-up-buys{
    .product-up-buys-list{
      .product-up-buys-list-detail{

      }
    }

  }
  .product-detail-subhead{
    font-size: percentage(17 / $base_font_size);
    font-weight: bold;
  }
  .product-detail-subhead-desc{
    margin-bottom: 30px;
  }
  .product-tec-content{
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -25px;
    margin-bottom: 30px;
    .product-tec-item{
      width: calc(33.333% - 25px);
      text-align: justify;
      margin-right: 25px;
      img{
        width: 18%;
      }
    }
  }

</style>
