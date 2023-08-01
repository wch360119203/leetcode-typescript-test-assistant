<script setup lang="ts">
import fun from './components/test'
import txt from './testCase.txt?raw'
const testCase = txt.split('\r\n').map((v) => JSON.parse(v))
const len = fun.length
const params = Array<any[]>()
for (let i = 0; i < testCase.length; i += len) {
  const p = Array<any>()
  for (let j = 0; j < len; j++) {
    p.push(testCase[i + j])
  }
  params.push(p)
}
const results = params.map((v) => {
  // @ts-ignore
  return fun.call(null, ...v)
})
</script>

<template>
  <h1>测试结果:</h1>
  <template v-for="(item, index) in params" :key="index">
    <div class="title">用例{{ index + 1 }}</div>
    <div class="input">
      <span class="case" v-for="(testCase, j) in item" :key="j">{{
        testCase
      }}</span>
    </div>
    <div class="result">结果: {{ results[index] }}</div>
  </template>
</template>
<style lang="scss">
.title {
  color: brown;
  font-weight: bold;
  font-size: 1.5rem;
}
.input {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: rgb(190, 190, 190);
  padding: 12px;
  border-radius: 20px;
  max-height: 100px;
  overflow-y: auto;
  .case {
    line-height: 1.5;
  }
}
.result {
  background-color: rgb(221, 203, 170);
  padding: 12px;
  border-radius: 20px;
  margin: 10px 0px 40px 0px;
}
</style>
