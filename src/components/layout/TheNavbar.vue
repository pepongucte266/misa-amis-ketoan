<template>
  <div class="navbar">
    <router-link :to="{ name: 'Home' }" class="menu-item">
      <div class="menu-icon m-icon m-icon-dashboard"></div>

      <div class="menu-text">Tổng quan</div>
    </router-link>

    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-cash"></div>

      <div class="menu-text">Tiền mặt</div>
    </div>

    <router-link  :to="{ name: 'Bank' }" class="menu-item">
      <div class="menu-icon m-icon m-icon-deposits"></div>

      <div class="menu-text">Tiền gửi</div>
    </router-link>

    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-buy"></div>

      <div class="menu-text">Mua hàng</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-sell"></div>

      <div class="menu-text">Bán hàng</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-bill"></div>

      <div class="menu-text">Quản lý hóa đơn</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-warehouse"></div>

      <div class="menu-text">Kho</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-tool"></div>

      <div class="menu-text">Công cụ dụng cụ</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-asset"></div>

      <div class="menu-text">Tài sản cố định</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-tax"></div>

      <div class="menu-text">Thuế</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-price"></div>

      <div class="menu-text">Giá thành</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-general"></div>

      <div class="menu-text">Tổng hợp</div>
    </div>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-budget"></div>

      <div class="menu-text">Ngân sách</div>
    </div>
    <router-link :to="{ name: 'Report' }" class="menu-item">
      <div class="menu-icon m-icon m-icon-report"></div>

      <div class="menu-text">Báo cáo</div>
    </router-link>
    <div class="menu-item">
      <div class="menu-icon m-icon m-icon-analysis"></div>

      <div class="menu-text">Phân tích tài chính</div>
    </div>
  </div>
</template>

<style scoped>
@import url("../../style/layout/navbar.css");
</style>
