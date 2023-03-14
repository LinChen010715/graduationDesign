<template>
  <div>对象[]与对象.属性的区别与用法</div>
</template>

<script setup>
var a = {};
var b = {
  key: "b",
};
var c = {
  key: "c",
};

a[b] = "1";
a[c] = "2";
console.log(JSON.stringify(a));
console.log(a[b]);
console.log(a[c]);
console.log(a["b"]);
console.log(a["c"]);
console.log(a.b);
console.log(a.c);
a["b"] = "3";
a["c"] = "4";
console.log(a[b]);
console.log(a[c]);
console.log(a["b"]);
console.log(a["c"]);
console.log(a.b);
console.log(a.c);
</script>
