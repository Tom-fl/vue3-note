<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-15 11:44:49
 * @LastEditTime: 2022-02-15 17:20:47
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\views\Suspense.vue
 * @Environment: Win 10
 * @Description: 
-->
<template>
  <div>
    <Suspense>
      <template #default>
        <!-- 子组件 -->
        <ChildSuspense />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import ChildSuspense from "@/components/ChildSuspense.vue"

export default {
  name: "Suspense",
  components: { ChildSuspense },
}
</script>
