<template>
  <div id="dlgDialog" class="m-dialog">
    <div class="m-dialog-content">
      <div class="m-dialog-header-group">
        <div class="m-dialog-header m-flex">
          <div class="m-dialog-header-title">
            Thông tin nhân viên
          </div>
          <label class="m-dialog-header-checkbox m-flex" for="">
            <input type="checkbox" class="m-checkbox" name="" id="" />
            <span class="m-dialog-checkbox-label">Là khách hàng</span>
          </label>
          <label class="m-dialog-header-checkbox m-flex" for="">
            <input type="checkbox" class="m-checkbox" name="" id="" />
            <span class="m-dialog-checkbox-label">Là khách hàng</span>
          </label>
        </div>
        <div class="m-dialog-close">
          <div class="m-icon m-icon-24 m-icon-help"></div>
          <div
            class="m-icon m-icon-24 m-icon-close"
            @click="btnCloseDialog"
          ></div>
        </div>
      </div>
      <div class="m-dialog-body">
        <div class="m-dialog-form">
          <div class="m-w50p">
            <div class="m-row m-flex">
              <div class="row-item m-w40p m-pr6px">
                <label class="row-item-text" for=""
                  >Mã <span class="m-red">*</span></label
                >
                <input
                  class="m-input"
                  type="text"
                  required
                  v-model="employee.EmployeeCode"
                />
              </div>
              <div class="row-item m-w60p">
                <label class="row-item-text" for=""
                  >Tên <span class="m-red">*</span></label
                >
                <input
                  class="m-input"
                  title="Tên không được để tr"
                  type="text"
                  required
                  v-model="employee.EmployeeName"
                />
              </div>
            </div>
            <div class="m-row m-flex">
              <div class="row-item m-w100p">
                <label class="row-item-text" for=""
                  >Đơn vị <span class="m-red">*</span></label
                >
                <MSDropdown
                  :api="'https://amis.manhnv.net/api/v1/Departments'"
                  :dropdownData="dropdownData"
                  @updateDepartmentId="updateDepartmentId"
                />
              </div>
            </div>
            <div class="m-row m-flex">
              <div class="row-item m-w100p">
                <label class="row-item-text" for="">Chức danh</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.EmployeePosition"
                />
              </div>
            </div>
          </div>
          <div class="m-w50p">
            <div class="m-row m-flex">
              <div class="row-item m-w40p m-pr6px">
                <label class="row-item-text" for="">Ngày sinh</label>
                <input
                  class="m-input"
                  type="date"
                  v-model="employee.DateOfBirth"
                />
              </div>
              <div class="row-item m-w60p">
                <label class="row-item-text" for="">Giới tính</label>
                <div class="radio-group m-flex">
                  <div class="m-flex m-mr20px">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      v-model="employee.Gender"
                      value="1"
                    />
                    <label class="row-item-cb-text" for="male">Nam</label>
                  </div>
                  <div class="m-flex m-mr20px">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      v-model="employee.Gender"
                      value="0"
                    />
                    <label class="row-item-cb-text" for="female">Nữ</label>
                  </div>
                  <div class="m-flex m-mr20px">
                    <input
                      type="radio"
                      id="orther"
                      name="gender"
                      v-model="employee.Gender"
                      value="2"
                    />
                    <label class="row-item-cb-text" for="orther">Khác</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="m-row m-flex">
              <div class="row-item m-w60p m-pr6px">
                <label class="row-item-text" for="">Số CMND</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.IdentityNumber"
                />
              </div>
              <div class="row-item m-w40p m-pr6px">
                <label class="row-item-text" for="">Ngày cấp</label>
                <input class="m-input" type="date" name="" id="" />
              </div>
            </div>
            <div class="m-row m-flex">
              <div class="row-item m-w100p m-pr6px">
                <label class="row-item-text" for="">Nơi cấp</label>
                <input
                  class="m-input"
                  type="text"
                  placeholder="vd: Hải Phòng"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="m-dialog-form">
          <div class="m-w100p">
            <div class="m-row m-flex">
              <div class="row-item m-w100p">
                <label class="row-item-text" for="">Địa chỉ</label>
                <input class="m-input" type="text" name="" id="" />
              </div>
            </div>
            <div class="m-row m-flex">
              <div class="row-item m-w25p m-pr6px">
                <label class="row-item-text" for="">Đt di động</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.TelephoneNumber"
                />
              </div>
              <div class="row-item m-w25p m-pr6px">
                <label class="row-item-text" for="">Đt cố định</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.PhoneNumber"
                />
              </div>
              <div class="row-item m-w25p m-pr6px">
                <label class="row-item-text" for="">Email</label>
                <input class="m-input" type="text" v-model="employee.Email" />
              </div>
            </div>
            <div class="m-row m-flex">
              <div class="row-item m-w25p m-pr6px">
                <label class="row-item-text" for="">Tài khoản ngân hàng</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.BankAccountNumber"
                />
              </div>
              <div class="row-item m-w25p m-pr6px">
                <label class="row-item-text" for="">Tên ngân hàng</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.BankName"
                />
              </div>
              <div class="row-item m-w25p m-pr6px">
                <label class="row-item-text" for="">Chi nhánh</label>
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.BankBranchName"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-dialog-footer">
        <div class="m-dialog-divide"></div>
        <div class="m-dialog-footer-btn m-flex">
          <button class="m-btn" @click="btnCloseDialog">Hủy</button>
          <div class="m-btn-footer-right m-flex">
            <button class="m-btn m-mr6px" @click="btnSave">Cất</button>
            <button class="m-btn m-btn-primary" @click="btnSave">
              Cất và Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MSDropdown from "../../components/base/MSDropdown.vue";
import { reactive, toRefs } from "vue";
import axios from "axios";

export default {
  name: "EmployeeDetail",
  props: ["employeeId"],
  components: { MSDropdown },
  setup(props, { emit }) {
    var isValid = true;
    // 0: Thêm mới, 1: Sửa
    var formMode = 0;
    const state = reactive({
      employee: {},
      dropdownData: null,
    });

    /**
     * Hàm thực hiện ẩn form chi tiết
     * AUTHOR: VTSON
     */
    function btnCloseDialog() {
      emit("isShowDialog", false);
    }

    /**
     * Hàm lấy data employee
     * AUTHOR: VTSON
     */
    const fetchEmployee = (employeeId) => {
      if (employeeId) {
        formMode = 1;
        axios
          .get(`https://amis.manhnv.net/api/v1/Employees/${employeeId}`)
          .then((res) => {
            state.employee = res.data;
            state.dropdownData = res.data.DepartmentId;
            // console.log(dropdownData);
            state.employee.DateOfBirth = formatDateBinding(
              state.employee.DateOfBirth
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .get(`https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode`)
          .then((res) => {
            state.employee.EmployeeCode = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    /**
     * Hàm định dạng hiển thị năm/tháng/ngày
     * @param {Date} date
     * @returns yyyy-MM-dd
     */
    function formatDateBinding(date) {
      if (!date) return "";
      date = new Date(date);
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      month = month < 10 ? `0${month}` : month;
      return `${year}-${month}-${day}`;
    }

    /**
     * Hàm thực hiện khi ấn nút Cất
     * AUTHOR: VTSON
     */
    function btnSave() {
      saveData(state.employee, formMode);
    }

    /**
     * Hàm xử lý lưu vào db
     * @param {Object} employee dữ liệu nhân viên
     * @param {String} formMode 0-Thêm mới 1-Cập nhật
     * @ AUTHOR: VTSON
     */
    function saveData(employee, formMode) {
      // Kiển tra validate
      if (validateRequired()) {
        if (employee) {
          // Thêm mới
          if (formMode == 0) {
            axios
              .post(`https://amis.manhnv.net/api/v1/Employees`, state.employee)
              .then((res) => {
                
                console.log(res);
                emit("fetchEmployees");
              })
              .catch((error) => {
                emit("isShowDialogNoitice", true);
                emit("errorList", error.response.data.userMsg);
              });
          } else {
            // Sửa
            axios

              .put(
                `https://amis.manhnv.net/api/v1/Employees/${props.employeeId}`,
                state.employee
              )
              .then((res) => {
                console.log(res);
                emit("fetchEmployees");
              })
              .catch((error) => {
                emit("isShowDialogNoitice", true);
                emit("errorList", error.response.data.userMsg);
              });
          }
        }
      }
    }

    /**
     * Hàm xử lý validate
     * @ AUTHOR: VTSON
     */
    function validateRequired() {
      isValid = true;
      let inputs = document.querySelectorAll("[required]");
      inputs.forEach((element) => {
        if (element.value == "") {
          isValid = false;
          element.classList.add("m-input-error");
          element.setAttribute("title", "Không được phép để trống");
        } else {
          element.classList.remove("m-input-error");
          element.removeAttribute("title");
        }
      });
      return isValid;
    }

    /**
     * Hàm xử lý update DepartmentId
     * @AUTHOR: VTSON
     */
    function updateDepartmentId(newid) {
      state.employee.DepartmentId = newid;
    }

    fetchEmployee(props.employeeId);

    return {
      ...toRefs(state),
      btnCloseDialog,
      formatDateBinding,
      btnSave,
      updateDepartmentId,
    };
  },
};
</script>
