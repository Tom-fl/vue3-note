<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-15 17:18:29
 * @LastEditTime: 2022-02-15 17:28:01
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\views\AsyncComponent.vue
 * @Environment: Win 10
 * @Description: vue3异步组件
-->
<template>
  <div>
    <AsyncPageWithOptions />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
  name: "AsyncComponent",
  components: {
    // 无配置异步组件
    AsyncPage: defineAsyncComponent(() => import("@/components/ChildAsyncComponent.vue")),

    // 有配置异步组件
    AsyncPageWithOptions: defineAsyncComponent({ loader: () => import("@/components/ChildAsyncComponent.vue"), delay: 2000, timeout: 3000, errorComponent: () => import("@/components/Error.vue"), loadingComponent: () => import("@/components/Loading.vue") }),
  },
}
</script>

<style></style>
