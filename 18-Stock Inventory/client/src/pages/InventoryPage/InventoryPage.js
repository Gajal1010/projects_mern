import "./InventoryPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Inventory from "../../components/Inventory/Inventory";
import ClipLoader from "react-spinners/ClipLoader";

function InventoryPage() {
  //using use location to update list if warehouse edited/deleted
  const location = useLocation();
  const locationKey = location.key;
  const [currentUrl, setCurrentUrl] = useState(locationKey);

  //location key changes if are changing the url
  useEffect(() => {
    setCurrentUrl(locationKey);
  }, [locationKey]);
  //api call
  const inventoriesAPIURL =
    "http://localhost:2000/inventories";
  const [inventoriesData, setInventoriesData] = useState();

  useEffect(() => {
    // setting inventories data
    axios
      .get(inventoriesAPIURL)
      .then((response) => {
        setInventoriesData(response.data);
      })
      .catch((err) => console.error(err));
  }, [currentUrl]);

  if (inventoriesData === null || inventoriesData === undefined) {
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
      <Inventory
        inventoriesData={inventoriesData}
        setInventoriesData={setInventoriesData}
      />
    </>
  );
}

export default InventoryPage;
