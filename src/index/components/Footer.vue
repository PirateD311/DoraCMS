<template>
    <footer class="footer">
        <div v-show="isScrollTop" class="toTop" @click="toTop">
            <i class="el-icon-arrow-up"></i>
        </div>
        <div class="share">
            <transition name="el-zoom-in-top">
                <div v-show="showShare" style="display: inline-block;" data-disabled="google,twitter,facebook,linkedin,diandian" class="social-share"></div>                       
            </transition>
            <i class="el-icon-share" @click="showShare = showShare?false:true"></i>
        </div>
        <div class="container text-left" v-once>
            <ul>
                <li>&nbsp;
                    <a rel="nofollow" style="display:none" target="_blank" title="代码在这里">{{codeVersion}}</a>
                    <router-link to="/sitemap.html" class="">站点地图</router-link>&nbsp;&nbsp;&nbsp;
                    &nbsp;Copyright (c) 2018 &nbsp;
                    <a href="http://www.miitbeian.gov.cn/" rel="nofollow" target="_blank">
                        {{systemConfig.data[0].registrationNo}}
                    </a> All Rights Reserved</li>
                <li class="sitemap">       
                    <a class="">友情链接:</a><a href="http://www.zhainanfulishe.net">&nbsp;宅男福利社&nbsp;</a>
                </li>
            </ul>
        </div>

    </footer>
</template>
<script>
let packageJson = require("../../../package.json");

import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'Footer',
    async asyncData({
            store,
        route
        }, config = {

        }) {
        const {
                params: path
            } = route
        const base = {
            ...config,
            path,
        }
        await store.dispatch('global/footerConfigs/getSystemConfig')
    },
    serverCacheKey: props => 'footer',
    computed: {
        ...mapGetters({
            systemConfig: 'global/footerConfigs/getSystemConfig'
        }),
        codeVersion() {
            return "DoraCMS " + packageJson.version
        }
    },
    data(){return {isScrollTop:false,showShare:false}},
    mounted(){
        let p=0,t=0,self = this;
        window.addEventListener('scroll', function(){
            p = window.scrollY;   
            if(t<=p){//下滚  
                self.isScrollTop = false;
            }else{//上滚 
                self.isScrollTop = true;
            }  
            t = p
        });        
    },
    methods:{
        toTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        
    }
}

</script>
<style lang="scss">
.footer {
    font-size: 14px;
    background: #ffffff;
    padding: 20px 0;

    ul {
        li {
            text-align: center;
            line-height: 35px;
            padding: 0 10px;
        }
    }
    .toTop{
        color: #03A9F4;
        position: fixed;
        bottom: 60px;
        right: 10px;
        text-align: center;
        border-radius: 100px;
        background-color: #fff;
        padding: 10px;
        border: 1px solid;
        i{font-weight: 900;font-size: 20px;}
        cursor:pointer;
    }
    .share{
        color: #03A9F4;
        position: fixed;
        bottom: 10px;
        right: 10px;
        text-align: center;
        border-radius: 100px;
        background-color: #fff;
        padding: 10px;
        border: 1px solid;
        i{font-weight: 900;font-size: 20px;}
        cursor:pointer;        
    }
}
</style>
