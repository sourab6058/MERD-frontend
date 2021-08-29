import React from 'react'
import { Menu, Checkbox } from 'antd'
import { useState } from 'react'
import SubSubMonths from './SubSubMonths';
const months = [
    {
        quarter: 'First', months: [
            { id: 1, month: "January" },
            { id: 2, month: "February" },
            { id: 3, month: "March" },
        ]
    },
    {
        quarter: 'Second', months: [
            { id: 4, month: "April" },
            { id: 5, month: "May" },
            { id: 6, month: "June" },
        ]
    },
    {
        quarter: 'Third', months: [
            { id: 7, month: "July" },
            { id: 8, month: "August" },
            { id: 9, month: "September" },
        ]
    },
    {
        quarter: 'Fourth', months: [
            { id: 10, month: "October" },
            { id: 11, month: "November" },
            { id: 12, month: "December" },
        ]
    },
]
let selectedMonths = [];

const SubMonths = ({ addmonths, ...rest }) => {
    const [allSelected, setAllSelected] = useState({
        First: false,
        Second: false,
        Third: false,
        Fourth: false
    })
    const [allQuartersSelected, setAllQuartersSelected] = useState(false)

    const selectMonth = (id, e) => {
        if (e.target.checked) {
            selectedMonths.push(id)
        } else {
            selectedMonths = selectedMonths.filter(item => item !== id)
        }
        addmonths(selectedMonths)
    }

    const selectQuarter = (quarter, e) => {
        if (e.target.checked) {
            const tempAllSelected = { ...allSelected };
            tempAllSelected[quarter] = true;
            setAllSelected(tempAllSelected)

            months.forEach(obj => {
                if (obj.quarter === quarter) {
                    obj.months.forEach(month => {
                        if (selectedMonths.indexOf(month.id) === -1) {
                            selectedMonths.push(month.id)
                        }
                    })
                }
            })

        } else {
            const tempAllSelected = { ...allSelected };
            tempAllSelected[quarter] = false;
            setAllSelected(tempAllSelected);

            months.forEach(obj => {
                if (obj.quarter === quarter) {
                    obj.months.forEach(month => {
                        if (selectedMonths.indexOf(month.id) !== -1) {
                            selectedMonths = selectedMonths.filter(item => item !== month.id)
                        }
                    })
                }
            })
        }
        addmonths(selectedMonths)
    }

    const selectAllQuarters = e => {

        if (e.target.checked) {
            setAllQuartersSelected(true);
            selectedMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            setAllSelected({
                First: false,
                Second: false,
                Third: false,
                Fourth: false
            })
        } else {
            setAllQuartersSelected(false);
            selectedMonths = [];
        }

        addmonths(selectedMonths)
    }

    return (
        <Menu.SubMenu key="Months" title="Months" {...rest}>
            <Menu.Item><Checkbox onChange={selectAllQuarters}>Select All</Checkbox></Menu.Item>
            {months.map(quarter => !allQuartersSelected &&
                <SubSubMonths key={quarter.quarter} quarter={quarter} selectquarter={selectQuarter} selectmonth={selectMonth} allselected={allSelected} />
                // <Menu.SubMenu key={quarter.quarter} title={`${quarter.quarter} Quarter`}>
                //     <Menu.Item><Checkbox onChange={e => selectQuarter(quarter.quarter, e)}>Select All</Checkbox></Menu.Item>
                //     {quarter.months.map(month =>
                //         allSelected[quarter.quarter] ?
                //             <Menu.Item key={month.month}><Checkbox checked={false} disabled={allSelected[quarter.quarter]}>{month.month}</Checkbox></Menu.Item>
                //             : <Menu.Item key={month.month}><Checkbox onChange={e => selectMonth(month.id, e)}>{month.month}</Checkbox></Menu.Item>
                //     )}
                // </Menu.SubMenu>
            )}
        </Menu.SubMenu>
    )
}

export default SubMonths
