<template>
    <PannelBox title="近期文章" className="recent-content-list">
        <div class="content-list">
            <ul>
                <li :key='index' v-for="(item,index) in recentItems.slice(0,5)">
                    <el-row>
                        <el-col class="img"><img :src="item.sImg"></el-col>
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
</template>
<script>
    import PannelBox from './PannelBox.vue'
    export default {
        name: 'recentlyContents',
        data() {
            return {
                loadingState: true
            }
        },
        components: {
            PannelBox
        },
        props: ['recentItems']
    }
</script>

<style lang="scss">
    .recent-content-list {
        h3{font-size: 20px;color: #2196F3;font-weight: 700;}
        .content-list {
            text-align: left;
            ul {
                li {
                    font-size: 14px;
                    padding: 0 0 .75rem 1rem;
                    position: relative;
                    color: #333;
                    .triangle {
                        position: absolute;
                        top: .3rem;
                        left: .3rem;
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-color: #fff #fff #fff #4285f4;
                        -webkit-transform-origin: 25% center;
                        transform-origin: 25% center;
                        border-width: 4px;
                    }
                    .img {
                        padding:5px;
                        img{border-radius:30px;border: 2px solid rgba(58, 142, 230, 0.53);}
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