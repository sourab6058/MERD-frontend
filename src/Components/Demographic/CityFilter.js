import React, { useState, useEffect } from "react";
import { Dropdown, Space, Radio, Button, Menu } from "antd";

export default function CityFilter({ citiesOptions, setCity, selectedCity }) {
  const [cityMenu, setCityMenu] = useState(null);
  useEffect(() => {
    console.log(citiesOptions);
  }, [citiesOptions]);
  return (
    <div>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Radio.Group onChange={setCity}>
                <Space direction="vertical">
                  {citiesOptions.length > 0 &&
                    citiesOptions.map((city) => (
                      <Radio value={city.id}>{city.name}</Radio>
                    ))}
                </Space>
              </Radio.Group>
            </Menu.Item>
          </Menu>
        }
        placement="bottomCenter"
      >
        <Button>Select City{selectedCity}</Button>
      </Dropdown>
    </div>
  );
}
