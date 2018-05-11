<template>
    <div class="notFound">
        <div class="head">
            <h1>404 Not Found</h1>
            <h3>页面酱被东方的神秘力量吞噬了</h3>
            <a href="/"><el-button type="success" size="small" round>回到首页</el-button></a>
        </div>
        <div class="pic">
            <img src="../assets/404_2.gif" alt="">
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .notFound {
        h1{    font-weight: 900;
        font-size: 40px;}
        text-align:center;
        min-height:500px;
        .head{margin-bottom:15px;}
        .pic{
            img{border-radius: 30px; }
        }
    }    
</style>
