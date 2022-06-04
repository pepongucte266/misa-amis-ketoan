<template>
  <div
    v-if="isShowExpand"
    :style="{ top: expandTop, left: expandLeft }"
    class="m-expand"
  >
    <div class="text-align-left m-expand-item" @click="btnCopy(employeeId)">
      Nhân bản
    </div>
    <div
      class="text-align-left m-expand-item"
      @click="btnDelete(employeeId, employeeName)"
    >
      Xóa
    </div>
    <div class="text-align-left m-expand-item">Ngừng sử dụng</div>
  </div>
  <div class="page-content">
    <div class="m-page-header">
      <div class="m-page-title">Nhân viên</div>
      <div class="m-page-button m-flex">
        <button class="m-btn m-btn-border m-btn-icon m-mr12px m-flex">
          <span class="m-btn-text">Tiện ích</span>
          <div class="m-icon-btn m-icon m-icon-dropdown-16"></div>
        </button>
        <button
          id="btnAdd"
          class="m-btn m-btn-border m-btn-icon m-btn-primary m-flex"
          @click="btnAddOnClick"
        >
          <span class="m-btn-text">Thêm</span>
          <div class="m-btn-line"></div>
          <div class="m-icon-btn m-icon m-icon-dropdown-white-16"></div>
        </button>
      </div>
    </div>

    <div class="m-page-toolbar">
      <div class="m-btn-group">
        <button
          class="m-btn m-btn-border m-btn-icon m-flex"
          @click="btnOptionsOnClick"
        >
          <span class="m-btn-text">Thực hiện hàng loạt</span>
          <div class="m-icon-btn m-icon m-icon-dropdown-16"></div>
        </button>
        <div v-if="isShowOptions" class="m-btn-options">
          <div class="m-btn-option" @click="btnDeletes">Xóa</div>
        </div>
      </div>
      <div class="m-page-toolbar-right m-flex">
        <div class="m-input-box">
          <input
            type="text"
            placeholder="Tìm theo mã, tên nhân viên"
            class="m-input"
            v-model="search"
            @input="test($event.target.value)"
          />
          <div class="m-input-icon m-input-icon m-icon m-icon-search"></div>
        </div>
        <div class="m-page-toolbar-icon">
          <div
            class="m-btn-fresh m-icon m-icon-refresh m-mr12px"
            @click="btnRefresh"
          ></div>
        </div>
        <div class="m-page-toolbar-icon">
          <div class="m-btn-fresh m-icon m-icon-excel" @click="btnExport"></div>
        </div>
      </div>
    </div>

    <div class="m-page-grid">
      <div class="m-grid">
        <table class="m-table" id="tblEmployee">
          <thead>
            <tr>
              <th class="text-align-center" style="width: 50px">
                <input
                  type="checkbox"
                  class="m-checkbox"
                  @input="checkAll($event)"
                  :checked="isCheckAll"
                />
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
              :value="employee.EmployeeId"
            >
              <SingleEmployee
                :employee="employee"
                @isShowDialog="showEmployeeDetailDialog"
                :employeeId="employeeId"
                :employeeName="employeeName"
                :isCheckAll="isCheckAll"
                :checkboxs="checkboxs"
                @updateId="employeeId = $event"
                @updateDetailMode="detailMode = $event"
                @updateName="employeeName = $event"
                @isShowExpand="showExpandDialog"
                @expandTop="expandTop = $event"
                @expandLeft="expandLeft = $event"
                @updateCheckboxs="updateCheckboxs"
              />
            </tr>
          </tbody>
          
          <div v-if="isShowLoading"><PageLoading /></div>
        </table>
        <div v-if="isNoneData" class="m-table-noti"><span class="m-table-noti-text">Không có dữ liệu</span></div>
      </div>
      <div class="m-paging">
        <div class="m-paging-left">
          Tổng số: <span class="m-paging-count">{{ totalRecord }}</span> bản ghi
        </div>
        <div class="m-paging-center"></div>
        <div class="m-paging-right m-flex">
          <MSDropdown
            :dropdownItems="recordPerPage"
            @changeItem="changeDropdownItem"
          ></MSDropdown>

          <VuePaginate
            :page-count="totalPage"
            :prev-text="'Trước'"
            :next-text="'Sau'"
            :container-class="'m-paging-navigation m-flex'"
            :page-class="'m-page-number'"
            :prev-class="'m-nav-page m-btn-prev'"
            :next-class="'m-nav-page m-btn-next'"
            :active-class="'m-page-number-selected'"
            :click-handler="paginationOnClick"
            :page-link-class="'m-page-link m-flex'"
          >
          </VuePaginate>
        </div>
      </div>
    </div>
    <MSDialogNoitice
      v-if="isShowDialogNoitice"
      @isShowDialogNoitice="isShowDialogNoitice = $event"
      :errorList="errorList"
      :noiticeStyle="noiticeStyle"
      ref="msdialognoitice"
    />

    <MSToastBox ref="mstoastbox" />
    <EmployeeDetail
      v-if="isShowDialog"
      :employeeId="employeeId"
      @isShowDialogNoitice="isShowDialogNoitice = $event"
      @noiticeStyle="noiticeStyle = $event"
      @isShowDialog="showEmployeeDetailDialog"
      @fetchEmployees="fetchEmployees"
      @errorList="errorList = $event"
      :mstoastbox="mstoastbox"
      :msdialognoitice="msdialognoitice"
      :detailMode="detailMode"
    />
  </div>

  <div v-if="isShowLayer" class="outside" @click="expandOnBlur"></div>
</template>

<style scoped>
@import url("../../style/pages/employee.css");
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 999;
}
</style>

<script>
import SingleEmployee from "./SingleEmployee.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import PageLoading from "../PageLoading.vue";
import MSDropdown from "../../components/base/MSDropdown.vue";
import axios from "axios";
import { reactive, toRefs, ref, nextTick } from "vue";
import { URL } from "../../constant";
import { debounce } from "vue-debounce";
export default {
  name: "EmployeePage",
  components: {
    SingleEmployee,
    EmployeeDetail,
    PageLoading,
    MSDropdown,
  },
  setup() {
    var isShowDialog = ref(false);
    var isShowExpand = ref(false);
    var isShowDialogNoitice = ref(false);
    var isShowLoading = ref(false);
    var msdropdown = ref();
    const msdialognoitice = ref();
    const mstoastbox = ref();
    const state = reactive({
      employees: [],
      employeeId: null,
      employeeName: null,
      errorList: [],
      noiticeStyle: "m-icon-error",
      expandTop: "0",
      expandLeft: "0",
      totalRecord: 0,
      totalPage: 0,
      pageSize: "40",
      pageNumber: "1",
      search: "",
      recordPerPage: [
        { name: "10 bản ghi trên 1 trang", value: 10 },
        { name: "20 bản ghi trên 1 trang", value: 20 },
        { name: "30 bản ghi trên 1 trang", value: 30 },
        { name: "40 bản ghi trên 1 trang", value: 40 },
        { name: "50 bản ghi trên 1 trang", value: 50 },
        { name: "70 bản ghi trên 1 trang", value: 70 },
        { name: "100 bản ghi trên 1 trang", value: 100 },
      ],
      checkboxs: [],
      isCheckAll: false,
      isShowOptions: false,
      isShowLayer: false,
      // 0: Thêm mới, 1: Sửa, 2: Nhân bản
      detailMode: 0,
      isNoneData: false
    });

    const methods = {
      /**
       * Hàm xử lý Search
       * @ AUTHOR: VTSON
       */
      txtSearchOnBlur: (keyWord) => {
        if (keyWord) {
          methods.fetchEmployeesByKeyWord(
            state.pageSize,
            state.pageNumber,
            keyWord
          );
        }
      },
      test: debounce((val) => {
        if(val) {
          methods.fetchEmployeesByKeyWord(
            state.pageSize,
            state.pageNumber,
            val
          );
        } else {
          methods.fetchEmployees(state.pageSize, state.pageNumber);
        }
      }, 300),

      btnCopy: (employeeId) => {
        console.log(employeeId);
        state.detailMode = 2;
        isShowDialog.value = true;
        methods.expandOnBlur();
      },
      btnExport: () => {
        axios
          .get(`${URL}Employees/export`, { responseType: "blob" })
          .then((response) => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", "Danh_sach_nhan_vien.xlsx");
            document.body.appendChild(fileLink);
            fileLink.click();
            fileLink.remove();
          })
          .catch((error) => {
            console.log(error);
          });
      },

      btnDeletes: () => {
        var ids = state.checkboxs.join();
        axios
          .delete(`${URL}Employees/deletes/${ids}`)
          .then((res) => {
            console.log(res);
            methods.fetchEmployees();
            mstoastbox.value.show("success", "Xóa thành công");
          })
          .catch((error) => {
            console.log(error);
            mstoastbox.value.show("error", "Xóa thất bại");
          });
        state.isShowLayer = false;
        state.isShowOptions = false;
      },

      btnOptionsOnClick: () => {
        state.isShowOptions = !state.isShowOptions;
        state.isShowLayer = true;
      },
      checkAll: (event) => {
        state.checkboxs = [];
        if (event.target.checked) {
          state.checkboxs = state.employees.map(
            (employee) => employee.EmployeeId
          );
        }
        state.isCheckAll = !state.isCheckAll;
      },
      updateCheckboxs: (value, check) => {
        if (check) {
          state.checkboxs.push(value);
        } else {
          state.isCheckAll = false;
          var index = state.checkboxs.indexOf(value);
          if (index !== -1) {
            state.checkboxs.splice(index, 1);
          }
        }
        if (state.checkboxs.length == state.employees.length) {
          state.isCheckAll = true;
        } else {
          state.isCheckAll = false;
        }
        // console.log(state.checkboxs.length);
      },
      paginationOnClick: (pageNum) => {
        state.checkboxs = [];
        state.isCheckAll = false;
        methods.fetchEmployees(state.pageSize, pageNum);
      },
      changeDropdownItem: (pageSize, pageNumber) => {
        state.isCheckAll = false;
        state.checkboxs = [];
        state.pageSize = pageSize;
        state.pageNumber = pageNumber;
        methods.fetchEmployees(state.pageSize, state.pageNumber);
      },
      /**
       * Hàm fetch API
       * @param pageSize: số bản ghi
       * @param pageNumber: số trang hiện tại
       * AUTHOR: VTSON
       */

      fetchEmployees: (pageSize = "40", pageNumber = "1") => {
        isShowLoading.value = true;
        state.search = "";
        state.employees = {};
        axios
          .get(
            `${URL}Employees/filter?pageSize=${pageSize}&pageIndex=${pageNumber}`
          )
          .then((res) => {
            state.totalRecord = res.data.TotalRecord;
            state.totalPage = res.data.TotalPage;
            state.employees = res.data.Data;
            state.pageNumber = pageNumber;
            isShowLoading.value = false;

            // methods.pagination(pageNumber,state.totalPage)
          })
          .catch((error) => {
            console.log(error);
          });
      },

      fetchEmployeesByKeyWord: async (
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
            `${URL}Employees/filter?${employeeFilter}pageSize=${pageSize}&pageIndex=${pageNumber}`
          )
          .then((res) => {
            if (res.status == 204) {
              // state.noiticeStyle = "m-icon-error";
              // isShowDialogNoitice.value = true;
              // throw new Error("Không tìm thấy dữ liệu");
              state.isNoneData = true;
            } else {
              state.totalRecord = res.data.TotalRecord;
              state.totalPage = res.data.TotalPage;
              state.employees = res.data.Data;
              state.pageNumber = pageNumber;
              state.isNoneData = false
            }
          })
          .catch((error) => {
            // msdialognoitice.value.getResult();
            // state.errorList = error;
            console.log(error);
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
        state.detailMode = 0;
        methods.showEmployeeDetailDialog(true);
      },

      /**
       * DBClick nhân viên
       * @param {Object} employee
       * Author: VTSON (1/06/2022)
       */
      rowOnDblClick: (employee) => {
        state.employeeId = employee.EmployeeId;
        state.detailMode = 1;
        methods.showEmployeeDetailDialog(true);
      },

      /**
       * Hàm xử lý khi click ngoài expand
       * @ AUTHOR: VTSON
       */
      expandOnBlur: () => {
        state.isShowLayer = false;
        state.isShowOptions = false;
        isShowExpand.value = false;
      },

      showExpandDialog: (isShow) => {
        isShowExpand.value = isShow;
        state.isShowLayer = true;
      },

      /**
       * Hàm thực hiện xóa nhân viên
       * @param {String} employeeId: id nhân viên
       * @ AUTHOR: VTSON
       */
      btnDelete: async (employeeId, employeeName) => {
        isShowDialogNoitice.value = true;
        state.noiticeStyle = "m-icon-warning";
        state.errorList = `Bạn có chắc chắn muốn xóa nhân viên ${employeeName} không ?`;
        await nextTick();
        await msdialognoitice.value.getResult().then((result) => {
          if (result) {
            axios
              .delete(`${URL}Employees/${employeeId}`)
              .then(() => {
                isShowExpand.value = false;
                methods.fetchEmployees(state.pageSize, state.pageNumber);
                mstoastbox.value.show("success", "Xóa thành công");
              })
              .catch((error) => {
                console.log(error);
                mstoastbox.value.show("error", "Lỗi không thể xóa");
              });
            isShowExpand.value = false;
          } else {
            isShowExpand.value = false;
          }
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

      cbxRecordOnChange: (event) => {
        state.pageSize = event.target.value;
        methods.fetchEmployees(state.pageSize, state.pageNumber);
      },

      /**
       * Hàm xử lý sự kiện reload
       * @AUTHOR: VTSON
       */
      btnRefresh: () => {
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
      isShowLoading,
      msdialognoitice,
      mstoastbox,
      msdropdown,
    };
  },
};
</script>
