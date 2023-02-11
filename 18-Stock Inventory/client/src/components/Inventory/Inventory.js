import "./Inventory.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import deleteIcon from "../../assets/Icons/delete_outline-24px.svg";
import editIcon from "../../assets/Icons/edit-24px.svg";
import rightArrow from "../../assets/Icons/chevron_right-24px.svg";
import sortArrow from "../../assets/Icons/sort-24px.svg";
import InventoryDelModal from "../InventoryDelModal/InventoryDelModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Inventory(props) {
  const [deleteInvModal, setDeleteInvModal] = useState(false);
  const [deleteInventory, setDeleteInventory] = useState([""]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState(false);

  //toasty
  const notify = (item) =>
    toast.success(`${item} was deleted from inventories.`);

  const delHandle = (name, id) => {
    setDeleteInventory([name, id]);
    setDeleteInvModal(true);
  };

  const sortData = (e) => {
    const newInventories = [...props.inventoriesData];

    const fieldName =
      e.target.innerText !== "" ? e.target.innerText : e.target.name;

    let field = "";

    switch (fieldName) {
      case "INVENTORY ITEM":
        field = "itemName";
        break;
      case "CATEGORY":
        field = "category";
        break;
      case "STATUS":
        field = "status";
        break;
      case "QTY":
        field = "quantity";
        break;
      case "WAREHOUSE":
        field = "warehouseName";
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
      props.setInventoriesData(newInventories.sort(compare));
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
      props.setInventoriesData(newInventories.sort(compare));
    }
  };
  return (
    <div className="inventory__container">
      {deleteInvModal && (
        <InventoryDelModal
          setDeleteInvModal={setDeleteInvModal}
          deleteInventory={deleteInventory}
          notify={notify}
          setInventoriesData={props.setInventoriesData}
        />
      )}
      <div className="inventory__top">
        <h1 className="inventory__title">Inventory</h1>
        <div className="inventory__topright">
          <input
            type="text"
            className="inventory__search"
            placeholder="Search..."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          ></input>
          <Link to="/inventory/new" className="inventory__button">
            + Add New Item
          </Link>
        </div>
      </div>
      <div className="inventory__categories">
        <div className="inventory__categoryAndArrow--left">
          <span className="inventory__category" onClick={sortData}>
            INVENTORY ITEM
          </span>
          <img
            src={sortArrow}
            alt="sort Arrow"
            className="inventory__sortArrow"
          />
        </div>
        <div className="inventory__categoryAndArrow">
          <span className="inventory__category" onClick={sortData}>
            CATEGORY
          </span>
          <img
            src={sortArrow}
            alt="sort Arrow"
            className="inventory__sortArrow"
          />
        </div>
        <div className="inventory__categoryAndArrow">
          <span className="inventory__category" onClick={sortData}>
            STATUS
          </span>
          <img
            src={sortArrow}
            alt="sort Arrow"
            className="inventory__sortArrow"
          />
        </div>
        <div className="inventory__categoryAndArrow">
          <span className="inventory__category" onClick={sortData}>
            QTY
          </span>
          <img
            src={sortArrow}
            alt="sort Arrow"
            className="inventory__sortArrow"
          />
        </div>
        <div className="inventory__categoryAndArrow">
          <span className="inventory__category" onClick={sortData}>
            WAREHOUSE
          </span>
          <img
            src={sortArrow}
            alt="sort Arrow"
            className="inventory__sortArrow"
          />
        </div>
        <span className="inventory__category--right">ACTIONS</span>
      </div>
      {props.inventoriesData
        .filter((inventory) => {
          if (searchTerm === "") {
            return inventory;
          } else if (
            inventory.itemName.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return inventory;
          }
        })
        .map((thumb) => (
          <div className="inventory" key={thumb.id}>
            <div className="inventory__text">
              <div className="inventory__left">
                <Link to={`/inventory/${thumb.id}`} className="inventory__link">
                  <div className="inventory__nameAndArrow">
                    <p className="inventory__name">{thumb.itemName}</p>
                    <img
                      src={rightArrow}
                      alt="right Arrow"
                      className="inventory__rightArrow"
                    />
                  </div>
                </Link>
                <p className="inventory__address">{thumb.category}</p>
              </div>
              <div className="inventory__right">
                <p className="inventory__contact">
                  <span
                    className={
                      thumb.status === "In Stock"
                        ? "inventory__statusTagGreen"
                        : "inventory__statusTagRed"
                    }
                  >
                    {thumb.status}
                  </span>
                </p>
                <p className="inventory__contactinfo">{thumb.quantity}</p>
                <p className="inventory__warehouseName">
                  {thumb.warehouseName}
                </p>
              </div>
            </div>
            <div className="inventory__icons">
              <img
                onClick={() => delHandle(thumb.itemName, thumb.id)} //passing both name and id of selected wh
                src={deleteIcon}
                alt="delete icon"
                className="inventory__deleteicon"
              />
              <Link to={`edit-inventory/${thumb.id}`}>
                <img
                  src={editIcon}
                  alt="edit icon"
                  className="inventory__editicon"
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
  );
}

export default Inventory;
