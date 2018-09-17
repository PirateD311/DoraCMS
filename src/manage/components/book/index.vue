<template>
    <div>
        <!-- 书籍首页配置 -->
        <el-row>
            <el-col :span="24">
            <el-tabs v-model="activeName" >
                <el-tab-pane label="书籍列表" name="first"><Books></Books></el-tab-pane>                
                <el-tab-pane label="导航配置" name="second"><NavConfig></NavConfig></el-tab-pane>
                <el-tab-pane label="首页区块配置" name="third"><BlockConfig></BlockConfig></el-tab-pane>
                <el-tab-pane label="Banner配置" name="fourth"><BannerConfig></BannerConfig></el-tab-pane>
            </el-tabs>
            </el-col></el-row>       
    </div>
</template>
<script>
import {request} from '../../store/services'
import BannerConfig from './bannerConfig'
import NavConfig from './navConfig'
import BlockConfig from './blockConfig'
import Books from './Books'
import TagForm from '../contentTag/tagForm';


import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name:'',
    components:{
        BannerConfig,NavConfig,BlockConfig,TagForm,Books
    },
    data(){
        return {
            activeName:'first',
        }
    },

}
</script>
<style lang="scss">
    table{width:100% !important}
</style>
