<style lang="scss">
    
</style>
<template>
    <div id="app">
        <MyHeader v-if="$route.meta.typeId != 'adminlogin'" />
        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath" v-if="$route.meta.notKeepAlive" class="view"></router-view>
        </transition>
        <transition name="fade" mode="out-in">
            <keep-alive>
                <router-view :key="$route.fullPath" v-if="!$route.meta.notKeepAlive" class="view"></router-view>
            </keep-alive>
        </transition>
        <!-- <h6 :sm='24' :md="0" style="margin: 0px 5px;padding: 5px 20px;text-align: center;border: 1px solid #4CAF50;">本站承诺不含任何违禁图片、文字或视频，如有发现请立即向管理员反馈删除!更多绅士福利+QQ:230714605</h6> -->
        
        <MyFooter v-if="$route.meta.typeId != 'adminlogin'" />
    </div>
</template>
<script>
import {
    mapGetters,
    mapState
} from 'vuex'

import MyHeader from './components/header'
import MyFooter from './components/Footer'

export default {
    name: 'app',
    components: {
        MyHeader,
        MyFooter
    },
    data() {
        return {}
    },
    mounted(){
        document.writeln(this.global.footerConfigs.lists.data[0].globalJs||'')
    },
    computed: {
        ...mapGetters({
            global: 'global/getGlobal'
        }),
        ...mapState('appShell', [
            'pageTransitionName'
        ]),
        key() {
            return this.$route.path.replace(/\//g, '_')
        },
        backend() {
            return this.$route.path.indexOf('backend') >= 0
        },
        isLogin() {
            return this.$route.path === '/backend'
        }
    },
    methods: {
        handleBeforeEnter() {
            this.$store.dispatch('appShell/setPageSwitching', true)
        },
        handleAfterEnter() {
            this.$store.dispatch('appShell/setPageSwitching', false)
        },
        handleClickHeaderBack() {
            this.$router.go(-1)
        },
    }
}
</script>
