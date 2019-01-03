import React, { Component } from 'react';

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    createCategory(category) {
        console.log(category);
        return (
        <li>
            <label>{category.title}</label>
            <select name={category.title} multiple="">
            {
                category.options.map(
                    (element) => {
                        return <option>{element}</option>;
                    }
                )
            }
            </select>
        </li>
        );
    }

    render() {
        return (
            <ul>
                {
                    this.props.categories.map(category => {
                        return this.createCategory(category);
                    })
                }
            </ul>
        );
    }
}

export default SideBar;