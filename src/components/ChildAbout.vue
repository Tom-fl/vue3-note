<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-15 09:24:37
 * @LastEditTime: 2022-02-15 11:35:32
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\components\ChildAbout.vue
 * @Environment: Win 10
 * @Description: about组件
-->

<template>
  <teleport to="#dialog">
    <div class="header">header</div>
    <div class="contnet">contnet</div>
    <div class="footer">footer</div>
  </teleport>
</template>

<script>
export default {
  name: "ChildAbout",
}
</script>

<style></style>
