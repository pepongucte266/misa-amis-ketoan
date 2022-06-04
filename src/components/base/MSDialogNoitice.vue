<template>
  <div class="m-popup-noitice">
    <div class="m-popup-noitice-content">
      <div class="m-pupup-title"></div>
      <div class="m-popup-body m-flex">
        <div class="m-popup-icon m-icon m-icon-error"></div>
        <div v-if="errorList.lenght > 0">
          <div v-for="error in errorList" :key="error" class="m-popup-text">&#8226; {{error}}</div>
        </div>
        <div v-else class="m-popup-text">&#8226; {{errorList}}</div>
      </div>
      <div class="m-dialog-footer">
        <div class="m-popup-divide"></div>
        <div class="m-popup-footer-btn m-flex">
          <button class="m-btn m-btn-primary" @click="btnAccept">Đồng ý</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../style/components/popup.css");
</style>

<script>
export default {
  props: ["errorList"],
  setup(props, { emit }) {
    // console.log(props.errorList);
    function btnAccept() {
      emit("isShowDialogNoitice",false)

    }
    return {btnAccept}
  },
};
</script>
