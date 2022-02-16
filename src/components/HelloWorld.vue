<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-02-14 10:45:41
 * @LastEditTime: 2022-02-15 09:54:59
 * @Email: str-liang@outlook.com
 * @FilePath: \vuedemo\src\components\HelloWorld.vue
 * @Environment: Win 10
 * @Description: 
-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="hanldeClickBtn">点击</button>

    <ul>
      <li>{{ num1 }}</li>
      <li>姓名1:{{ name }}</li>
      <!-- 解构后这样表示 -->
      <li>年龄1:{{ age }}</li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs, watch, watchEffect } from "vue"

export default {
  name: "HelloWorld",
  data() {
    return {
      name: "HelloWorld",
    }
  },
  props: {
    msg: String,
  },
  setup(props, context) {
    // 这样是错误的，不能进行解构，解构会消除他的响应式
    // let { msg } = props

    // console.log(props, context)
    // console.log(props.msg)

    let num1 = ref(1)
    let p1 = reactive({ name: "亚索", age: 18 })
    setTimeout(() => {
      p1.age++
    }, 500)

    setTimeout(() => {
      num1.value++
    }, 500)

    //监听reactive的数据
    watch(
      () => p1.age,
      (newVal, oldVal) => {
        console.log(newVal, oldVal)
      }
    )
    watchEffect(() => {
      console.log(p1.age, "watchEffect")
    })

    // 监听ref的数据
    const stopWatch = watch(num1, (newVal, oldVal) => {
      console.log(newVal, oldVal)
    })

    setTimeout(() => {
      // 停止监听
      stopWatch()
    }, 1000)

    return {
      num1,
      ...toRefs(p1),
    }
  },
  methods: {
    hanldeClickBtn() {
      console.log("xx")
      this.$emit("childName", this.name)
    },
  },
}
</script>
