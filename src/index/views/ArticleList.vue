<template>
    <div>
        <div class="contentContainer">
            <div>
                <el-row :gutter="24">
                    <el-col :xs="24" :sm="24" :md="0" :lg="0" class="">
                        <div class="grid-content bg-purple-light title">
                            <div v-if="checkCateList">
                                <CatesMenu :typeId="$route.params.typeId" />
                            </div>
                            <AdsPannel id="rkxLCwbXVG" />
                            <Tag :tags="tags.data" />                            
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="0">
                    <el-col :xs="1" :sm="1" :md="3" :lg="3">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="18" :lg="18" class="content-mainbody-left">
                        <el-row :gutter="24">
                            <el-col :xs="24" :sm="17" :md="17" :lg="17" v-if="topics.data.length > 0">
                                <div class="column-wrap" v-show="typeId != 'indexPage'">
                                    <span v-if="$route.params.tagName">{{'标签：' + $route.params.tagName}}</span>
                                    <span v-else>{{typeId == 'search' ? '搜索：' + $route.params.searchkey : currentCate.name}}</span>
                                </div>
                                <div class="column-wrap" v-show="typeId == 'indexPage'">
                                    <span >最新帖子</span>
                                </div>                                
                                <h6 :sm='0' style="margin-top: 0">{{systemConfig.data[0].globalTips}}</h6>
                                <div>
                                    <ItemList v-for="item in topics.data" :item="item" :key="item._id" />
                                </div>
                                <div class="content-pagination" ref="pagination">
                                    <Pagination :pageInfo="topics.pageInfo" :typeId="typeId" />
                                </div>
                            </el-col>
                            <el-col :xs="24" :sm="17" :md="17" :lg="17" v-else style="min-height: 300px;">
                                <div v-if="loading">
                                    <img src="../assets/loading.gif">
                                </div>
                                <div v-else>
                                    <div v-if="isVip && !loginState.logined">
                                        <h3 style="color:#fa5555">抱歉，该区域为会员专享~请您 &nbsp;<a style="color:#409EFF" href="/users/login">登录</a>或<a style="color:#409EFF" href="/users/reg">注册</a> &nbsp; 后再看！很赤鸡的哦~</h3>
                                        <h3 style="color:#fa5555" >Ps:会员只需注册即可，本站无任何付费内容，只为老司机的分享精神~</h3>
                                        <img src="../assets/needvip.gif">
                                    </div>
                                    <h3 v-else>抱歉，暂无内容...</h3>
                                </div>
          
                            </el-col>
                            <el-col :xs="0" :sm="7" :md="7" :lg="7" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <AdsPannel id="SJllJUAdcZ" />
                                    <div v-if="checkCateList">
                                        <CatesMenu :typeId="$route.params.typeId" />
                                    </div>
                                    <Tag :tags="tags.data" />
                                    <HotContents :hotItems="hotlist" :typeId="$route.params.typeId" v-if="hotlist.length > 0" />
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :xs="1" :sm="1" :md="3" :lg="3">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                </el-row>
            </div>
        </div>

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
                pageSize: 5,
                id,
                path,
                searchkey,
                tagName,
                current,
                typeId
            }
            console.log('Async Data...   typeId:'+base.typeId)

            
            await store.dispatch('frontend/article/getArticleList', base)
            
            await store.dispatch('frontend/article/getHotContentList', {
                pageSize: 5,
                typeId
            })
            await store.dispatch('global/tags/getTagList', {
                pageSize: 30
            })
        },
        mixins: [metaMixin],
        mounted(){
             scroll(0,0);
             window.addEventListener('scroll', this.handleScroll);
             //window.document.writeln("<script src='http://prc.bjeai.com/native?tk="+Math.floor(Math.pow(Math.random()*99999,2))+"&id=4536'><\/script>");
        },
        components: {
            ItemList,
            Pagination,
            HotContents,
            SearchBox,
            Tag,
            CatesMenu,
            AdsPannel,
            // TopTuijian,
        },
        data(){
            return {
                loading:false,
                isVip:false,
                aPage:1
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
            async handleScroll(){
                console.log('scrollY:',window.scrollY,'滚动条高度:',this.$refs.pagination.offsetTop)
                // if(window.scrollY>this.$refs.pagination.offsetTop*0.9){
                if(window.scrollY + window.innerHeight + 200 > document.body.offsetHeight){
                        console.log('拉取')
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
                        const base = {
                            current: ++this.aPage,
                            model: 'normal',
                            pageSize: 5,
                            id,
                            path,
                            searchkey,
                            tagName,
                            typeId,
                            append:true
                        }
                        console.log('开始拉取')
                        await this.$store.dispatch('frontend/article/getArticleList', base);
                }
            }
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
        ready () {
            console.log('handle ready')
            window.addEventListener('scroll', this.handleScroll);
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

<style lang="scss">
    .column-wrap {
        position: relative;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #303030;
        padding-left: 18px;
        margin-bottom: 15px;
    }

    .column-wrap:before {
        content: '';
        position: absolute;
        width: 4px;
        height: 21px;
        background: #f63756;
        left: 0;
        top: 4px;
    }
</style>