<template>
  <div
    v-if="isShowExpand"
    :style="{ top: expandTop, left: expandLeft }"
    class="m-expand"
  >
    <div class="text-align-left m-expand-item">Nhân bản</div>
    <div class="text-align-left m-expand-item" @click="btnDelete(employeeId)">
      Xóa
    </div>
    <div class="text-align-left m-expand-item">Ngừng sử dụng</div>
  </div>
  <div class="page-content">
    <div class="m-page-header">
      <div class="m-page-title">Nhân viên</div>
      <div class="m-page-button">
        <button id="btnAdd" class="m-btn m-btn-primary" @click="btnAddOnClick">
          Thêm mới nhân viên
        </button>
      </div>
    </div>

    <div class="m-page-toolbar">
      <div class="m-input-box">
        <input
          type="text"
          placeholder="Tìm theo mã, tên nhân viên"
          class="m-input"
          @blur="txtSearchOnBlur($event.target.value)"
        />
        <div class="m-input-icon m-input-icon m-icon m-icon-search"></div>
      </div>
      <div
        class="m-btn-fresh m-icon m-icon-refresh"
        @click="fetchEmployees(pageSize, pageNumber)"
      ></div>
    </div>

    <div class="m-page-grid">
      <div class="m-grid">
        <table class="m-table" id="tblEmployee">
          <thead>
            <tr>
              <th class="text-align-center" style="width: 50px">
                <input type="checkbox" class="m-checkbox" />
              </th>
              <th class="text-align-left" style="min-width: 70px">
                MÃ NHÂN VIÊN
              </th>
              <th class="text-align-left" style="min-width: 170px">
                TÊN NHÂN VIÊN
              </th>
              <th class="text-align-left" style="min-width: 70px">GIỚI TÍNH</th>
              <th class="text-align-center" style="min-width: 100px">
                NGÀY SINH
              </th>
              <th class="text-align-left" style="min-width: 100px">SỐ CMND</th>
              <th class="text-align-left" style="min-width: 130px">
                CHỨC DANH
              </th>
              <th class="text-align-left" style="min-width: 140px">
                TÊN ĐƠN VỊ
              </th>
              <th class="text-align-left" style="min-width: 150px">
                SỐ TÀI KHOẢN
              </th>
              <th class="text-align-left" style="min-width: 120px">
                TÊN NGÂN HÀNG
              </th>
              <th class="text-align-left" style="min-width: 160px">
                CHI NHÁNH TK NGÂN HÀNG
              </th>
              <th class="text-align-center" style="min-width: 100px">
                CHỨC NĂNG
              </th>
            </tr>
          </thead>
          <tbody v-if="employees">
            <tr
              v-for="employee in employees"
              :key="employee.EmployeeId"
              @dblclick="rowOnDblClick(employee)"
            >
              <SingleEmployee
                :employee="employee"
                @isShowDialog="showEmployeeDetailDialog"
                :employeeId="employeeId"
                @updateId="employeeId = $event"
                @isShowExpand="showExpandDialog"
                @expandTop="expandTop = $event"
                @expandLeft="expandLeft = $event"
              />
            </tr>
          </tbody>
          <div v-else><PageLoading /></div>
        </table>
      </div>
      <div class="m-paging">
        <div class="m-paging-left">
          Tổng số: <span class="m-paging-count">{{ totalRecord }}</span> bản ghi
        </div>
        <div class="m-paging-center"></div>
        <div class="m-paging-right m-flex">
          <div class="m-paging-record-in-page">
            <select
              name=""
              id="cbxRecordInPage"
              @change="cbxRecordOnChange($event)"
            >
              <option value="40">40 lao động/trang</option>
              <option value="30">30 lao động/trang</option>
              <option value="20">20 lao động/trang</option>
              <option value="10">10 lao động/trang</option>
            </select>
          </div>

          <div class="m-paging-navigation m-flex">
            <button
              class="m-nav-page m-btn-prev"
              @click="fetchEmployees(pageSize, prevPage(pageNumber, totalPage))"
            >
              Trước
            </button>
            <div class="m-page-number-group">
              <button
                v-for="page in totalPage"
                :key="page"
                class="m-page-number"
                @click="fetchEmployees(pageSize, page)"
                v-bind:class="checkSelected(pageNumber, page)"
              >
                {{ page }}
              </button>
              <!-- <button class="m-page-number">2</button>
              <button class="m-page-number">3</button>
              <button class="m-page-number">4</button> -->
            </div>
            <button
              class="m-nav-page m-btn-next"
              @click="fetchEmployees(pageSize, nextPage(pageNumber, totalPage))"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
    <MSDialogNoitice
      v-if="isShowDialogNoitice"
      @isShowDialogNoitice="isShowDialogNoitice = $event"
      :errorList="errorList"
    />
    <EmployeeDetail
      v-if="isShowDialog"
      :employeeId="employeeId"
      @isShowDialogNoitice="isShowDialogNoitice = $event"
      @isShowDialog="showEmployeeDetailDialog"
      @fetchEmployees="fetchEmployees"
      @errorList="errorList = $event"
    />
  </div>

  <div v-if="isShowExpand" class="outside" @click="expandOnBlur"></div>
</template>

<style scoped>
@import url("../../style/pages/employee.css");
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>


<script>
import SingleEmployee from "./SingleEmployee.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import PageLoading from "../PageLoading.vue";
import axios from "axios";
import { reactive, toRefs, ref } from "vue";
export default {
  name: "EmployeePage",
  components: { SingleEmployee, EmployeeDetail, PageLoading },
  setup() {
    var isShowDialog = ref(false);
    var isShowExpand = ref(false);
    var isShowDialogNoitice = ref(false);
    const state = reactive({
      employees: [],
      employeeId: null,
      errorList: [],
      expandTop: "0",
      expandLeft: "0",
      totalRecord: null,
      totalPage: null,
      pageSize: "40",
      pageNumber: "4",
    });

    const methods = {
      /**
       * Hàm fetch API
       * @param pageSize: số bản ghi
       * @param pageNumber: số trang hiện tại
       * AUTHOR: VTSON
       */

      fetchEmployees: (pageSize = "40", pageNumber = "1") => {
        state.employees = [];
        axios
          .get(
            `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${pageSize}&pageNumber=${pageNumber}`
          )
          .then((res) => {
            state.totalRecord = res.data.TotalRecord;
            state.totalPage = res.data.TotalPage;
            state.employees = res.data.Data;
            state.pageNumber = pageNumber;

            // methods.pagination(pageNumber,state.totalPage)
          })
          .catch((error) => {
            console.log(error);
          });
      },

      fetchEmployeesByKeyWord: (
        pageSize = "20",
        pageNumber = "1",
        employeeFilter = ""
      ) => {
        state.employees = [];
        if (employeeFilter) {
          employeeFilter = `employeeFilter=${employeeFilter}&`;
        }
        axios
          .get(
            `https://amis.manhnv.net/api/v1/Employees/filter?${employeeFilter}&page=${pageSize}&pageNumber=${pageNumber}`
          )
          .then((res) => {
            if (res.status == 204) {
              throw new Error("Không tìm thấy dữ liệu");
            } else {
              state.totalRecord = res.data.TotalRecord;
              state.totalPage = res.data.TotalPage;
              state.employees = res.data.Data;
              state.pageNumber = pageNumber;
            }
            // methods.pagination(pageNumber,state.totalPage)
          })
          .catch((error) => {
            console.log(error);
            isShowDialogNoitice.value = true;
            state.errorList = error;
            methods.fetchEmployees(state.pageSize, state.pageNumber);
          });
      },

      /**
       * Hiển thị form chi tiết nhân viên
       * @param {Boolean} isShow - true: hiển thị, false - ẩn
       * Author: VTSON (1/06/2022)
       */
      showEmployeeDetailDialog: (isShow) => {
        isShowDialog.value = isShow;
      },

      /**
       * Hàm thực hiện nút thêm mới
       * Author: VTSON (1/06/2022)
       */
      btnAddOnClick: () => {
        state.employeeId = null;
        methods.showEmployeeDetailDialog(true);
      },

      /**
       * DBClick nhân viên
       * @param {Object} employee
       * Author: VTSON (1/06/2022)
       */
      rowOnDblClick: (employee) => {
        state.employeeId = employee.EmployeeId;
        methods.showEmployeeDetailDialog(true);
      },

      /**
       * Hàm xử lý khi click ngoài expand
       * @ AUTHOR: VTSON
       */
      expandOnBlur: () => {
        methods.showExpandDialog(false);
      },

      showExpandDialog: (isShow) => {
        isShowExpand.value = isShow;
      },

      /**
       * Hàm thực hiện xóa nhân viên
       * @param {String} employeeId: id nhân viên
       * @ AUTHOR: VTSON
       */
      btnDelete: (employeeId) => {
        axios
          .delete(`https://amis.manhnv.net/api/v1/Employees/${employeeId}`)
          .then((res) => {
            console.log(res);
            isShowExpand.value = false;
            methods.fetchEmployees(state.pageSize, state.pageNumber);
          })
          .catch((error) => {
            console.log(error);
          });
      },

      // pagination: (curentPage, lastPage) => {
      //   console.log(curentPage,lastPage);
      // },

      /**
       * Hàm kiểm tra trang đang chọn
       * AUTHOR: VTSon (03/06/2022)
       */
      checkSelected: (curentPage, page) => {
        if (curentPage == page) return "m-page-number-selected";
      },

      /**
       * Hàm prev trang
       * @return curentPage - 1, nếu là trang đầu tiên thì nhảy về cuối
       * @AUTHOR: VTSON
       */
      prevPage: (curentPage, totalPage) => {
        return curentPage == 1 ? totalPage : Number(curentPage) - 1;
      },

      /**
       * Hàm prev trang
       * @return curentPage + 1, nếu là trang cuối thì nhảy về 1
       * @AUTHOR: VTSON
       */
      nextPage: (curentPage, totalPage) => {
        return curentPage == totalPage ? 1 : Number(curentPage) + 1;
      },

      /**
       * Hàm xử lý Search
       * @ AUTHOR: VTSON
       */
      txtSearchOnBlur: (keyWord) => {
        methods.fetchEmployeesByKeyWord(
          state.pageSize,
          state.pageNumber,
          keyWord
        );
      },

      cbxRecordOnChange: (event) => {
        state.pageSize = event.target.value;
        methods.fetchEmployees(state.pageSize, state.pageNumber);
      },
    };

    methods.fetchEmployees(state.pageSize, state.pageNumber);

    return {
      ...toRefs(state),
      ...methods,
      isShowDialog,
      isShowExpand,
      isShowDialogNoitice,
    };
  },
};
</script>
