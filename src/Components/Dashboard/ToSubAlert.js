import { Button, Modal } from "antd";
import React from "react";

export default function ToSubAlert({ handleClose }) {
  const handleOk = () => {
    window.location.href = "/subscribe-more";
    handleClose();
  };

  return (
    <>
      <Modal
        title="Subscribe More?"
        visible={true}
        onOk={handleOk}
        onCancel={handleClose}
        footer={[
          <Button
            type="primary"
            onClick={handleOk}
            style={{ border: "1px solid var(--darkBlue)" }}
          >
            <span style={{ color: "black" }}>Okay</span>
          </Button>,
        ]}
      >
        We are taking you to the Subscription page, please come back here and
        re-select the subscribed city / category to view data
      </Modal>
    </>
  );
}
