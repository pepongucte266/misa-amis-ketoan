<template>
  <div id="dlgDialog" class="m-dialog">
    <div class="m-dialog-content">
      <div class="m-dialog-header-group">
        <div class="m-dialog-header m-flex">
          <div class="m-dialog-header-title">Thông tin nhân viên</div>
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
                  @blur="validateInputOnBlur($event)"
                  v-model="employee.EmployeeCode"
                  ref="input"
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
                  @blur="validateInputOnBlur($event)"
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
                  v-if="dropdownData"
                  :api="'https://localhost:7013/api/v1/Departments'"
                  :dropdownData="dropdownData"
                  @updateDepartmentId="updateDepartmentId"
                />
                <MSDropdown
                  v-else
                  :api="'https://localhost:7013/api/v1/Departments'"
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
                  v-model="employee.PositionName"
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
                  v-model="employee.IdentityPlace"
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
                <input class="m-input" type="text" v-model="employee.Mobile" />
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
                <input
                  class="m-input"
                  type="text"
                  v-model="employee.Email"
                  email
                  @blur="validateEmailOnBlur($event)"
                />
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
            <button class="m-btn m-mr6px" @click="btnSave(0)">Cất</button>
            <button class="m-btn m-btn-primary" @click="btnSave(1)">
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
import { ref, reactive, toRefs, onMounted, nextTick, onUpdated } from "vue";
import axios from "axios";
import { URL } from "../../constant";
export default {
  name: "EmployeeDetail",
  props: ["employeeId", "mstoastbox", "msdialognoitice", "detailMode"],
  components: { MSDropdown },
  setup(props, { emit }) {
    var isValid = true;
    var input = ref();
    var originalEmployee = ref("");
    const state = reactive({
      employee: {},
      dropdownData: null,
      //0: cất, 1: cất và thêm
      mode: 0,
      isDataChanged: false,
    });
    /**
     * Hàm xử lý focus vào mã nv khi component dc gắn vào DOM
     * AUTHOR: VTSON
     */
    onMounted(() => {
      input.value.focus();
    });

    onUpdated(() => {
      if (state.mode == 1) {
        state.isDataChanged = false;
      } else {
        state.isDataChanged = checkDataChange(
          originalEmployee.value,
          JSON.stringify(state.employee)
        );
      }
    });

    /**
     * Hàm kiểm tra dữ liệu trên form được thay đổi
     * @return: true: bị thay đổi; false: không bị thay đổi
     * @AUTHOR VTSON (19/06/2022)
     */
    function checkDataChange(oldData, newData) {
      return oldData == newData ? false : true;
    }

    /**
     * Hàm thực hiện ẩn form chi tiết
     * @AUTHOR: VTSON
     */
    async function btnCloseDialog() {
      if (state.isDataChanged) {
        emit("isShowDialogNoitice", true);
        emit("noiticeStyle", "m-icon-info");
        emit("errorList", "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?");
        await nextTick();
        props.msdialognoitice.getResult().then((result) => {
          if (result) {
            emit("isShowDialog", false);
          }
        });
      } else {
        emit("isShowDialog", false);
      }
    }

    /**
     * Hàm trả về mã nhân viên mới
     * @AUTHOR : VTSON (21/06/2022)
     */
    function getNewEmployeeCode() {
      axios
        .get(`${URL}Employees/NewEmployeeCode`)
        .then((res) => {
          state.employee["EmployeeCode"] = res.data;
          originalEmployee.value = JSON.stringify(state.employee);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * Hàm lấy data employee
     * AUTHOR: VTSON
     */
    const fetchEmployee = (employeeId) => {
      console.log(props.detailMode);
      if (employeeId) {
        axios
          .get(`${URL}Employees/${employeeId}`)
          .then((res) => {
            state.employee = res.data;
            state.dropdownData = res.data.DepartmentId;
            state.employee.DateOfBirth = formatDateBinding(
              state.employee.DateOfBirth
            );
            if(props.detailMode == 2) {
              console.log('alo');
              getNewEmployeeCode();
            }
            originalEmployee.value = JSON.stringify(state.employee);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        getNewEmployeeCode();
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
    function btnSave(mode) {
      saveData(state.employee, mode);
    }

    /**
     * Hàm xử lý lưu vào db
     * @param {Object} employee dữ liệu nhân viên
     * @ AUTHOR: VTSON
     */
    async function saveData(employee, mode) {
      // Kiển tra validate
      if (validateRequired() && validateEmail()) {
        if (employee) {
          state.employee["DepartmentName"] = document.querySelector(
            ".m-input.m-dropdown-input"
          ).value;
          state.employee["Gender"] = Number(state.employee["Gender"]);
          // Thêm mới
          if (props.detailMode != 1) {
            axios
              .post(`${URL}Employees`, state.employee)
              .then(() => {
                emit("fetchEmployees");
                props.mstoastbox.show("success", "Thêm mới thành công");
                state.mode = 1;
                if (mode == 1) {
                  getNewEmployeeCode();
                  state.isDataChanged = false;
                } else if (mode == 0) {
                  emit("isShowDialog", false);
                }
              })
              .catch((error) => {
                return getDialogResult(error, "m-icon-error");
              });
          } else {
            // Sửa
            axios

              .put(`${URL}Employees/${props.employeeId}`, state.employee)
              .then(() => {
                emit("fetchEmployees");
                props.mstoastbox.show("success", "Cập nhật thành công");
                state.mode = 1;
                if (mode == 1) {
                  // document.querySelector(".m-input.m-dropdown-input").value = "";
                  state.employee = {};
                  getNewEmployeeCode();
                } else if (mode == 0) {
                  emit("isShowDialog", false);
                }
              })
              .catch((error) => {
                return getDialogResult(error, "m-icon-error");
              });
          }
        }
      }
    }

    /**
     * Hàm trả về kết quả của dialog noitice
     * @return: true: confirm; false: cancel
     * @param: error: danh sách cảnh báo, noiticeStyle: loại cảnh báo
     * @AUTHOR: VTSON (21/06/2022)
     */
    async function getDialogResult(error, noiticeStyle) {
      emit("isShowDialogNoitice", true);
      emit("noiticeStyle", noiticeStyle);
      emit("errorList", error.response.data.data.errors);
      await nextTick();
      return await props.msdialognoitice.getResult();
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

    function validateEmail() {
      isValid = true;
      var regex =
        /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let inputs = document.querySelectorAll("[email]");
      inputs.forEach((element) => {
        if (!regex.test(element.value)) {
          isValid = false;
          element.classList.add("m-input-error");
          element.setAttribute("title", "Email không đúng định dạng");
        } else {
          element.classList.remove("m-input-error");
          element.removeAttribute("title");
        }
      });
      return isValid;
    }

    /**
     * Hàm xử lý validate khi blur
     * @ AUTHOR: VTSON
     */

    function validateEmailOnBlur(event) {
      var regex =
        /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(event.target.value)) {
        event.target.classList.add("m-input-error");
        event.target.setAttribute("title", "Email không đúng định dạng");
      } else {
        event.target.classList.remove("m-input-error");
        event.target.removeAttribute("title");
      }
    }

    /**
     * Hàm xử lý validate khi blur
     * @ AUTHOR: VTSON
     */
    function validateInputOnBlur(event) {
      if (!event.target.value) {
        event.target.classList.add("m-input-error");
        event.target.setAttribute("title", "Email không đúng định dạng");
      } else {
        event.target.classList.remove("m-input-error");
        event.target.removeAttribute("title");
      }
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
      input,
      validateEmailOnBlur,
      validateInputOnBlur,
    };
  },
};
</script>
