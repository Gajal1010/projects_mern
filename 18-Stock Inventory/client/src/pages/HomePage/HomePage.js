import "./HomePage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import Warehouse from "../../components/Warehouse/Warehouse";

function HomePage() {
  const warehousesAPIURL =
    "http://localhost:2000/warehouses";
  const [warehousesData, setWarehousesData] = useState(); //state for all warehouse list

  //using use location to update list if warehouse edited/deleted
  const location = useLocation();
  const locationKey = location.key;
  const [currentUrl, setCurrentUrl] = useState(locationKey);

  //location key changes if are changing the url
  useEffect(() => {
    setCurrentUrl(locationKey);
  }, [locationKey]);

  //using location key change as useeffect dependency
  useEffect(() => {
    // setting warehouses data
    axios
      .get(warehousesAPIURL)
      .then((response) => {
        setWarehousesData(response.data);
      })
      .catch((err) => console.error(err));
  }, [currentUrl]);

  if (warehousesData === null || warehousesData === undefined) {
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
      <Warehouse
        warehousesData={warehousesData}
        setWarehousesData={setWarehousesData}
      />
    </>
  );
}

export default HomePage;
