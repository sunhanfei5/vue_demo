<template>
    <div id="layout">
        <div id="app-header">
            <div class="app-header-inner">
                <img class="header-logo" src="../assets/logo.png" alt="">
                <div class="header-nav">
                    <ul class="nav-list" >
                        <li>登录</li>
                        <li class="nav-pile">|</li>
                        <li>注册</li>
                        <li class="nav-pile">|</li>
                        <li>关于</li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="app-content">
            <div class="app-content-inner">
                <keep-alive><!--缓存，访问过后被缓存起来-->
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <div id="app-footer">
            <p>&copy; 2019</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style lang="scss">
    @import "../../static/style/param";
    html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    /* HTML5 display-role reset for older browsers */

    article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
        display: block;
    }

    body {
        line-height: 1;
        color: #363636;
        font-size: $base_font_size;
        background-color: #f2f2f2;
    }

    ol, ul {
        list-style: none;
    }

    blockquote, q {
        quotes: none;
    }

    blockquote {
        &:before, &:after {
            content: '';
            content: none;
        }
    }
    q {
        &:before, &:after {
            content: '';
            content: none;
        }
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    a:hover{
        color: #41b883;
    }
    /*layout*/
    #app-header{
        background-color: #363636;
        color: #b2b2b2;
        height: 90px;
        line-height: 90px;
        width: 100%;
        margin-bottom: 30px;
        .app-header-inner{
            width: 80%;
            margin: 0 auto;
            clear: both;
            overflow: hidden;
            .header-logo{
                display: inline-block;
                height: 60px;
                width: auto;
                margin-top: 15px;
            }
            .header-nav{
                float: right;
                .nav-list{
                    clear: both;
                    overflow: hidden;
                    li{
                        float: left;
                        cursor: pointer;
                        padding: 0 5px;
                        :last-child{
                            padding-right: 0;
                        }
                    }
                    /*.nav-pile{
                        margin: 0 10px;
                    }*/
                }

            }
        }
    }
    #app-footer{
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        background-color: #e3e4e8;
        clear: both;
        margin-top: 30px;
    }
    #app-content{
        width: 100%;
        /*background-color: #f1f1f1;*/
        .app-content-inner{
            width: 1200px;
            margin: 0 auto;
        }
    }
    /*公用样式*/
    .hot-icon{
        display: inline-block;
        font-size: percentage(12/$base_font_size);
        width: 36px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 100%;
        background-color: #a81a0b;
        color: #ffffff;
        margin-left: 5px;
    }
</style>