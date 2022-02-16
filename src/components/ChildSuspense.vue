<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-15 14:48:25
 * @LastEditTime: 2022-02-15 15:40:40
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\components\ChildSuspense.vue
 * @Environment: Win 10
 * @Description: 
-->

<template>
  <div>{{ data }}</div>
</template>

<script>
import axios from "axios"

export default {
  name: "ChildSuspense",
  async setup() {
    let data = await axios.get("http://httpbin.org/anything").then(res => {
      if (res.status == 200) {
        return res
      }
    })

    return {
      data,
    }
  },
}
</script>

<style></style>
