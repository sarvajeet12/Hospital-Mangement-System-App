import React, { useContext, useState } from "react";
import Style from "../../components/core/admin-dashboad-page/admin.module.css";
import { doctorsGender } from "../../data/doctors-data";
import { doctorsDepartment } from "../../data/doctors-data";
import { doctorDegrees } from "../../data/doctors-data";
import { yearsOfExperience } from "../../data/doctors-data";
import { imageAssets } from "../../assets/js/image-assets";
import { AppContext } from "../../context/store";
import { apiConnector } from "../../services/api-connect";
import { admin } from "../../services/apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddDoctors = () => {
  const { authorizationToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    degree: "",
    experience: "",
    address: "",
    about: "",
    displayPicture: "",
    imagePreviewUrl: "",
  });

  // ------------------------------------------------- handle input form --------------------------------------------------
  const handleInputForm = (e) => {
    const { name, value, files } = e.target;
    if (name === "displayPicture") {
      setFormData({
        ...formData,
        displayPicture: files[0],
        imagePreviewUrl: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // -------------------------------------------------- handle submit add doctor -----------------------------------------------
  const handleDoctorForm = async (e) => {
    e.preventDefault();

    // it is used because we image and data both
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const loadingToastId = toast.loading("Submitting your data...");

    try {
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector(
        "POST",
        admin.ADD_DOCTORS_API,
        formDataToSend,
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        navigate("/admin/doctors-list");
        toast.update(loadingToastId, {
          render: "Doctor Added Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });

        // Clear form and file input
        setFormData({
          name: "",
          email: "",
          phone: "",
          gender: "",
          department: "",
          degree: "",
          experience: "",
          address: "",
          about: "",
          displayPicture: "",
          imagePreviewUrl: "",
        });
        // console.log("add doctor response :", response.data.response);
      }
    } catch (error) {
      // console.log("Error in add doctor", error.response.data);

      toast.update(loadingToastId, {
        render: error.response.data.extraDetails
          ? error.response.data.extraDetails
          : error.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div className={Style.addDoctors}>
      <h1>Add Doctors</h1>
      <div className={Style.imageFormContainer}>
        <div>
          <img
            src={
              formData.imagePreviewUrl !== ""
                ? formData.imagePreviewUrl
                : imageAssets.DoctorProfileImage
            }
            alt="Profile Image"
          />
          <p style={{ textAlign: "center", color: "red", fontSize: "1.2rem" }}>
            Image formate should be in jpeg <sup>*</sup>
          </p>
        </div>
        <form
          action=""
          className={Style.addDoctorsForm}
          onSubmit={(e) => handleDoctorForm(e)}
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="displayPicture"
            id=""
            required
            onChange={(e) => handleInputForm(e)}
          />
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.email}
          />
          <input
            type="number"
            name="phone"
            placeholder="Enter Contact Number"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.phone}
          />
          {/* gender */}
          <select
            name="gender"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.gender}
          >
            <option value="">Select Gender</option>
            {doctorsGender.map((gender, index) => {
              return (
                <option value={gender} key={index}>
                  {gender}
                </option>
              );
            })}
          </select>
          {/* department */}
          <select
            name="department"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.department}
          >
            <option value="">Select Department</option>
            {doctorsDepartment.map((department, index) => {
              return (
                <option value={department} key={index}>
                  {department}
                </option>
              );
            })}
          </select>
          {/* degree */}
          <select
            name="degree"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.degree}
          >
            <option value="">Select Degree</option>
            {doctorDegrees.map((degree, index) => {
              return (
                <option value={degree} key={index}>
                  {degree}
                </option>
              );
            })}
          </select>
          {/* experience */}
          <select
            name="experience"
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.experience}
          >
            <option value="">Select Experience</option>
            {yearsOfExperience.map((experience, index) => {
              return (
                <option value={experience} key={index}>
                  {experience}
                </option>
              );
            })}
          </select>
          {/* address */}
          <textarea
            name="address"
            id=""
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.address}
            placeholder="Enter Address"
          ></textarea>
          {/* about doctors */}
          <textarea
            name="about"
            id=""
            required
            onChange={(e) => handleInputForm(e)}
            value={formData.about}
            placeholder="About Doctors..."
          ></textarea>

          <button type="submit" className="btn">
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctors;
