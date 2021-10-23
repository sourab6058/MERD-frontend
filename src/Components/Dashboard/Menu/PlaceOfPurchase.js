import React, { useState } from "react";
import { Menu, Checkbox } from "antd";

export default function PlaceOfPurchase({ addItem, selectAllPlaceOfPurchase }) {
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
        <div>
          <Menu.Item key="in1">
            <Checkbox disabled={true} checked={true}>
              In the cities.
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="out1">
            <Checkbox disabled={true} checked={true}>
              Outside the cities.
            </Checkbox>
          </Menu.Item>
        </div>
      ) : (
        <div>
          <Menu.Item key="in2">
            <Checkbox onChange={(e) => addItem("placeOfPurchase", "in", e)}>
              In the cities.
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="out2">
            <Checkbox onChange={(e) => addItem("placeOfPurchase", "out", e)}>
              Outside the cities.
            </Checkbox>
          </Menu.Item>
        </div>
      )}
    </>
  );
}
