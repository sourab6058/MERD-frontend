import React, { useState } from "react";
import { Menu, Checkbox } from "antd";

export default function PurchaseMode({ addItem, selectAllPurchaseMode }) {
  const [disableCheck, setDisableCheck] = useState(false);

  function handleBothCheck(e) {
    setDisableCheck(!disableCheck);
    selectAllPurchaseMode(e);
  }

  return (
    <>
     
      {disableCheck ? (
        <div>
          <Menu.Item key="offline1">
            <Checkbox disabled={true} checked={true}>
            	Offline (Buy From Physical Location) 
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="online1">
            <Checkbox disabled={true} checked={true}>
              Online
            </Checkbox>
          </Menu.Item>
        </div>
      ) : (
        <div>
          <Menu.Item key="offline2">
            <Checkbox onChange={(e) => addItem("purchaseMode", "offline", e)}>
               Offline (Buy From Physical Location) 
            </Checkbox>
          </Menu.Item>
          <Menu.Item key="online2">
            <Checkbox onChange={(e) => addItem("purchaseMode", "online", e)}>
              Online
            </Checkbox>
          </Menu.Item>
        </div>
      )}
       <Menu.Item>
        <Checkbox onChange={handleBothCheck}>Both</Checkbox>
      </Menu.Item>
    </>
  );
}
