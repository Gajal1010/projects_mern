import "./InventoryItemsDetails.scss";
import backArrow from "../../assets/Icons/arrow_back-24px.svg";
import editButton from "../../assets/Icons/edit-24px.svg";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function InventoryItemsDetails() {
  let itemID = useParams().id;
  let inventoryURL = `http://localhost:2000/inventories/item/${itemID}`;

  const [currentItem, setCurrentItem] = useState();

  useEffect(() => {
    axios
      .get(inventoryURL)
      .then((response) => {
        setCurrentItem(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [inventoryURL]);

  if (currentItem === null || currentItem === undefined) {
    return (
      <ClipLoader
        color="#232940"
        cssOverride={{ display: "block", margin: "0 auto" }}
        size={100}
      />
    );
  }
  return (
    <div className="page-body">
      <header className="inventory-header">
        <h1 className="inventory-header__itemName">
          <Link to={`/warehouses/${currentItem.warehouseID}`}>
            <img src={backArrow} className="backArrow" alt="back" />
          </Link>
          {currentItem.itemName}
        </h1>
        <Link to={`/inventory/edit-inventory/${itemID}`}>
          <button className="inventory-header__edit-button__mobile">
            <img
              className="editButton-image"
              src={editButton}
              alt="editButton"
            />
          </button>
        </Link>
        <Link to={`/inventory/edit-inventory/${itemID}`}>
          <button className="inventory-header__edit-button">
            <img
              className="editButton-image"
              src={editButton}
              alt="editButton"
            />
            Edit
          </button>
        </Link>
      </header>
      <section className="inventory-body">
        <div className="inventory-container-description-category">
          <div className="inventory-container-itemDescription">
            <h2 className="info-title">ITEM DESCRIPTION:</h2>
            <p className="info-details">{currentItem.description}</p>
          </div>
          <div className="inventory-container">
            <h2 className="info-title">CATEGORY:</h2>
            <p className="info-details">{currentItem.category}</p>
          </div>
        </div>
        <div className="inventory-container-status-quantity-warehouse">
          <div className="inventory-container-status-quantity">
            <div className="inventory-container">
              <h2 className="info-title">STATUS:</h2>
              <p
                className={
                  currentItem.status === "In Stock"
                    ? "statusTagGreen"
                    : "statusTagRed"
                }
              >
                {currentItem.status}
              </p>
            </div>
            <div className="inventory-container">
              <h2 className="info-title">QUANTITY:</h2>
              <p className="info-details">{currentItem.quantity}</p>
            </div>
          </div>
          <div>
            <h2 className="info-title">WAREHOUSE:</h2>
            <p className="info-details">{currentItem.warehouseName}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
export default InventoryItemsDetails;
