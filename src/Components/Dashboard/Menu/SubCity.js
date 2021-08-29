import React, { Component } from 'react'
import { Menu, Checkbox } from 'antd';

const { SubMenu } = Menu

export class SubCity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedAll: false,
        }
    }

    //First checks all zones and then adds city using selectallzones
    checkedAll = (whereToBePushed, itemToBePushed, e) => {
        this.setState({
            checkedAll: !this.state.checkedAll,
        })
        this.props.selectallzones(whereToBePushed, itemToBePushed, e)
    }

    render() {
        //Performing a shallow copy of this.props object
        const filteredProps = { ...this.props };
        //Removing custom functional props as antd causes trouble with them
        ['selectallzones', 'addzone'].forEach(item => delete filteredProps[item])

        //Conditional rendering according to checkAll state
        return (
            <SubMenu key={this.props.city.city} title={this.props.city.city} {...filteredProps}>
                <Menu.Item><Checkbox onChange={(e) => this.checkedAll('cities', this.props.city.id, e)}>Select All</Checkbox></Menu.Item>
                {this.props.city.zone.map(zone =>
                    this.state.checkedAll ?
                        <Menu.Item key={zone.id}><Checkbox disabled={this.state.checkedAll} checked={false} onChange={(e) => this.props.addzone('zones', zone.id, e)}>{`Zone ${zone.zone}`}</Checkbox></Menu.Item>
                        : <Menu.Item key={zone.id}><Checkbox disabled={this.state.checkedAll} onChange={(e) => this.props.addzone('zones', zone.id, e)}>{`Zone ${zone.zone}`}</Checkbox></Menu.Item>)}
            </SubMenu>
        )
    }
}

export default SubCity
