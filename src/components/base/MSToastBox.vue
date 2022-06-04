<template>
  <div v-if="isShowToastBox" class="m-toast-box">
    <div v-if="isError" class="m-toast-item m-toast-error">
      <div class="m-toast-icon ">
        <div class="m-icon m-icon-toast-error"></div>
      </div>
      <div class="m-toast-text">{{message}}</div>
      <div class="m-toast-close" @click="close">
        <div class="m-icon m-icon-toast-close"></div>
      </div>
    </div>
    <!-- <div class="m-toast-item m-toast-warning">
      <div class="m-toast-icon">
        <div class="m-icon m-icon-toast-success"></div>
      </div>
      <div class="m-toast-text">{{message}}</div>
      <div class="m-toast-close"><i class="fa-solid fa-xmark"></i></div>
    </div> -->
    <div v-if="isSuccess" class="m-toast-item m-toast-success">
      <div class="m-toast-icon"><div class="m-icon m-icon-toast-success"></div></div>
      <div class="m-toast-text">{{message}}</div>
      <div class="m-toast-close" @click="close">
        <div class="m-icon m-icon-toast-close"></div>
      </div>
    </div>
    <!-- <div class="m-toast-item m-toast-info">
      <div class="m-toast-icon"><i class="fa-solid fa-circle-info"></i></div>
      <div class="m-toast-text">{{message}}</div>
      <div class="m-toast-close"><i class="fa-solid fa-xmark"></i></div>
    </div> -->
  </div>
</template>

<style scoped>
@import url('../../style/components/toast.css');
</style>

<script>
import {  reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      isShowToastBox: false,
      isError: false,
      isSuccess: false,
      message: ''
    })
    function show(flag,msg) {
      state.message = msg
      if(flag == 'error') state.isError = true
      if(flag == 'success') state.isSuccess = true
      state.isShowToastBox = true
      setTimeout(() => {
      state.isShowToastBox = false
      },1500)
    }

    function close() {
      state.isShowToastBox = false
    }

    return {...toRefs(state),show,close}
  },
}
</script>
