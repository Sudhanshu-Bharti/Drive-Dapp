import React, { useState, useEffect } from "react";
import { Button } from "../ui/ui/button";
import { Input } from "../ui/ui/input";
import swal from "sweetalert";

function Display({ contract, account }) {
  const [data, setData] = useState([]);

  const getData = async () => {
    let dataArray;
    const OtherAddress = document.querySelector("#address").value;

    if (OtherAddress) {
      dataArray = await contract.display(OtherAddress);
    } else {
      dataArray = await contract.display(account);
    }

    if (dataArray.length > 0) {
      const images = dataArray.map((item, i) => (
        <div key={i}>
          <a href={item} target="_blank">
            <img
              src={`https://blue-adequate-cheetah-413.mypinata.cloud/ipfs/${item.substring(
                36
              )}`}
              alt={`Image ${i}`}
            />
          </a>
        </div>
      ));
      setData(images);
    } else {
      swal("No Images to Display");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Input
          type="text"
          placeholder="Enter address"
          id="address"
          className="w-64"
        />

        <Button variant="primary" type="submit" onClick={getData}>
          Get Data
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 m-2 border border-r-4">{data}</div>
    </>
  );
}

export default Display;
