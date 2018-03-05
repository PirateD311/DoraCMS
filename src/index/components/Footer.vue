<template>
    <footer class="footer">
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
}
</style>
