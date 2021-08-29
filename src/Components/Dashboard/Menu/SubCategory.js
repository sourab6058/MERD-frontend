import React, { Component } from 'react'
import * as _ from 'lodash';
import SubSubCategory from './SubSubCategory';

import { Menu, Checkbox } from 'antd';
// import 'antd/dist/antd.css'

const { SubMenu } = Menu

export class SubCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedAll: false,
            childReload: true,
        }
    }

    //First checkedAll to disabled
    checkedAll = (whereToBePushed, ItemToBePushed, e) => {
        this.setState({
            childReload: !this.state.childReload,
        })
        this.props.selectallsubcategories(whereToBePushed, ItemToBePushed, e)
    }

    render() {
        //Performing a shallow copy of this.props object
        const filteredProps = { ...this.props };
        //Removing custom functional props as antd causes trouble with them
        ['selectallsubcategories', 'selectallsubsubcategories', 'additem'].forEach(item => delete filteredProps[item])

        return (
            <SubMenu {...filteredProps} key={this.props.main.name} title={_.capitalize(this.props.main.name)}>
                <Menu.Item><Checkbox onChange={(e) => this.checkedAll('categories', this.props.main.id, e)} >{`Select all ${this.props.main.name}`}</Checkbox></Menu.Item>
                {this.props.main.sub_category.map(sub =>
                    <SubSubCategory key={sub.name} sub={sub} additem={this.props.additem} selectallsubsubcategories={this.props.selectallsubsubcategories} shouldreload={this.state.childReload.toString()} />
                )}
            </SubMenu>
        )
    }
}

export default SubCategory