<template>
    <div>
       <input type="file" @change="uploadFile">
      <button @click="downloadFile">下载文件</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  export default {
    computed: {
        ServeIp() {
        return this.$store.state.user.ServeIp
        },
        ServePort() {
        return this.$store.state.user.ServePort
        }
    },
    methods: {
      uploadFile(e) {
        let formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('param1', '1231')
        axios.post('http://' + this.ServeIp + ':' + this.ServePort + '/upload', formData)
          .then(response => {
            console.log(response.data)
            alert(response.data);
          })
          .catch(error => {
            console.log(error.response.data)
          })
      },
      downloadFile() {
        let fileName = 'example.txt'  // 要下载的文件名
        window.open('http://' + this.ServeIp + ':' + this.ServePort + '/download/' + fileName)
      }
    }
  }
</script>