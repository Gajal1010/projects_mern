import "./EditWarehouse.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import backArrowIcon from "../../assets/Icons/arrow_back-24px.svg";
import Error from "../../assets/Icons/error-24px.svg";
import "../../components/NewWarehouse/NewWarehouse.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

function EditWarehouse() {
  const navigate = useNavigate();
  const [warehouseDetails, setWarehouseDetails] = useState({
    warehouseName: "",
    street: "",
    city: "",
    country: "",
    name: "",
    position: "",
    phone: "",
    email: "",
  });
  //get warehouse info with params
  const { warehouseId } = useParams();

  //input disabled
  const [isdisabled, setIsDisabled] = useState(false);

  let warehouseURL = `http://localhost:2000/warehouses/${warehouseId}`;

  useEffect(() => {
    axios.get(warehouseURL).then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
        setWarehouseDetails({
          warehouseName: response.data[0].name,
          street: response.data[0].address,
          city: response.data[0].city,
          country: response.data[0].country,
          name: response.data[0].contact.name,
          position: response.data[0].contact.position,
          phone: response.data[0].contact.phone,
          email: response.data[0].contact.email,
        });
      }
    });
  }, [warehouseURL]);

  //handle change with value
  const handleWarehouseChange = (e) => {
    setWarehouseDetails({
      ...warehouseDetails,
      [e.target.name]: e.target.value,
    });
    // console.log(warehouseDetails);
  };

  // Error Message component
  const ErrorMessage = () => {
    return (
      <span className="new-warehouse__form-error">
        <img
          src={Error}
          alt="Error Icon"
          className="new-warehouse__form-error-icon"
        />
        This field is required
      </span>
    );
  };

  //toasty
  const notify = (item) => toast.success(`${item} was updated successfully.`);

  // Errors
  const [errorWarehouseName, setErrorWarehouseName] = useState(false);
  const [errorStreet, setErrorStreet] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorContactName, setErrorContactName] = useState(false);
  const [errorPosition, setErrorPosition] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let isValid = true;

    setErrorWarehouseName(false);
    setErrorStreet(false);
    setErrorCity(false);
    setErrorCountry(false);
    setErrorContactName(false);
    setErrorPosition(false);
    setErrorPhone(false);
    setErrorEmail(false);

    // Phone RegEx, thanks Google.
    // const validatePhone = (phone) => {
    //   const regEx = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
    //   const isValid = regEx.test(phone);
    //   return isValid;
    // };

    // Sets Errors
    if (warehouseDetails.warehouseName === "") {
      setErrorWarehouseName(true);
      isValid = false;
    }
    if (warehouseDetails.street === "") {
      setErrorStreet(true);
      isValid = false;
    }
    if (warehouseDetails.city === "") {
      setErrorCity(true);
      isValid = false;
    }
    if (warehouseDetails.country === "") {
      setErrorCountry(true);
      isValid = false;
    }
    if (warehouseDetails.name === "") {
      setErrorContactName(true);
      isValid = false;
    }
    if (warehouseDetails.position === "") {
      setErrorPosition(true);
      isValid = false;
    }

    if (
      warehouseDetails.phone === ""
      //   ||
      //   !validatePhone(warehouseDetails.phone)
    ) {
      setErrorPhone(true);
      isValid = false;
    }

    if (
      warehouseDetails.email === "" ||
      !warehouseDetails.email.includes("@")
    ) {
      setErrorEmail(true);
      isValid = false;
    }

    if (isValid) {
      //   console.log(warehouseDetails);
      try {
        const editedWarehouse = {
          id: warehouseId,
          name: warehouseDetails.warehouseName,
          address: warehouseDetails.street,
          city: warehouseDetails.city,
          country: warehouseDetails.country,
          contact: {
            name: warehouseDetails.name,
            position: warehouseDetails.position,
            phone: warehouseDetails.phone,
            email: warehouseDetails.email,
          },
        };

        const response = axios.put(
          `https://in-stock-20-server-production.up.railway.app/warehouses/${warehouseId}`,
          editedWarehouse
        );
        setIsDisabled(true);
        notify(editedWarehouse.name);
        setTimeout(() => {
          navigate("/warehouses");
        }, 3000);

        return response;
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (warehouseDetails === null || warehouseDetails === undefined) {
    return (
      <ClipLoader
        color="#232940"
        cssOverride={{ display: "block", margin: "0 auto" }}
        size={100}
      />
    );
  }

  return (
    <>
      <section className="new-warehouse">
        <form onSubmit={handleSubmit} className="new-warehouse__form">
          <h1 className="new-warehouse__header">
            <Link to="/" className="new-warehouse__header-link">
              <img src={backArrowIcon} alt="Back Arrow Icon" />
            </Link>
            Edit Warehouse
          </h1>
          <div className="new-warehouse__form-container">
            <div className="new-warehouse__form-section new-warehouse__form-section--warehouse">
              <h2 className="new-warehouse__details-header">
                Warehouse Details
              </h2>
              <label
                htmlFor="warehouseName"
                className="new-warehouse__form-label"
              >
                Warehouse Name
                <input
                  required
                  type="text"
                  placeholder="Warehouse Name"
                  name="warehouseName"
                  defaultValue={warehouseDetails.warehouseName}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorWarehouseName
                      ? " new-warehouse__form-input--error"
                      : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorWarehouseName && <ErrorMessage />}
              </label>
              <label htmlFor="street" className="new-warehouse__form-label">
                Street Address
                <input
                  required
                  type="text"
                  placeholder="Warehouse Street"
                  name="street"
                  defaultValue={warehouseDetails.street}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorStreet ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorStreet && <ErrorMessage />}
              </label>
              <label htmlFor="city" className="new-warehouse__form-label">
                City
                <input
                  required
                  type="text"
                  placeholder="Warehouse City"
                  name="city"
                  defaultValue={warehouseDetails.city}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorCity ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorCity && <ErrorMessage />}
              </label>
              <label htmlFor="country" className="new-warehouse__form-label">
                Country
                <input
                  required
                  type="text"
                  placeholder="Warehouse Country"
                  name="country"
                  defaultValue={warehouseDetails.country}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorCountry ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorCountry && <ErrorMessage />}
              </label>
            </div>

            <div className="new-warehouse__form-section new-warehouse__form-section--contact">
              <h2 className="new-warehouse__details-header">Contact Details</h2>
              <label
                htmlFor="contactName"
                className="new-warehouse__form-label"
              >
                Contact Name
                <input
                  required
                  type="text"
                  placeholder="Contact Name"
                  name="name"
                  defaultValue={warehouseDetails.name}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorContactName ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorContactName && <ErrorMessage />}
              </label>
              <label htmlFor="position" className="new-warehouse__form-label">
                Position
                <input
                  required
                  type="text"
                  placeholder="Position"
                  name="position"
                  defaultValue={warehouseDetails.position}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorPosition ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorPosition && <ErrorMessage />}
              </label>
              <label htmlFor="phone" className="new-warehouse__form-label">
                Phone Number
                <input
                  required
                  type="text"
                  placeholder="Phone number"
                  name="phone"
                  defaultValue={warehouseDetails.phone}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorPhone ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorPhone && <ErrorMessage />}
              </label>
              <label htmlFor="email" className="new-warehouse__form-label">
                Email
                <input
                  required
                  type="text"
                  placeholder="Email"
                  name="email"
                  defaultValue={warehouseDetails.email}
                  onChange={handleWarehouseChange}
                  className={`new-warehouse__form-input ${
                    errorEmail ? " new-warehouse__form-input--error" : ""
                  }`}
                  disabled={isdisabled}
                />
                {errorEmail && <ErrorMessage />}
              </label>
            </div>
          </div>
          <div className="new-warehouse__button-container">
            <Link
              className="new-warehouse__button new-warehouse__button--cancel"
              to="/"
            >
              Cancel
            </Link>
            <button className="new-warehouse__button" disabled={isdisabled}>
              Save
            </button>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </form>
      </section>
    </>
  );
}

export default EditWarehouse;
