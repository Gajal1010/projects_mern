import "./Warehouse.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import rightArrow from "../../assets/Icons/chevron_right-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import sortArrow from "../../assets/Icons/sort-24px.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Warehouse(props) {
  const [deleteModal, setDeleteModal] = useState(false); //state to control delete modal
  const [deleteWarehouse, setDeleteWarehouse] = useState([""]); //to pass id to deletemodal to send API delete request
  const [sort, setSort] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  //delete request handler
  const delHandle = (name, id) => {
    setDeleteWarehouse([name, id]);
    setDeleteModal(true);
  };

  //toasty
  const notify = (item) =>
    toast.success(`${item} was deleted from warehouses.`);

  //sort handlr
  const sortData = (e) => {
    // copying the warehouse info so I don't modify it accidentally
    const newWarehouses = [...props.warehousesData];

    const fieldName =
      e.target.innerText !== "" ? e.target.innerText : e.target.name;

    let field = "";

    switch (fieldName) {
      case "WAREHOUSE":
        field = "name";
        break;
      case "ADDRESS":
        field = "address";
        break;
    }

    if (!sort) {
      const compare = (a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      };
      setSort(true);
      props.setWarehousesData(newWarehouses.sort(compare));
      return;
    }

    if (sort) {
      const compare = (a, b) => {
        if (a[field] < b[field]) {
          return 1;
        }
        if (a[field] > b[field]) {
          return -1;
        }
        return 0;
      };
      setSort(false);
      props.setWarehousesData(newWarehouses.sort(compare));
    }
  };

  return (
    <>
      {/* if deleteModal is set to true, the modal will render */}
      <div className="warehouse__container">
        {deleteModal && (
          <DeleteModal
            setDeleteModal={setDeleteModal}
            deleteWarehouse={deleteWarehouse}
            notify={notify}
            setWarehousesData={props.setWarehousesData}
          />
        )}
        <div className="warehouse__top">
          <h1 className="warehouse__title">Warehouses</h1>
          <div className="warehouse__topright">
            <input
              type="text"
              className="warehouse__search"
              placeholder="Search..."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
            <Link to="/warehouses/new" className="warehouse__button">
              + Add New Warehouse
            </Link>
          </div>
        </div>

        <div className="warehouse__categories">
          <div className="warehouse__categoryAndArrow warehouse__categoryAndArrow-sort">
            <span className="warehouse__category " onClick={sortData}>
              WAREHOUSE
            </span>
            <img
              src={sortArrow}
              alt="sort arrow"
              className="warehouse__sortArrow"
            />
          </div>
          <div className="warehouse__categoryAndArrow warehouse__categoryAndArrow-sort">
            <span className="warehouse__category" onClick={sortData}>
              ADDRESS
            </span>
            <img
              src={sortArrow}
              className="warehouse__sortArrow"
              alt="sort arrow"
            />
          </div>
          <div className="warehouse__categoryAndArrow">
            <span className="warehouse__category">CONTACT NAME</span>
          </div>
          <div className="warehouse__categoryAndArrow">
            <span className="warehouse__category">CONTACT INFORMATION</span>
          </div>
          <span className="warehouse__category--right">ACTIONS</span>
        </div>

        {props.warehousesData
          ?.filter((warehouse) => {
            if (searchTerm === "") {
              return warehouse;
            } else if (
              warehouse.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return warehouse;
            }
          })
          .map((warehouse) => (
            <div className="warehouse" key={warehouse.id}>
              <div className="warehouse__text">
                <div className="warehouse__left">
                  <Link
                    to={`/warehouses/${warehouse.id}`}
                    className="warehouse__link"
                  >
                    <div className="warehouse__nameAndArrow">
                      <p className="warehouse__name">{warehouse.name}</p>

                      <img
                        src={rightArrow}
                        className="warehouse__rightArrow"
                        alt="right arrow"
                      />
                    </div>
                  </Link>
                  <p className="warehouse__address">
                    {warehouse.address}, {warehouse.city}, {warehouse.country}
                  </p>
                </div>
                <div className="warehouse__right">
                  <p className="warehouse__contact">{warehouse.contact.name}</p>
                  <p className="warehouse__contactinfo">
                    <span>{warehouse.contact.phone}</span>
                    <span>{warehouse.contact.email}</span>
                  </p>
                </div>
              </div>
              <div className="warehouse__icons">
                <img
                  onClick={() => delHandle(warehouse.name, warehouse.id)} //passing both name and id of selected wh
                  src={deleteIcon}
                  alt="delete icon"
                  className="warehouse__deleteicon"
                />
                <Link to={`edit-warehouse/${warehouse.id}`}>
                  <img
                    src={editIcon}
                    alt="edit icon"
                    className="warehouse__editicon"
                  />
                </Link>
              </div>
            </div>
          ))}
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
      </div>
    </>
  );
}
export default Warehouse;
