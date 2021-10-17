import React from 'react'
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Header } = Layout;

export default function MyHeader() {
  return (
    <Header>
      <div className="logo" >
      </div>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1"><Link to="/homepage">Ecommerce</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/shop">Shop</Link></Menu.Item>
        <Menu.Item key="3"> <Link to="/about"> About </Link> </Menu.Item>
      </Menu>
    </Header>
  )
}
