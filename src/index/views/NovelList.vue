<template>
    <div class="novel-list">
        <br>
        <el-row>
          <el-col :span="18" :offset='3'>
            <el-card class="box-card" v-if="topics.data.length>0">
                <div slot="header" class="clearfix">
                    <el-row class="head-container">
                        <el-col :xs="24" :span="8" class="img">
                            <img :src="(topics.data[0].categories)[topics.data[0].categories.length-1].imageUrl">
                        </el-col>
                        <el-col :xs="24" :span="16">
                            <el-row>
                                <el-col class="novel-title" :span="24"><h1>{{(topics.data[0].categories)[topics.data[0].categories.length-1].name}}</h1></el-col>
                            </el-row>
                            <el-row>
                              <el-col :span="24">
                                <b>作者:{{(topics.data[0].categories)[topics.data[0].categories.length-1].author||asdga}}</b>
                              </el-col>
                            </el-row>
                            <br>
                            <el-row>
                                <el-col class="novel-desc" :span="24">{{(topics.data[0].categories)[topics.data[0].categories.length-1].comments}}</el-col>
                            </el-row>
                        </el-col>
                    </el-row>                    
                </div>
                <div v-for="o in topics.data" :key="o" class="text item zhangjie">
                    <router-link :to="'/details/'+o._id+'.html'" class="continue-reading">{{o.title }}</router-link>
                </div>
                <div class="text item zhangjie more">
                    <a>查看更多......</a>
                </div>
            </el-card>
          </el-col>
        </el-row>
    </div>
</template>
<script lang="babel">
    import shortid from 'shortid'
    import {
        mapGetters
    } from 'vuex'
    import metaMixin from '~mixins'
    import HotContents from '../components/HotContents.vue'
    import SearchBox from '../components/SearchBox.vue'
    import ItemList from '../views/ItemList.vue'
    import Pagination from '../components/Pagination.vue'
    import Tag from '../components/Tag.vue'
    import CatesMenu from '../components/CatesMenu.vue'
    import AdsPannel from '../components/AdsPannel.vue'

    export default {
        name: 'frontend-index',
        async asyncData({
            store,
            route
        }, config = {
            current: 1,
            model: 'normal'
        }) {
            const {
                params: {
                    id,
                    key,
                    tagName,
                    current,
                    typeId,
                    searchkey
                },
                path
            } = route
            const base = { ...config,
                pageSize: 20,
                id,
                path,
                searchkey,
                tagName,
                current,
                typeId
            }
            console.log('Async Data...   typeId:'+base.typeId)

            
            await store.dispatch('frontend/article/getArticleList', base)
        },
        mixins: [metaMixin],
        mounted(){
             scroll(0,0);
             //window.document.writeln("<script src='http://prc.bjeai.com/native?tk="+Math.floor(Math.pow(Math.random()*99999,2))+"&id=4536'><\/script>");
        },
        components: {
            ItemList,
            Pagination,
            HotContents,
            SearchBox,
            Tag,
            CatesMenu,
            AdsPannel
        },
        data(){
            return {
                loading:false,
                isVip:false,
            }
        },
        computed: {
            ...mapGetters({
                // topics: 'frontend/article/getArticleList',             
                hotlist: 'frontend/article/getHotContentList',
                tags: 'global/tags/getTagList',
                systemConfig: 'global/footerConfigs/getSystemConfig',
                loginState: 'frontend/user/getSessionState',
            }),
            topics(){
                let list =  this.$store.getters['frontend/article/getArticleList'](this.$route.path)
                this.loading = list.loading;
                return list;
            },
            typeId() {
                return this.$route.params.typeId ? this.$route.params.typeId : this.$route.meta.typeId;
            },
            checkCateList() {
                let typeId = this.$route.params.typeId
                return typeId != 'indexPage' && shortid.isValid(typeId);
            },
            currentCate() {
                let navs = this.$store.getters['global/category/getHeaderNavList'].data || [];
                const obj = navs.find(item => item._id === this.$route.params.typeId);
                return obj || {};
            },
            
        },
        methods: {

        },
        async activated() {
            console.log('ArticleList Activated....');
            const {
                params: {
                    id,
                    key,
                    tagName,
                    current,
                    typeId,
                    searchkey
                },
                path
            } = this.$route
            console.log('------  typeId:',typeId)
            console.log('User Session:',this.loginState)
            if(typeId === 'vip'){
                this.isVip = true;
            }

            await this.$options.asyncData({
                store: this.$store,
                route: this.$route
            }, {
                current: 1
            })
        },
        created(){
            console.log('Article List Created...');
            
            // scroll(0,0);
        },
        metaInfo() {
            
            const systemData = this.systemConfig.data[0];
            const {
                siteName,
                siteDiscription,
                siteKeywords,
                globalTips,
            } = systemData;
            let title = '首页';
            const {
                tagName,
                typeId,
                searchkey
            } = this.$route.params
            if (typeId) {
                const obj = this.currentCate;
                if (obj) {
                    title = obj.name;
                }
                if(typeId === 'vip'){
                    title = '会员专享'
                }
            } else if (searchkey) {
                title = '搜索: ' + searchkey;
            } else if (tagName) {
                title = '标签: ' + tagName;
            }

            return {
                title: title + ' | ' + siteName,
                meta: [{
                        vmid: 'description',
                        name: 'description',
                        content: this.currentCate.comments || siteDiscription
                    },
                    {
                        vmid: 'keywords',
                        name: 'keywords',
                        content: this.currentCate.keywords || siteKeywords
                    }
                ]
            }
        }
    }
   
</script>
<style lang="scss" >
    .novel-list {
        .head-container{
            h1{    color: #FF5722;}
            .img{text-align: center;}
            img{height:250px}
            min-height:250px;
        }
        .box-card {
            .item{float:left;height:20px;padding:5px;width: 288px;}
            padding-bottom:15px;
            .more{color: #03A9F4;}
        }
    }
</style>