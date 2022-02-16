<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-14 10:45:41
 * @LastEditTime: 2022-02-15 14:50:10
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\views\About.vue
 * @Environment: Win 10
 * @Description: 
-->
<template>
  <div>
    <div id="content1">content1</div>
    <ChildAbout />
  </div>
</template>

<script>
import ChildAbout from "@/components/ChildAbout.vue"

export default {
  name: "About",
  components: { ChildAbout },
  setup() {},
}
</script>
