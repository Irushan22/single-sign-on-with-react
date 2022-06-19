import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CRow,
  CCol,
  CFormInput,
  CFormLabel,
  CForm,
} from "@coreui/react";
import ImageUploading from "react-images-uploading";

function UserModal({ open, onCreate, onCancel, singleUser }) {
  const [file, setFile] = useState(null);
  const [prieviewImage, setPrieviewImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  useEffect(() => {
    if (singleUser) {
      console.log("singleUser", singleUser);
      setFirstName(singleUser.firstName);
      setLastName(singleUser.lastName);
      setEmail(singleUser.email);
      setAge(singleUser.age);
      setPrieviewImage(singleUser?.image_url);
    }
  }, [singleUser]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setFile(imageList[0].file);
  };

  const onHandleSubmit = () => {
    const payload = new FormData();
    payload.append("firstName", firstName);
    payload.append("lastName", lastName);
    payload.append("email", email);
    payload.append("age", age);
    payload.append("image", file);

    onCreate(payload);
  };

  const onCancelbtn = () => {
    onCancel();
    setImages([]);
  };

  return (
    <>
      <CModal visible={open} onClose={onCancelbtn}>
        <CModalHeader onClose={onCancelbtn}>
          <CModalTitle>Add User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  {prieviewImage ? (
                    <img src={prieviewImage} alt="" width="100" />
                  ) : (
                    <>
                      <CButton
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Upload
                      </CButton>

                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image.data_url} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <CButton onClick={() => onImageUpdate(index)}>
                              Update
                            </CButton>
                            {/* <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button> */}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </ImageUploading>

            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputfirstname"
                className="col-sm-3 col-form-label"
              >
                First Name
              </CFormLabel>
              <CCol sm={9}>
                <CFormInput
                  type="text"
                  id="inputfirstname"
                  required
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputlastname"
                className="col-sm-3 col-form-label"
              >
                Last Name
              </CFormLabel>
              <CCol sm={9}>
                <CFormInput
                  type="text"
                  id="inputlastname"
                  required
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputEmail3"
                className="col-sm-3 col-form-label"
              >
                Email
              </CFormLabel>
              <CCol sm={9}>
                <CFormInput
                  type="email"
                  id="inputEmail3"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel
                htmlFor="inputage"
                className="col-sm-3 col-form-label"
              >
                Age
              </CFormLabel>
              <CCol sm={9}>
                <CFormInput
                  type="number"
                  id="inputage"
                  required
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </CCol>
            </CRow>
            <CModalFooter>
              <CButton color="secondary" onClick={onCancelbtn}>
                Close
              </CButton>
              <CButton color="primary" onClick={onHandleSubmit}>
                Save
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
}

export default UserModal;
