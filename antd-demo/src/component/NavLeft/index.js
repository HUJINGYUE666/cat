import React, { Component } from 'react'
import { Menu ,Icon} from 'antd';
import menuList from './../../config/menuconfig'
import './index.css';

const { SubMenu } = Menu;

export default class NavLift extends Component {
    createMenu = (menuList) => {
        return menuList.map((elem) => {
            if(elem.children){
                return (
                    <SubMenu key={elem.path} title={<span><Icon type={elem.icon}></Icon>{elem.title}</span>}>
                        {this.createMenu(elem.children)}
                    </SubMenu>     
                )
            }
            return (
                <Menu.Item key={elem.path}>
                    {elem.icon?<Icon type={elem.icon}></Icon>:null}
                    {/* <Icon type={elem.icon}></Icon> */}
                    {elem.title}
                </Menu.Item>     
            )
        })
        // let list = menuList.map((elem) => {
        //     return (
        //         <Menu.Item>
        //             <Icon type={elem.icon}></Icon>
        //             {elem.title}
        //         </Menu.Item>     
        //     )
        // })
        // this.setState({
        //     list
        // })
    }
    componentWillMount = () => {
        let list = this.createMenu(menuList);
        this.setState({
            list
        })
    }  
    render() {
        return (
            <div>
                <div className="logobox">
                    <img src="/imgs/logo.png"/>
                </div>
                <Menu theme='dark' mode='inline' defaultOpenKeys={['/admin/student']}>
                    {this.state.list}
               </Menu>
            </div>
        )
    }
}