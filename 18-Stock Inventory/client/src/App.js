import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import InventoryItemsDetails from "./pages/InventoryItemsDetails/InventoryItemsDetails";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import EditInventory from "./pages/EditInventory/EditInventory";
import EditWarehouse from "./pages/EditWarehouse/EditWarehouse";
import WarehouseDetails from "./pages/Warehouse-details/WarehouseDetails";
import NewWarehouse from "./components/NewWarehouse/NewWarehouse";
import NewItem from "./components/NewItem/NewItem";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <div className="app__container">
          <Routes>
            <Route path="/" element={<Navigate to="/warehouses" />}></Route>
            <Route path="/warehouses" element={<HomePage />}></Route>
            <Route path="/inventory" element={<InventoryPage />}></Route>
            <Route
              path="/inventory/:id"
              element={<InventoryItemsDetails />}
            ></Route>
            <Route path="/inventory/new" element={<NewItem />} />
            <Route
              path="/warehouses/:warehouseID"
              element={<WarehouseDetails />}
            ></Route>
            <Route path="/warehouses/new" element={<NewWarehouse />}></Route>
            <Route
              path="/warehouses/edit-warehouse/:warehouseId"
              element={<EditWarehouse />}
            />{" "}
            <Route
              path="/inventory/edit-inventory/:inventoryId"
              element={<EditInventory />}
            />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
