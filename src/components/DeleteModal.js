import React from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
} from "@coreui/react";

export default function DeleteModal({ open, onDelete, onCancel }) {
  return (
    <CModal visible={open} onClose={onCancel}>
      <CModalHeader onClose={onCancel}>
        <CModalTitle>Delete User</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Are you sure you want to permanenty remove this user?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onCancel}>
          No
        </CButton>
        <CButton color="primary" onClick={onDelete}>
          Yes
        </CButton>
      </CModalFooter>
    </CModal>
  );
}
