import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./NewWarehouse.scss";
import ArrowBack from "../../assets/Icons/arrow_back-24px.svg";
import Error from "../../assets/Icons/error-24px.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewWarehouse() {
  const [warehouseDetails, setWarehouseDetails] = useState({
    warehouseName: "",
    street: "",
    city: "",
    country: "",
    contactName: "",
    position: "",
    phone: "",
    email: "",
  });

  // disable fields when submitting
  const [isdisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  // Errors
  const [errorWarehouseName, setErrorWarehouseName] = useState(false);
  const [errorStreet, setErrorStreet] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorContactName, setErrorContactName] = useState(false);
  const [errorPosition, setErrorPosition] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  // Update state for input in Warehouse Section - keep all other fields as-is
  const handleWarehouseChange = (e) => {
    setWarehouseDetails({
      ...warehouseDetails,
      [e.target.name]: e.target.value,
    });
  };

  //toasty
  const notify = (item) => toast.success(`${item} was added to warehouses.`);

  // Error Message component...move?
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

  const handleSubmit = async (e) => {
    // Reset Errors
    e.preventDefault();

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
    const validatePhone = (phone) => {
      const regEx = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
      const isValid = regEx.test(phone);
      return isValid;
    };

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
    if (warehouseDetails.contactName === "") {
      setErrorContactName(true);
      isValid = false;
    }
    if (warehouseDetails.position === "") {
      setErrorPosition(true);
      isValid = false;
    }
    if (warehouseDetails.warehouseName === "") {
      setErrorWarehouseName(true);
      isValid = false;
    }

    if (
      warehouseDetails.phone === "" ||
      !validatePhone(warehouseDetails.phone)
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

    // If no errors, submit form
    if (isValid) {
      try {
        const newWarehouse = {
          warehouseName: warehouseDetails.warehouseName,
          street: warehouseDetails.street,
          city: warehouseDetails.city,
          country: warehouseDetails.country,
          contactName: warehouseDetails.contactName,
          position: warehouseDetails.position,
          phone: warehouseDetails.phone,
          email: warehouseDetails.email,
        };
        const response = await axios.post(
          "http://localhost:2000/warehouses/new",
          newWarehouse
        );
        setIsDisabled(true);
        notify(newWarehouse.warehouseName);
        setTimeout(() => {
          navigate("/warehouses");
        }, 3000);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="new-warehouse">
      <form onSubmit={handleSubmit} className="new-warehouse__form">
        <h1 className="new-warehouse__header">
          <Link to="/" className="new-warehouse__header-link">
            <img src={ArrowBack} alt="Back Arrow Icon" />
          </Link>
          Add New Warehouse
        </h1>
        <div className="new-warehouse__form-container">
          <div className="new-warehouse__form-section new-warehouse__form-section--warehouse">
            <h2 className="new-warehouse__details-header">Warehouse Details</h2>
            <label
              htmlFor="warehouseName"
              className="new-warehouse__form-label"
            >
              Warehouse Name
              <input
                name="warehouseName"
                placeholder="Warehouse Name"
                value={warehouseDetails.warehouseName}
                onChange={handleWarehouseChange}
                className={`new-warehouse__form-input ${
                  errorWarehouseName ? " new-warehouse__form-input--error" : ""
                }`}
                disabled={isdisabled}
              />
              {errorWarehouseName && <ErrorMessage />}
            </label>
            <label htmlFor="street" className="new-warehouse__form-label">
              Street Address
              <input
                name="street"
                placeholder="Street Address"
                value={warehouseDetails.street}
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
                name="city"
                placeholder="City"
                value={warehouseDetails.city}
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
                name="country"
                placeholder="Country"
                value={warehouseDetails.country}
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
            <label htmlFor="contactName" className="new-warehouse__form-label">
              Contact Name
              <input
                name="contactName"
                placeholder="Contact Name"
                value={warehouseDetails.contactName}
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
                name="position"
                placeholder="Position"
                value={warehouseDetails.position}
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
                name="phone"
                placeholder="Phone Number"
                value={warehouseDetails.phone}
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
                name="email"
                placeholder="Email"
                value={warehouseDetails.email}
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
            + Add Warehouse
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
  );
}

export default NewWarehouse;
