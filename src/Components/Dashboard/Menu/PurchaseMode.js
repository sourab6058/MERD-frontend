import React, { useRef } from "react";
import { Menu, Checkbox } from "antd";

const { SubMenu } = Menu;

export default function PurchaseMode({ addItem }) {
  const bothRef = useRef();
  const onlineRef = useRef();
  const offlineRef = useRef();

  function handleBothChange(e) {
    if (e.checked) {
      offlineRef.current.checked = true;
      offlineRef.current.checked = true;
    }
  }

  function handleOfflineChange(e) {
    if (e.checked) {
    }
  }

  return (
    <>
      <Menu.Item>
        <Checkbox onChange={(e) => addItem("purchaseMode", "offline", e)}>
          Offline
        </Checkbox>
      </Menu.Item>
      <Menu.Item>
        <Checkbox onChange={(e) => addItem("purchaseMode", "online", e)}>
          Online
        </Checkbox>
      </Menu.Item>
    </>
  );
}
