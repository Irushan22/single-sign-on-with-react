import React from "react";
import {
  CButton,
  CTableHead,
  CTable,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableBody,
} from "@coreui/react";

function UserTable({ openModalEdit, openModalDelete, userList }) {
  return (
    <>
      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Age</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {userList.map((item, index) => (
            <CTableRow>
              <CTableHeaderCell scope="row">{index}</CTableHeaderCell>
              <CTableDataCell>{item.firstName}</CTableDataCell>
              <CTableDataCell>{item.lastName}</CTableDataCell>
              <CTableDataCell>{item.email}</CTableDataCell>
              <CTableDataCell>{item.age}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="warning"
                  variant="ghost"
                  onClick={() => openModalEdit(item, item.id)}
                >
                  Update
                </CButton>
                <CButton
                  color="danger"
                  variant="ghost"
                  onClick={() => openModalDelete(item.id)}
                >
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
}

export default UserTable;
