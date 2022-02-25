## vue3新增功能

### 性能提升

- 打包大小减少了41%
- 渲染更快
- **使用Proxy代替了defineProperty实现数响应式**
- **重写虚拟DOM以及实现Tree-Shking(摇树)**

### 新增特性

- **Compostion-api**
  - setup
- 新组件
  - Fragment - 文档碎片
  - Teleport - 瞬移组件的位置
  - Suspense - 异步加载组件的loading界面
- 其他api更新

### Compositon-api (常用)

##### setup

- 执行时机

  - vue3新增的一个选项，他是组件内使用Composition API的入口

  - 他会在beforeCreate之前执行

  - ```js
    setup() {
        console.log("----setup----");
      }
    ```

- 参数

  - props：组件传入的属性
  - context：三个常见属性 attrs、slot、emit

##### reactive、ref 与 toRefs

- vue2 在data里定义数据，在vue3可以在reactive 和ref里定义

- `reactive`函数确实可以代理一个对象， 但是不能代理基本类型，例如字符串、数字、boolean 等

- `ref`可以代理数字、字符串、boolean

- reactive  和 ref 内部是基于 ES 6 的`Proxy`实现，通过代理使对象内部数据都是响应式的

  - ```js
    <!-- 解构前这样表示 -->
    <li>年龄1:{{ p1.age }}</li>
    
    <!-- 解构后这样表示 -->
    <li>年龄1:{{ age }}</li>
    
    import { defineComponent, reactive, ref, toRefs } from "vue";
    
      setup(props, context) {
        // let obj1={name:'xx',age:12}; // 直接这样定义 数据不是响应式的
          
    	const num1 = ref(1)
        // console.log(num1.value)
        let p1 = reactive({ name: "亚索", age: 18 })
        return {
          num1,
          // ...p1, 这样解构出来是不推荐的，因为解构后会取消他的响应式，所以使用 toRefs
          // p1,
          ...toRefs(p1), // 使用toRefs
        }
      }
    ```

- **为什么使用 ... 解构出来不推荐呢**
  1. 问题根源在于准确理解ES6解构发生了什么，解构相当于重新声明变量
  2. java等高级面向对象语言中对每个数据赋值和取值都强行要求采用赋值器set和取值器get。 有了这两个方法就可以在赋值或取值时进行拦截，在拦截中触发连锁修改，实现响应。 javasript没有这样的强制机制，都是直接访问，所以无法实现set拦截。 所以就利用了JavaScript提供的defineProperty方法，该方法的作用是为对象增加属性，并且可以同时定义该属性的赋值器set，这样就实现了可拦截，从而再做到响应式触发。 ref是对被包裹对象整体做了一个赋值器拦截，没有分别对它的属性，以及属性的属性做赋值器，所以没能实现拦截。没有拦截就不能做到连锁修改，也就不能做到响应式。 torefs是对一个对象的所有属性做ref()，并返回了和属性同名的ref对象，它是同名，但不是同一对象，它内部根据赋值保留与原对象属性的联系。

##### watch 与 watchEffect

- 也是需要引入

- watch

  - ```js
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
    
        // 监听ref的数据
        watch(num1, (newVal, oldVal) => {
          console.log(newVal, oldVal)
        })
    ```

  - 停止监听

  - ```js
        // 监听ref的数据
        const stopWatch = watch(num1, (newVal, oldVal) => {
          console.log(newVal, oldVal)
        })
    
        setTimeout(() => {
          // 停止监听
          stopWatch()
        }, 1000)
    ```

- watchEffect

- ```js
      watchEffect(() => {
        console.log(p1.age, "watchEffect")
      })
  ```
  
- watchEffect和watch区别

  1. watchEffect 不需要手动传入依赖
  2. watchEffect 会先执行一次用来自动收集依赖
  3. watchEffect 无法获取到变化前的值， 只能获取变化后的值



### Compositon-api (其他)

##### 响应式基础API

- [参考文档](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive)

- `readonly` 只读
- shallowReactive 浅劫持浅响应式
  - 
- 等...

##### Refs

- [参考文档](https://v3.cn.vuejs.org/api/refs-api.html)

- customRef
  - 可以搞防抖函数小例子 - 官方有示例
- 等...

##### 响应式数据的判断

- `isRef`:检查一个值是否为ref对象
- `isReactive`:检查对象是否是由 reactive创建的响应式代理
- `isReadonly`:检查对象是否由readonly创建
- `isProxy`：检查对象是否是由 reactive 或 readonly创建的 proxy



### vue2和vue3响应式对比

- 为什么要将`Object.defineProperty`换掉呢？
  - 在vue2里经常遇到一个问题，数据更新了为什么页面不更新呢？什么时候使用`$set`,什么时候使用`$forceUpdate`强制更新，一切根源都是`Object.defineProperty`
  
- `Object.defineProperty`和`Proxy`
  
  1. `Object.defineProperty`只能劫持对象的属性，而Proxy是直接代理对象
     - 由于`Object.defineProperty`只能劫持对象属性，需要遍历对象的每一个属性，**如果属性也是对象的话，就需要递归进行深度遍历。**而`Proxy`直接代理对象，不需要遍历操作
  2. `Object.defineProperty`对新增属性需要手动进行`Observe`
     - 因为`Object.defineProperty`劫持的是对象的属性，所以新增属性时，需要重新遍历对象，对新增属性再次进行`Object.defineProperty`进行劫持，也就是说**需要使用`$set`才能保证新增的属性也是响应式的**,**`$set`内部也是通过调用`Object.defineProperty`去处理的**
  
- vue2的响应式

  - 核心:

    - 对象:通过defineProperty对  对象已有的属性值进行读取和修改进行劫持(拦截)

    - 数组:通过重写数组更新数组一系列更新元素的方法来实现元素的修改和劫持

    - ```js
      Object.defineProperty(data,'count',{
      	get () {}
          set () {}
      })
      ```

  - 问题:

    - 对象:对象直接新添加的属性或删除已有属性，页面不会自动更新
    - 数组:直接通过下标替换元素或更新length，页面不会自动更新 arr[1]={}
    - **所以才会使用 $set来更新数据，保证是响应式的**

- vue3

  - 核心:
    - **Vue3中使用了`Proxy`配合`Reflect`代替了Vue2中的Object.defineProperty() 实现数据的响应式(数据代理)**
    - 通过Proxy代理:拦截data任意属性的操作(13种)，包括属性值的读写 添加 删除 等...
    - 通过 Reflect(反射):动态对被代理对象的相应属性进行特定操作
    - [参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
  - 问题




### Teleport 任意门

- Teleport 是vue3推出的新功能，Teleport 像是任意门，就是将一个人传送人另一个地方去

- 简单来说:`将希望继续在组件内部使用的元素，又希望渲染的DOM结构不嵌套在组件的DOM中`可以用<Teleport>包裹起来，这样就建立了一个传送门，可以指定任何地方

- ```js
  <div id="dialog" class="dialog"></div>  
  
  <teleport to="#dialog">  //<teleport to=".dialog">
      <div class="header">header</div>
      <div class="contnet">contnet</div>
      <div class="footer">footer</div>
    </teleport>
  ```



### Suspense

- 比如在请求接口的 时候 搞一个loading 动画效果 就可以用这个

- ```js
  // 父组件
  <Suspense>
    <template #default>
      <!-- 子组件 -->
      <ChildSuspense />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
  
  // 子组件
  <div>{{ data }}</div>
  
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
  ```

- `Suspense` 只是一个带插槽的组件，只是它的插槽指定了`default` 和 `fallback` 两种状态



### 片段

- vue2里只能有一个根节点

  - ```js
    <template>
        <div>
            <span></span>
            <span></span>
        </div>
    </template>
    ```

- vue3可以有多个根节点

  - ```js
    <template>
        <div></div>
        <div></div>
    </template>
    ```



### Tree-shaking

- vue3在考虑到`tree-shaking`的基础上重构了全局和内部 API，比如vue2里的nextTick

  - ```js
    // vue2
    import Vue from "vue"
    
    Vue.nextTick(()=>{
        ...
    })
    
    // vue3
    import { nextTick } from "vue"
    
    nextTick(() =>{
        ...
    })
    ```

- 受影响的API

  - `Vue.nextTick`
  - `Vue.observable`（用 `Vue.reactive` 替换）
  - Vue.set
  - Vue.delete

### 声明周期

- 注意vue3的钩子函数，是需要import 从vue导入的，并且有`on`前缀，比如 `onCreated`

- <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de01e730e563406cbf3399861fa23aa4~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom:40%;" />



### Composition API VS Option API

##### Option API 的问题

- 在传统的 Vue OptionsAPI 中，新增或者修改一个需求，就需要分别在 data，methods，computed 里修改 ，滚动条反复上下移动
- ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image)
- 

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image)

#####  使用 Compisition API

- 我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起
- ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image)
- ![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image)
- ![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c421e5392504ecc94c222057dba338a~tplv-k3u1fbpfcp-watermark.image)



### 其他变更

##### slot具名插槽

- ```js
  // vue2
  <!--  子组件中：-->
  <slot name="title"></slot>
  
  <!--  父组件中：-->
  <template slot="title">
      <h1>歌曲：成都</h1>
  <template>
  
  // 子组件
  <slot name="content" :data="data"></slot>
  export default {
      data(){
          return{
              data:["走过来人来人往","不喜欢也得欣赏","陪伴是最长情的告白"]
          }
      }
  }
  
  <!-- 父组件中使用 -->
  <template slot="content" slot-scope="scoped">
      <div v-for="item in scoped.data">{{item}}</div>
  <template>
  
  ```

- ```js
  // vue3
  <!-- 父组件中使用 -->
   <template v-slot:content="scoped">
     <div v-for="item in scoped.data">{{item}}</div>
  </template>
  
  <!-- 也可以简写成： -->
  <template #content="{data}">
      <div v-for="item in data">{{item}}</div>
  </template>
  ```

##### 自定义指令

- ```js
  // vue2
  // 注册一个全局自定义指令 `v-focus`
  Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  }
  ```

- ```js
  // vue3
  const { createApp } from "vue"
  
  const app = createApp({})
  app.directive('focus', {
      mounted(el) {
          el.focus()
      }
  })
  // 模板使用
  <input v-focus />
  ```

##### v-module改变

- 变更：在自定义组件上使用`v-model`时， 属性以及事件的默认名称变了

- 变更：`v-bind`的`.sync`修饰符在 Vue 3 中又被去掉了, 合并到了`v-model`里

- 新增：同一组件可以同时设置多个 `v-model`

- 新增：开发者可以自定义 `v-model`修饰符

- ```js
  // vue2
  <modal :visible.sync="isVisible"></modal>
  
  
  // vue3 抛弃了.sync，统一使用v-module
  <modal v-model="isVisible"></modal>
  <!-- 相当于 -->
  <modal :modelValue="isVisible" @update:modelValue="isVisible = $event"></modal>
  
  <modal v-model:visible="isVisible" v-model:content="content"></modal>
  
  <!-- 相当于 -->
  <modal
      :visible="isVisible"
      :content="content"
      @update:visible="isVisible"
      @update:content="content"
  />
  ```

##### 异步组件

- Vue3 中 使用 `defineAsyncComponent` 定义异步组件，配置选项 `component` 替换为 `loader` loader 函数本身不再接收 resolve 和 reject 参数，且必须返回一个 Promise

  - ```js
    <template>
      <!-- 异步组件的使用 -->
      <AsyncPage />
    </tempate>
    
    <script>
    import { defineAsyncComponent } from "vue";
    
    export default {
      components: {
        // 无配置项异步组件
        AsyncPage: defineAsyncComponent(() => import("./NextPage.vue")),
    
        // 有配置项异步组件
        AsyncPageWithOptions: defineAsyncComponent({
       loader: () => import(".NextPage.vue"),
       delay: 200,
       timeout: 3000,
       errorComponent: () => import("./ErrorComponent.vue"),
       loadingComponent: () => import("./LoadingComponent.vue"),
     })
      },
    }
    </script>
    ```

##### v-for和v-if的优先级

- 2x: 同时使用v-if 和 v-for , v-for 会优先
- 3x: v-if 优先级会大于v-for 
- v-on.native 修饰符移出



##### 父组件传值  provide和inject

- **这两个方法只能在setup()里调用**
- provide可以向所有子孙组件提供数据以及提供修改数据的方法，子孙组件用inject使用数据

