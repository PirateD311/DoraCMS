<template>
    <div class="ads">
        <div class="content-ads" v-if="ads.data">
            <div class="img-pannel" v-if="ads.data.type == '1'">
                <div v-if="ads.data.items.length == 1" class="box">
                    <a :href="ads.data.items[0].link" ><img :src="ads.data.items[0].sImg" :alt="ads.data.items[0].alt" /></a>
                </div>
                <div v-else class="box">
                    <el-carousel  :interval="4000">
                        <el-carousel-item v-for="item in ads.data.items" :key="item._id">
                            <h3>
                                <a :href="item.link" >
                                <img  :src="item.sImg" :alt="item.alt" />
                                
                                </a>
                            </h3>
                            <div class="desc">{{item.alt}}</div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="text-pannel" v-if="ads.data.type == '0'">
                <ul>
                    <li v-for="item in ads.data.items" :key="item._id">
                        <a :href="item.link" target="_blank">{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Ads',
    props: {
        id: String
    },
    mounted() {
        this.$store.dispatch('global/ads/getAdsList', { id: this.id })
    },
    computed: {
        ...mapGetters({
            ads: 'global/ads/getAdsList'
        })
    }
}

</script>

<style lang="scss">
.content-ads{
    .desc{
    position: relative;
    background-color: rgba(51, 51, 51, 0.38);
    height: 18px;
    top: -115%;
    color: white;
    text-align: center;
    font-size: 12px;
    line-height: 18px;
    margin: 0 15%;
    }
    .box{    border-radius: 30px;
    overflow: hidden;}
    margin-bottom: 10px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.img-pannel {
    padding: 15px;
    img {
        width: 100%;
    }
}

.text-pannel ul li {
    display: inline-block;
    margin-right: 10px;
}
</style>
