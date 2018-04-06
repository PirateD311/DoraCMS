<template>

    <div class="random-articls" v-if="articles && articles.length > 0">
        <el-row class="grid-content bg-purple-light" :gutter="5">
            <el-col  :xs="12" :sm="12" :md="6" :lg="6" v-for="(item,index) in articles" :key="index" class="item">
                <router-link :to="'/details/'+item._id+'.html'" class="continue-reading"><img  :src="item.sImg" :alt="item.title" /></router-link>
                <span class="title">{{item.title||item.stitle}}</span>
            </el-col>
        </el-row>
    </div>

</template>
<script>
    let packageJson = require("../../../package.json");

    import {
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        props: {
            articles: Array
        },
        computed: {

        }
    }

</script>
<style lang="scss">
    .random-articls {
        
        border-radius: 5px;
        margin-top: 10px;
        margin-bottom: 25px;
        .title {
            font-size: 14px;
            display: block;
            text-align: center;
            padding: 10px;
        }
        .item{
            height: 230px;
            overflow:hidden;
            img{height:150px;width:100%;border-radius: 15px;}
        }
    }
    .view{margin-bottom: 10px;}
</style>
