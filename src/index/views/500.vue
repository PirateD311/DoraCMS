<template>
    <div class="notFound">
        <div class="head">
            <h1>服务器酱迷失了自我。。。</h1>
            <a href="/"><el-button type="success" size="small" round>回到首页</el-button></a>
        </div>
        <div class="pic">
            <img src="../assets/500.gif" alt="">
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
