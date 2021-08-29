import React, { useState } from 'react'
import { Menu, Checkbox } from 'antd'

const SubNationality = ({ nationality, additem, selectAllNationalities, ...rest }) => {
    const [allSelected, setAllSelected] = useState(false)

    const checkedAll = e => {
        setAllSelected(!allSelected);

        selectAllNationalities(e);
    }

    return (
        <Menu.SubMenu key="Nationality" title="Nationality" {...rest}>
            <Menu.Item><Checkbox onChange={(e) => checkedAll(e)}>Select All</Checkbox></Menu.Item>
            {nationality.map(nation =>
                !allSelected ? <Menu.Item key={nation.nationality}>
                    <Checkbox
                        onClick={(e) => additem('nationalities', nation.id, e)}
                    >
                        {nation.nationality}
                    </Checkbox>
                </Menu.Item>
                    : <Menu.Item key={nation.nationality}><Checkbox
                        disabled={allSelected}
                        checked={false}>
                        {nation.nationality}
                    </Checkbox></Menu.Item>)}
        </Menu.SubMenu>
    )
}

export default SubNationality;