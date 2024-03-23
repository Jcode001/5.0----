<template>

</template>
<script>
console.log(['1','2','3'].map(parseInt));
function createCopyText(){
    if(navigator.clipboard){
        
        navigator.clipboard.writeText(text)
    }else{
        return (text)=>{
          const input=document.createElement("input");
          input.setAttribute('value',text);
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        };
    }
}
function save(value)
{
    localStorage.setItem("address",1);
}
function read()
{
    //    sessionStorage.
    return localStorage.getItem("address");
}
</script>
<style scoped lang="scss">
</style>