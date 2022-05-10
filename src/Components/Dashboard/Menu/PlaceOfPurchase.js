import React, { useState } from "react";
import { Menu, Checkbox } from "antd";

export default function PlaceOfPurchase({ addItem, selectAllPlaceOfPurchase, purchasePlaceSelected }) {
  const [disableCheck, setDisableCheck] = useState(false);

  function handleBothCheck(e) {
    setDisableCheck(!disableCheck);
    selectAllPlaceOfPurchase(e);
  }

  return (
    <>
      <Menu.Item>
        <Checkbox onChange={handleBothCheck}>Both</Checkbox>
      </Menu.Item>
      {disableCheck ? (
        <div style={{background:'#fafafa'}}>
          <Menu.Item key="in1">
            <Checkbox disabled={true} checked={true}>
              In City.
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="out1">
            <Checkbox disabled={true} checked={true}>
              Outside City.
            </Checkbox>
          </Menu.Item>
        </div>
      ) : (
        <div style={{background:'#fafafa'}}>
          <Menu.Item key="in2">
            <Checkbox onChange={(e) => addItem("placeOfPurchase", "in", e)} checked={purchasePlaceSelected.includes("in")}>
            In City
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="out2">
            <Checkbox onChange={(e) => addItem("placeOfPurchase", "out", e)} checked={purchasePlaceSelected.includes("out")}>
            Outside City
            </Checkbox>
          </Menu.Item>
        </div>
      )}
    </>
  );
}
