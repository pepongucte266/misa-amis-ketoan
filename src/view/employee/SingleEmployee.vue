<template>
  <td class="text-align-center" :id="employee.EmployeeCode">
    <input
      type="checkbox"
      class="m-checkbox"
      :value="employee.EmployeeId"
      @input="markCheckbox($event.target)"
      :checked="checkboxs ? checkboxs.includes(employee.EmployeeId) : false"
    />
  </td>
  <td class="text-align-left">{{ employee.EmployeeCode }}</td>
  <td class="text-align-left">{{ employee.EmployeeName }}</td>
  <td class="text-align-left">{{ employee.GenderName }}</td>
  <td class="text-align-center">{{ formatDate(employee.DateOfBirth) }}</td>
  <td class="text-align-left">{{ employee.IdentityNumber }}</td>
  <td class="text-align-left">{{ employee.PositionName }}</td>
  <td class="text-align-left">{{ employee.DepartmentName }}</td>
  <td class="text-align-left">{{ employee.BankAccountNumber }}</td>
  <td class="text-align-left">{{ employee.BankName }}</td>
  <td class="text-align-left">{{ employee.BankBranchName }}</td>
  <td class="text-align-center m-table-function">
    <div class="m-table-cell-group m-flex">
      <div class="text" @click="btnShowDialog">Sửa</div>
      <div
        class="m-table-icon m-icon m-icon-expand"
        @click="
          btnShowExpand($event, employee.EmployeeId, employee.EmployeeName)
        "
      ></div>
    </div>
  </td>
</template>

<script>
// import { watch } from 'vue'
export default {
  name: "SingleEmployee",
  emits: [
    "isShowDialog",
    "updateId",
    "isShowExpand",
    "expandTop",
    "expandLeft",
    "updateName",
    "updateCheckboxs",
    "updateDetailMode"
  ],
  props: ["employee", "employeeId", "employeeName", "isCheckAll","checkboxs"],
  
  setup(props, { emit }) {


    function markCheckbox(input) {
      
      emit("updateCheckboxs", input.value, input.checked);
    }

    
    /**
     * Hàm thực hiện cập nhật employeeId và hiển thị form chi tiết
     * AUTHOR: VTSON (01/06/2022)
     */
    function btnShowDialog() {
      emit("updateId", props.employee.EmployeeId);
      emit("updateDetailMode", 1);
      emit("isShowDialog", true);
    }
    /**
     * Hàm định dạng hiển thị ngày/tháng/năm
     * @param {Date} date
     * @returns dd-mm-yyyy
     */
    function formatDate(date) {
      if (!date) return "";
      date = new Date(date);
      let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let month = date.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      date = `${day}/${month}/${date.getFullYear()}`;
      return date;
    }

    /**
     * Hàm thực hiện nút expand
     * AUTHOR: VTSON (01/06/2022)
     */
    function btnShowExpand(event, id, name) {
      let top = event.clientY - 40;
      let left = event.clientX - 100;
      emit("isShowExpand", true);
      emit("expandTop", top + "px");
      emit("expandLeft", left + "px");
      emit("updateId", id);
      emit("updateName", name);
    }

    return {
      formatDate,
      btnShowExpand,
      btnShowDialog,
      markCheckbox
    };
  },
};
</script>
