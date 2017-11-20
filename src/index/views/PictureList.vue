<template>
    <article class="content-item">
   
            <el-col class="border" :xs="24" :sm="24" :md="24" :lg="24">
                <div class="post-angle" v-if="item.isTop == 1">荐</div>
                <div class="post-angle" v-if="item.isVip == true">会员专享</div>
                <div class="grid-content bg-purple contentImg" >
                    <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">
                        <img :class="{blur:item.isVip}" :src="item.sImg" :alt="item.title" />
                    </router-link>
                </div>
                <div>
                    <h6 class="text-center">{{item.title}}</h6>
                </div>
            </el-col>


    </article>
</template>
<style lang="scss">
    .content-item {
        .border{
            border-radius: 15px;
            padding-top: 15px;
        }

        h6{text-align:center;margin: 5px 0;}
        .post-angle {
            position: absolute;
            left: -10px;
            height: 21px;
            color: #fff;
            text-align: center;
            background-color: #f63756;
            line-height: 24px;
            padding: 0 10px;
            z-index: 101;
            top: 0px;
            font-size: 13px;
        }
        .post-angle:after {
            content: " ";
            position: absolute;
            left: 0;
            top: 21px;
            width: 0;
            height: 0;
            border-top: 6px solid #cd213d;
            border-left: 10px solid transparent;
        }
        .contentImg {
            height: 200px;
            overflow:hidden;
            img {
                width: 100%;
            }
            
            display: block;
            position: relative;
            .content-cate {
                position: absolute;
                top: .4rem;
                left: .4rem;
                display: block;
                padding: 0 .5rem;
                color: #fff;
                background: rgba(0, 0, 0, .5);
                font-size: .6rem;
                text-align: center;
                border-radius: 1rem;
                z-index: 11;
            }
        }
        .discription {
            text-align: left;
            .post-meta {
                a:link,
                a:visited {
                    color: #3ca5f6;
                }
                li {
                    display: inline-block;
                    font-size: 13px;
                    color: #b4b4b4;
                    margin: 10px 10px 10px 0;
                }
            }
            .title {
                h2 {
                    margin: 0;
                    font-size: 18px;
                    word-break: break-all;
                }
            }
            .dis {
                margin: 12px 0;
                font-size: 14px;
                color: #333333;
            }
        }
    }
</style>

<script>
    export default {
        name: 'index-item',
        serverCacheKey: props => {
            return `article-item-${props.item._id}`
        },
        props: ['item'],
        created(){
            // console.log('TopItem Created...Item->',this.item);
        }
    }
</script>