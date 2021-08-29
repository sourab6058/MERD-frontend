import React from 'react'
import { Menu, Checkbox } from 'antd'

const SubSubMonths = ({ allselected, selectquarter, selectmonth, quarter, ...rest }) => {
    return (
        <Menu.SubMenu key={quarter.quarter} title={`${quarter.quarter} Quarter`} {...rest}>
            <Menu.Item><Checkbox onChange={e => selectquarter(quarter.quarter, e)}>Select All</Checkbox></Menu.Item>
            {quarter.months.map(month =>
                allselected[quarter.quarter] ?
                    <Menu.Item key={month.month}><Checkbox checked={false} disabled={allselected[quarter.quarter]}>{month.month}</Checkbox></Menu.Item>
                    : <Menu.Item key={month.month}><Checkbox onChange={e => selectmonth(month.id, e)}>{month.month}</Checkbox></Menu.Item>
            )}
        </Menu.SubMenu>
    )
}

export default SubSubMonths
