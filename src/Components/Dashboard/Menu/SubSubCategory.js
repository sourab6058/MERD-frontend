import React, { Component } from 'react'

import { Menu, Checkbox } from 'antd';
// import 'antd/dist/antd.css'

const { SubMenu } = Menu

export class SubSubCategory extends Component {
    constructor(props) {
        super(props)

        this.state = {     
            checkedAll: false,
        }
    }

    //First checksAll and then adds subCat using selectallsubsubcategories
    checkedAll = (whereToBePushed, ItemToBePushed, e) => {
        this.setState({
            checkedAll: !this.state.checkedAll,
        })
        this.props.selectallsubsubcategories(whereToBePushed, ItemToBePushed, e)
    }

    render() {

        //Performing a shallow copy of this.props object
        const filteredProps = { ...this.props };
        //Removing custom functional props as antd causes trouble with them
        ['selectallsubsubcategories', 'additem'].forEach(item => delete filteredProps[item])

        if (this.props.shouldreload === 'true') {
            return (
                <SubMenu {...filteredProps} title={this.props.sub.name} >
                    <Menu.Item><Checkbox onChange={(e) => this.checkedAll('subCategories', this.props.sub.id, e)}>Select All</Checkbox></Menu.Item>
                    {this.props.sub.sub_sub_category.map(subsub =>
                        this.state.checkedAll ? <Menu.Item key={subsub.name}><Checkbox onChange={(e) => this.props.additem('subSubCategories', subsub.id, e)} checked={false} disabled={this.state.checkedAll}>{subsub.name}</Checkbox></Menu.Item>
                            : <Menu.Item key={subsub.name}><Checkbox onChange={(e) => this.props.additem('subSubCategories', subsub.id, e)}>{subsub.name}</Checkbox></Menu.Item>)}
                </SubMenu>
            )
        } else {
            return (
                <SubMenu {...filteredProps} disabled key={this.props.sub.name} title={this.props.sub.name}>

                </SubMenu>

            )
        }
    }
}

export default SubSubCategory
