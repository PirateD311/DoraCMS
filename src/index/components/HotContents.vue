<template>
    <div>
        <PannelBox title="热门文章" className="hot-content-list">
            <div class="content-list">
                <ul>
                    <li class="hot-li" v-for="(item,index) in hotItems" :key="item._id">
                        <el-row>
                            <el-col class="img"><img :src="item.sImg.replace('http://oz7btgiar.bkt.clouddn.com/small','/upload/images')"></el-col>
                            <el-col class="con">
                                <router-link class="title" :to="'/details/'+item._id+'.html'">{{item.title}}</router-link>
                                <span class="time"><i class="el-icon-time"></i>{{item.updateDate}}</span>
                                <span class="time"><i class="el-icon-message"></i>{{item.commentNum}}</span>
                                <span class="time"><i class="el-icon-view"></i>{{item.clickNum}}</span>
                            </el-col>
                        </el-row>                       
                    </li>
                </ul>
            </div>
        </PannelBox>
    </div>
</template>
<script>
    import PannelBox from './PannelBox.vue'
    export default {
        name: 'hotContents',
        data() {
            return {
                loadingState: true
            }
        },
        props: ['hotItems', 'typeId'],
        components: {
            PannelBox
        },
        serverCacheKey: props => {
            return `hotItem-${props.typeId}`
        }
    }
</script>

<style lang="scss">
    $borderColor:#409eff;
    .hot-content-list {
        h3{    font-size: 20px;
    color: red;
    font-weight: 700;}
        background: #fff;
        border-radius: 15px;
        padding:10px;
        margin-bottom: 30px;
        .content-list {
            text-align: left;
            ul {
                .hot-li:last-child{
                    border: none;
                }
                li {
                   .img {
                        padding:5px;
                        img{width:100%;border-radius:30px;border: 2px solid rgba(58, 142, 230, 0.53);}
                    }
                    .con {
                        -webkit-transition: opacity .5s ease-in;
                        transition: opacity .5s ease-in;
                        .title{
                            display: block;
                            text-align: center;
                            font-size: 16px;
                            font-weight: 700;
                        }
                        .time {
                            padding-top: 3px;
                            display: inline-block;
                            color: #a4abb1;
                            margin-left:10px;
                            float:right;
                        }
                    }
                    
                }
            }
        }
    }
</style>