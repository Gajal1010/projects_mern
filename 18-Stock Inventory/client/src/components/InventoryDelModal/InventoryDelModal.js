import "./InventoryDelModal.scss";
import axios from "axios";

function InventoryDelModal({
  setDeleteInvModal,
  deleteInventory,
  setInventoriesData,
  notify,
}) {
  const cancelHandler = () => {
    //if we click on X or cancel, the modal will close
    setDeleteInvModal(false);
  };
  const deleteHandler = () => {
    let apiURL = `http://localhost:2000/inventories/${deleteInventory[1]}`;
    axios
      .delete(apiURL)
      .then((response) => setInventoriesData(response.data)) //confirmation that warehouse deleted
      .then(setDeleteInvModal(false))
      .then(notify(deleteInventory[0]))
      // .then(navigate("/"))
      .catch((err) => console.error(err));
  };
  return (
    <div className="inventoryDelModal-bg">
      <div className="inventoryDelModal-container">
        <div className="inventoryDelModal__top-container">
          <button
            onClick={cancelHandler}
            className="inventoryDelModal__close-btn"
          >
            X
          </button>
          <div className="inventoryDelModal__text-container">
            <h1 className="inventoryDelModal__title">
              Delete {deleteInventory[0]} inventory?
            </h1>
            <p className="inventoryDelModal__text">
              Please confirm that you’d like to delete the {deleteInventory[0]}
              {"\u00a0"}
              from the list of inventories. You won’t be able to undo this
              action.
            </p>
          </div>
        </div>
        <div className="inventoryDelModal__btn-container">
          <button
            onClick={cancelHandler}
            className="inventoryDelModal__btn inventoryDelModal__btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="inventoryDelModal__btn inventoryDelModal__btn-delete "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryDelModal;
