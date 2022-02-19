import React, { useState,useEffect } from "react";
import { Menu, Checkbox } from "antd";

export default function PlaceOfPurchase({ addItem, selectAllPlaceOfPurchase }) {
  const [disableCheck, setDisableCheck] = useState(true);

  function handleBothCheck(e) {
    setDisableCheck(!disableCheck);
    // e.target.checked = true;
    // console.log(e,'2wwwee')
    selectAllPlaceOfPurchase(e);
    console.log(e,"eeeeeee")
  }

  return (
    <>
      <Menu.Item>
        <Checkbox onMouseEnter={handleBothCheck} >Both</Checkbox>
      </Menu.Item>
   
      {disableCheck ? (
        <div>
          <Menu.Item key="in1">
            <Checkbox disabled={true} checked={true}>
              In City.
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="out1">
            <Checkbox disabled={true} checked={true}>
              Outside City
            </Checkbox>
          </Menu.Item>
        </div>
      ) : (
        <div>
          <Menu.Item key="in2">
            <Checkbox onChange={(e) => addItem("placeOfPurchase", "in", e)}>
            In City
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="out2">
            <Checkbox onChange={(e) => addItem("placeOfPurchase", "out", e)}>
            Outside City
            </Checkbox>
          </Menu.Item>
        </div>
      )}
    </>
  );
}
