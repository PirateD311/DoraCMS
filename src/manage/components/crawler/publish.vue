<template>
    <div>
        <el-form :model="formData" ref="form" label-width="80px">
            <el-form-item label="分类">
                <el-input v-model="formData.categories"></el-input>
            </el-form-item>
            <el-form-item label="书籍">
                <el-input v-model="formData.books"></el-input>
            </el-form-item>
            <el-form-item label="标签">
                <el-input v-model="formData.tags"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

</script>