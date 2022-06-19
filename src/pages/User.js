import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal";
import DeleteModal from "../components/DeleteModal";
import userService from "../services/UserService";
import { CButton } from "@coreui/react";

function User() {
  const [visible, setVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userId, setuserId] = useState();
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);

  const openModal = (userObj, id) => {
    setVisible(true);
    if (id) {
      setuserId(id);
      setUser(userObj);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteModal(true);
    setuserId(id);
  };

  const onCreate = (values, id) => {
    if (userId) {
      userService
        .updateUser(values, userId)
        .then((response) => {
          if (response.data) {
            getAllUsers();
            setVisible(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      userService
        .addUser(values)
        .then((response) => {
          if (response.data) {
            getAllUsers();
            setVisible(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getAllUsers = () => {
    userService
      .getAllUsers()
      .then((response) => {
        if (response.data) {
          setUserList(response.data);
        }
      })
      .catch((error) => {});
  };

  const onDeleteUser = () => {
    userService
      .deleteUser(userId)
      .then((response) => {
        if (response.data) {
          getAllUsers();
          setDeleteModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CButton
        color="primary"
        type="button"
        onClick={openModal}
        style={{ float: "right", marginBottom: "25px" }}
      >
        Add User
      </CButton>
      <UserModal
        open={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          setUser({});
        }}
        singleUser={user}
      />
      <DeleteModal
        open={deleteModal}
        onDelete={onDeleteUser}
        onCancel={() => {
          setDeleteModal(false);
          setuserId();
        }}
      />
      <UserTable
        openModalEdit={openModal}
        openModalDelete={openDeleteModal}
        userList={userList}
      />
    </>
  );
}

export default User;
