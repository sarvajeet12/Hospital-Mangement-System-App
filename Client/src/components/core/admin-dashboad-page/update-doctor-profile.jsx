import React, { useContext, useEffect, useState } from "react";
import Style from "./admin.module.css";
// import { doctorsGender } from "../../data/doctors-data";
import { doctorsDepartment } from "../../../data/doctors-data";
import { doctorDegrees } from "../../../data/doctors-data";
import { yearsOfExperience } from "../../../data/doctors-data";
import { doctorsGender } from "../../../data/doctors-data";
import { toast } from "react-toastify";
import { apiConnector } from "../../../services/api-connect";
// import { admin } from "../../services/apis";
// import { toast } from "react-toastify";
import { AppContext } from "../../../context/store";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UpdateDoctorProfile = () => {
  const { authorizationToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [updateFormData, setUpdateFormData] = useState({
    phone: "",
    department: "",
    degree: "",
    experience: "",
    address: "",
    about: "",
  });

  // ------------------------------------------- get doctor data ------------------------------------------
  const params = useParams();

  const getSingleDoctorData = async () => {
    try {
      const response = await apiConnector(
        "GET",
        `https://hospital-mangement-system-app.onrender.com/api/v1/admin/doctors/read-more/${params.id}`
      );

      // console.log(response.data.response);

      setUpdateFormData(response.data.response);

      // console.log("single doctor list", response.data.response);
    } catch (error) {
      // console.log("Appointment Data Error" + error);
      error.response.data.extraDetails
        ? toast.error(error.response.data.extraDetails)
        : toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getSingleDoctorData(); // function call
  }, []);

  // ---------------------------------- handle input form -----------------------------------------------
  const handleInputForm = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  // ------------------------------------------- handle submit add doctor ----------------------------------------
  const handleDoctorUpdateForm = async (e) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Updating Profile...");

    try {
      const headers = {
        Authorization: authorizationToken,
      };
      const response = await apiConnector(
        "PUT",
        `https://hospital-mangement-system-app.onrender.com/api/v1/admin/doctors/update/${params.id}`,
        {
          phone: updateFormData.phone,
          department: updateFormData.department,
          degree: updateFormData.degree,
          experience: updateFormData.experience,
          address: updateFormData.address,
          about: updateFormData.about,
        },
        headers
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      } else {
        toast.update(loadingToastId, {
          render: "Updated Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        // Clear form and file input
        navigate("/admin/doctors-list");
      }
    } catch (error) {
      // console.log("error in update profile form: ", error.response.data);
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
    <div className={Style.updateDoctor}>
      <h1>Update Doctor Profile</h1>
      <form
        action=""
        className={Style.addDoctorsForm}
        onSubmit={(e) => handleDoctorUpdateForm(e)}
      >
        <div>
          <label htmlFor="">Profile Image</label>
          <img src={updateFormData.image} />
        </div>
        <div>
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            required
            disabled={true}
            value={updateFormData.name}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            required
            disabled={true}
            value={updateFormData.email}
          />
        </div>
        <div>
          <label htmlFor="">Phone</label>{" "}
          <input
            type="number"
            name="phone"
            placeholder="Enter Contact Number"
            required
            onChange={(e) => handleInputForm(e)}
            value={updateFormData.phone}
          />
        </div>
        <div>
          {" "}
          <label htmlFor="">Gender</label>
          <select
            name="gender"
            required
            disabled={true}
            value={updateFormData.gender}
          >
            <option value="">Select Gender</option>
            {doctorsGender.map((gender, index) => {
              return (
                <option value={gender} key={index}>
                  {gender}
                </option>
              );
            })}
          </select>{" "}
        </div>
        <div>
          {" "}
          <label htmlFor="">Department</label>
          {/* department */}
          <select
            name="department"
            required
            onChange={(e) => handleInputForm(e)}
            value={updateFormData.department}
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
        </div>

        <div>
          <label htmlFor="">Degree</label>
          {/* degree */}
          <select
            name="degree"
            required
            onChange={(e) => handleInputForm(e)}
            value={updateFormData.degree}
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
        </div>
        <div>
          <label htmlFor="">Experience</label>
          {/* experience */}
          <select
            name="experience"
            required
            onChange={(e) => handleInputForm(e)}
            value={updateFormData.experience}
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
        </div>
        <div>
          <label htmlFor="">Address</label>
          {/* address */}
          <textarea
            name="address"
            id=""
            required
            onChange={(e) => handleInputForm(e)}
            value={updateFormData.address}
            placeholder="Enter Address"
          ></textarea>
        </div>
        <div>
          {" "}
          <label htmlFor="">About</label>
          {/* about doctors */}
          <textarea
            name="about"
            id=""
            required
            onChange={(e) => handleInputForm(e)}
            value={updateFormData.about}
            placeholder="About Doctors..."
          ></textarea>
        </div>

        <div>
          {/* submit button */}
          <button type="submit" className="btn">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDoctorProfile;
