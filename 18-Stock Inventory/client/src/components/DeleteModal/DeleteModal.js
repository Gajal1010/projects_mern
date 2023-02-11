import "./DeleteModal.scss";
import axios from "axios";

function DeleteModal({
  setDeleteModal,
  deleteWarehouse,
  notify,
  setWarehousesData,
}) {
  const cancelHandler = () => {
    //if we click on X or cancel, the modal will close
    setDeleteModal(false);
  };

  const deleteHandler = () => {
    let apiURL = `http://localhost;2000/warehouses/${deleteWarehouse[1]}`;
    axios
      .delete(apiURL)
      .then((res) => setWarehousesData(res.data))
      .then(setDeleteModal(false))
      .then(notify(deleteWarehouse[0])) //remove modal after submit
      .catch((err) => console.error(err));
  };
  return (
    <div className="deleteModal-bg">
      <div className="deleteModal-container">
        <div className="deleteModal__top-container">
          <button onClick={cancelHandler} className="deleteModal__close-btn">
            X
          </button>
          <div className="deleteModal__text-container">
            <h1 className="deleteModal__title">
              Delete {deleteWarehouse[0]} warehouse?
            </h1>
            <p className="deleteModal__text">
              Please confirm that you’d like to delete the {deleteWarehouse[0]}
              {"\u00a0"}
              from the list of warehouses. You won’t be able to undo this
              action.
            </p>
          </div>
        </div>
        <div className="deleteModal__btn-container">
          <button
            onClick={cancelHandler}
            className="deleteModal__btn deleteModal__btn-cancel"
          >
            Cancel
          </button>
          <button
            onClick={deleteHandler}
            className="deleteModal__btn deleteModal__btn-delete "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
