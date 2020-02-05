<template>
  <div class="upload">
    <input
      type="file"
      id="f1"
    /><br /><br />
    <button
      type="button"
      @click="submitUpload"
    >上 传</button>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      files: []
    };
  },
  methods: {
    submitUpload() {
      //获得文件列表，注意这里不是数组，而是对象
      var fileList = document.getElementById("f1").files;
      console.log(fileList);
      if (!fileList.length) {
        alert("请选择文件");
        return;
      }
      const fd = new FormData(); //构造FormData对象
      //多文件上传需要遍历添加到 fromdata 对象
      for (var i = 0; i < fileList.length; i++) {
        fd.append("f1", fileList[i]); //支持多文件上传
      }
      fetch("/api/files/upload", {
        method: "POST",
        body: fd
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          //   if (response.fileUrl.length) {
          //     alert("上传成功");
          //   }
        })
        .catch(error => console.error("Error:", error));
    }
  }
};
</script>
<style lang="scss" scoped>

</style>
