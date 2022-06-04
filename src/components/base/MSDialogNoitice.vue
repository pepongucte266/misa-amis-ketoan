<template>
  <div class="m-popup-noitice">
    <div class="m-popup-noitice-content">
      <div class="m-pupup-title"></div>
      <div class="m-popup-body m-flex">
        <div><div class="m-popup-icon m-icon" :class="noiticeStyle"></div></div>
        <div v-if="errorList.lenght > 0">
          <div v-for="error in errorList" :key="error" class="m-popup-text">
            &#8226; {{ error }}
          </div>
        </div>
        <div v-else class="m-popup-text">&#8226; {{ errorList }}</div>
      </div>
      <div class="m-dialog-footer">
        <div class="m-popup-divide"></div>
        <div class="m-popup-footer-btn m-flex">
          <button class="m-btn" @click="cancel()">Hủy</button>
          <button class="m-btn m-btn-primary" @click="confirm()">Đồng ý</button>
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
  props: ["errorList","noiticeStyle"],
  setup(props, { emit }) {
    var resolvePromise = false;
    function getResult() {
      return new Promise((resolve) => {
        return (resolvePromise = resolve);
      });
    }

    function confirm() {
      emit("isShowDialogNoitice", false);
      resolvePromise(true);
    }

    function cancel() {
      emit("isShowDialogNoitice", false);
      resolvePromise(false);
    }

    return { getResult, confirm, cancel };
  },
};
</script>
