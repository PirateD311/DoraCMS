<template>
    <div>
        <div class="content-detail">
            <div class="readme">
                <el-row :gutter="10" class="header-main">
                    <el-col :xs="1" :sm="1" :md="3" :lg="3">
                        <div class="grid-content bg-purple">&nbsp;</div>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="18" :lg="18" class="main-content">
                        <el-row :gutter="24">
                            <el-col :xs="24" :sm="17" :md="17" :lg="17" >
                                <div>
                                    <h2 class="content-title">{{article.doc.title}}</h2>
                                    <div class="content-author">
                                        <ul>
                                            <li class="author-name">
                                                <el-tag size="mini">{{article.doc.author ? article.doc.author.name:''}}</el-tag>
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{cateName}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{article.doc.date}}
                                            </li>
                                            <li>
                                                <span class="dot">&nbsp;•&nbsp;</span>{{article.doc.clickNum}}&nbsp;次阅读
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="article-tag">
                                        <a v-for="(tag, i) in article.doc.tags.slice(0,6)" :href="'/tag/' + tag.name"><el-tag   :type="randomTagType(i)">{{tag.name}}</el-tag></a>
                                                                                
                                    </div>
                                    <div v-if="!article.doc.isVip || loginState.logined" >
                                        <div v-html="article.doc.comments"></div>
                                    </div>
                                    <div style="min-height:400px" v-else>
                                        <h3 style="color:#fa5555">抱歉，该区域为会员专享~请您 &nbsp;<a style="color:#409EFF" href="/users/login">登录</a>或<a style="color:#409EFF" href="/users/reg">注册</a> &nbsp; 后再看！很赤鸡的哦~</h3>
                                        <h6 style="color:#673AB7" >Ps:会员只需注册即可，本站无任何付费内容~</h6>
                                        <img src="../assets/needvip.gif">
                                    </div>
                                    <el-row class="article-end">
                                        <el-col :xs="12"><div @click="starArticle"><i :class="isStar()"></i>{{article.doc.likeNum||0}}收藏</div></el-col>
                                        <el-col :xs="12"><div @click="share = true"><i class="el-icon-share"></i>分享</div></el-col>
                                    </el-row>
                                    <el-row>
                                        <transition name="el-zoom-in-top">
                                            <el-col style="text-align:center" v-show="share"><div data-disabled="google,twitter,facebook,linkedin,diandian" class="social-share"></div></el-col>                       
                                        </transition>
                                    </el-row>
                                    <br>
                                    <el-row>        
                                        <el-tabs value="first"  type="card">
                                            <el-tab-pane label="随便看看" name="first">
                                                <RandomArticle :articles="article.randomArticles" />
                                            </el-tab-pane>
                                            <el-tab-pane label="最热" name="second">
                                                <RandomArticle :articles="hotlist" />
                                            </el-tab-pane>
                                            <el-tab-pane label="最新" name="third">
                                                <RandomArticle :articles="recentArticle" />
                                            </el-tab-pane>
                                        </el-tabs>                                                                               
                                    </el-row>
                                    
                                    <Messages :userMessageList="messages.data" :contentId="article.doc._id" />
                                </div>
                            </el-col>
                            <el-col :xs="0" :sm="7" :md="7" :lg="7" class="content-mainbody-right">
                                <div class="grid-content bg-purple-light title">
                                    <CatesMenu :typeId="typeId" />
                                    <RecentContents :recentItems="recentArticle" />
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
    import {
        mapGetters
    } from 'vuex'
    import metaMixin from '~mixins'
    import Messages from '../components/Messages.vue'
    import RandomArticle from '../components/RandomArticle.vue'
    import RecentContents from '../components/RecentContents.vue'
    import SearchBox from '../components/SearchBox.vue'
    import HotContents from '../components/HotContents.vue'
    import CatesMenu from '../components/CatesMenu.vue'
    import AdsPannel from '../components/AdsPannel.vue'
    import api from '~api'

    export default {
        name: 'frontend-article',
        async asyncData({ store, route }) {
            const { path, params: { id } } = route

            let params = {}, currentId = '';
            if (id) {
                if (id.indexOf('html') > 0) {
                    currentId = id.substr(0, id.length - 5);
                } else {
                    currentId = id;
                }
            }
            await store.dispatch(`frontend/article/getArticleItem`, { id: currentId, path })
            store.dispatch('frontend/article/getHotContentList', { typeId : 'indexPage', pageSize: 10})
            store.dispatch('global/message/getUserMessageList',{contentId:currentId})
            store.dispatch('frontend/article/getRecentContentList')
        },
        mixins: [metaMixin],
        beforeRouteUpdate(to, from, next) {
            if (to.path !== from.path) this.$options.asyncData({
                store: this.$store,
                route: to
            })
            next()
        },
        computed: {
            ...mapGetters({
                article: 'frontend/article/getArticleItem',
                hotlist: 'frontend/article/getHotContentList',
                messages: 'global/message/getUserMessageList',
                recentArticle: 'frontend/article/getRecentContentList',
                loginState: 'frontend/user/getSessionState',
            }),
            cateName() {
                let catesArr = this.article.doc.categories;
                if (typeof catesArr === 'object' && catesArr.length > 1) {
                    return catesArr[catesArr.length - 1].name
                } else {
                    return '其它'
                }
            },
            typeId(){
                let catesArr = this.article.doc.categories;
                if (typeof catesArr === 'object' && catesArr.length > 1) {
                    return catesArr[0]._id
                } else {
                    return 'indexPage'
                }
            }
        },
        components: {
            Messages,
            RandomArticle,
            RecentContents,
            SearchBox,
            HotContents,
            CatesMenu,
            AdsPannel
        },
        data(){
            return {
                share:false
            }
        },
        methods: {
            addTarget(content) {
                if (!content) return ''
                return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
            },
            randomTagType(i){
                let types = ['success','danger','warning','info']
                return types[parseInt(i%types.length)]
            },
            isStar(){
                console.log('isStar?',this.loginState.userInfo)
                if(this.article.doc.likeUserIds){
                    if(this.article.doc.likeUserIds.indexOf(this.loginState.userInfo._id)!==-1){
                        return 'el-icon-star-on'
                    }else{
                        return 'el-icon-star-off'
                    }
                }else{
                    return 'el-icon-star-off'
                }
            },
            showShare(){
                this.share = true  
            },
            async starArticle(){
                console.log(this.hotlist)
                console.log('点赞:',this.article.doc)
                let resp = await api.get('content/star',{id:this.article.doc._id})
                console.log(resp)
                if(resp.data.state==='success'){
                        this.$message({
                            message: '点赞成功!RP+1',
                            type: 'success'
                        });
                        this.article.doc.likeUserIds = resp.data.doc.likeUserIds
                        this.article.doc.likeNum = resp.data.doc.likeNum
                }else{
                    if(resp.data.type === 'NEED_LOGIN'){
                        this.$message({
                            message: '请登录',
                            type: 'warning'
                        });
                    }else{
                         this.$message.error('点赞失败，服务器可能在睡觉。。。')                      
                    }
                }
            }
        },
        created(){
            
        },
        mounted(){
            scroll(0,0);
             //window.document.writeln("<script src='http://prc.bjeai.com/native?tk="+Math.floor(Math.pow(Math.random()*99999,2))+"&id=4536'><\/script>");
        },
        metaInfo() {
            const { title, discription, tags } = this.article.doc;
            let tagArr = ['doracms'];
            if(tags){
                tagArr = tags.map((item,index)=>{
                    return item ? item.name : 'doracms'
                })
            }
            return {
                title,
                titleTemplate: '%s | 二次元福利社',
                meta: [
                    { vmid: 'description', name: 'description', content: discription },
                    { vmid: 'keywords', name: 'keywords', content: tagArr.join() }
                ]
            }
        }
    }

</script>
<style lang="scss">
.content-detail {
    .main-content{    
        border-radius: 15px;
        background-color: #fff;
        padding: 15px;
    }
    color: #3f3f3f;
    margin-top: 20px;
    img {
        max-width: 100% !important;
    }
    .content-title {
        margin-top: 0;
    }
    .article-tag{
        span {
            margin: 0 2px;
            padding: 0 5px;
        }
    }
    .article-end{
        text-align: center;
    }
    .content-author {
        color: #969696;
        ul {
            li.author-name {
                color: #409EFF;
            }
            li {
                display: inline-block;
                margin-bottom: 10px;
                font-size: 13px;
            }
        }
    }
}
</style>
