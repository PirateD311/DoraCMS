<template>
    <PannelBox title="标签云" className="content-tag">
        <div class="content-tag-list">
            <ul class="">
                <li :key="item._id" v-for="(item,index) in tags" >
                    <el-button size="mini" round @click="searchTag(item)">{{item.name}}</el-button>
                    <!-- <router-link :to="'/tag/'+item.name">{{item.name}}</router-link> -->
                </li>
            </ul>

            
        </div>
        <span style="font-size: 14px;float: right;padding-right: 40px;">PS:滚动有更多标签哦</span>
    </PannelBox>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import PannelBox from './PannelBox.vue'
    export default {
        name: 'Tag',
        props: ['tags'],
        components: {
            PannelBox
        },
        methods: {
            searchTag(item) {
                this.$router.push('/tag/' + item.name)
            }
        }
    }
</script>

<style lang="scss">
    .content-tag {
        .pannel-title{display:block !important;margin-bottom: 0;}
        
        ul {
            padding-top: 15px;
            li {
                float: left;
                height: 35px;
                margin: 0 10px 10px 0;
                cursor: pointer;
                text-align: left;
                border: none;
                padding: 0;
                font-weight: 700;
                a:link,
                a:visited {
                    color: #3ca5f6;
                }
                a:hover {
                    color: #337ab7
                }
            }
        }
    }
</style>