<template>
  <div  v-title data-title="智慧档案馆管理总平台 "  id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>

*{
  padding: 0px;
  margin: 0px;
}
html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
 margin: 0;
 padding: 0;
 border: 0;
}
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  /* background-color: #03050C; */
  /* overflow: hidden; */
}

</style>
