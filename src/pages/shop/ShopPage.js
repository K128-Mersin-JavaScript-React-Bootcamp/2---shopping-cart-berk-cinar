import React, { useState, useEffect, useContext } from 'react'
import { Layout, Button, Card, Select } from 'antd';
import { Row, Col, Checkbox, List } from 'antd';
import { Typography } from 'antd';
import { useHistory, Link } from "react-router-dom";
import { BookContext } from "../../App";
export default function ShopPage() {
  const { Title, Paragraph } = Typography;
  const { Meta } = Card;

  const [selectedSort, setSelectedSort] = useState('mostPopular');
  const context = useContext(BookContext);

  const { Content, Sider } = Layout;
  let history = useHistory();
  const [isAllFiltersCleared, setIsAllFiltersCleared] = useState(true);
  const [categoryList, setCategoryList] = useState([])
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({})
  const sortList = [
    {
      name: 'mostPopular',
      description: 'Most Popular'
    },
    {
      name: 'leastPopular',
      description: 'Least Popular'
    },
    {
      name: 'highestPrice',
      description: 'Highest Price'
    },
    {
      name: 'lowestPrice',
      description: 'Lowest Price'
    },
  ];


  useEffect(() => {
    fetch('http://localhost:3004/products')
      .then(res => res.json())
      .then(json => handleData(json))
  }, [])

  const handleData = (data) => {
    handleCategoryList(data);
    setProducts(data);
  }
  const handleCategoryList = (data) => {
    const categorySet = new Set()
    data.forEach((v, i) => {
      categorySet.add(v.category)
    })
    setCategoryList(categorySet);
  }

  const totalCartCount = context.state.cart.reduce(
    (total, book) => (total = total + book.count),
    0
  );

  const handleCheckbox = ({ target }) => {
    const filterName = target.name;
    const isChecked = target.checked;
    const newFilters = { ...filter, [filterName]: isChecked };
    let isAllFiltersCleared = true;
    for (const filter in newFilters) {
      if (newFilters[filter]) {
        isAllFiltersCleared = false;
      }
    }
    setIsAllFiltersCleared(isAllFiltersCleared);
    setFilter(newFilters);
  }

  const handleDataSource = () => {
    let tempShowingProducts;
    if (isAllFiltersCleared) {
      tempShowingProducts = products;
    } else {
      tempShowingProducts = products.filter(product => filter[product.category])
    }

    return handleSortData(tempShowingProducts);
  }

  const handleSortData = (data) => {
    if (selectedSort === 'mostPopular') {
      return data.sort((a, b) => a.rating.rate > b.rating.rate ? -1 : 1);
    } else if (selectedSort === 'leastPopular') {
      return data.sort((a, b) => a.rating.rate > b.rating.rate ? 1 : -1);
    } else if (selectedSort === 'highestPrice') {
      return data.sort((a, b) => a.price > b.price ? -1 : 1);
    } else if (selectedSort === 'lowestPrice') {
      return data.sort((a, b) => a.price > b.price ? 1 : -1);
    }
  }

  const handleClearFilters = () => {
    setFilter({});
    setIsAllFiltersCleared(true);
  }

  const handleCheckedItem = (categoryName) => {
    return filter[categoryName];
  }

  const handleSelect = (selected) => {
    setSelectedSort(selected);
  }

  const onSubmit = () => {
    history.push(
      '/product')
  }

  return (

    <Content>
      <Row align="top">
        <Col >
          <div style={{ paddingBlock: 20 }}>

            <Title level={2}>Shop Men's</Title>
            <Paragraph >
              Revamp your style Aenean gravida sapien non dolor iaculis, ut bibendum lorem pellentesque. Ut auctor maximus convallis. Orci varius natoque penatibus et magnis dis parturient montes, n metus in, eleifend dictum libero. Suspendisse consequat velit sit amet vulputate rutrum. Ut porta venenat
            </Paragraph>
            <Link to="/cart" style={{ color: "black", fontWeight: "bolder" }}>
              Cart({totalCartCount})
            </Link>
          </div>

          <Layout>
            <Sider theme={'light'}>
              <List
                header={<div> <h2> Filters </h2>

                </div>}
                bordered
                dataSource={categoryList}
                renderItem={item => (
                  <List.Item>
                    <Checkbox name={item}
                      onChange={handleCheckbox} checked={handleCheckedItem(item)}>{item}</Checkbox>

                  </List.Item>

                )}

              />
              <Button style={{ margin: "5px" }} onClick={handleClearFilters}>Clear Filters</Button>
            </Sider>
            <Content>
              <div style={{ alignItems: 'flex-end', textAlign: 'end' }}>
                Sort By
                <Select defaultValue={selectedSort} onSelect={handleSelect}>
                  {
                    sortList.map(sort => <Select.Option value={sort.name}>{sort.description}</Select.Option>)
                  }
                </Select>
                <br />
                Showing {handleDataSource().length} Products
              </div>
              <Col span={20} offset={2} >

                <List
                  grid={{ column: 4 }}
                  dataSource={handleDataSource()}
                  renderItem={item => {
                    return (
                      <List.Item>
                        <Card
                          onClick={onSubmit}
                          hoverable
                          style={{ width: 240 }}
                          cover={<img alt="example" style={{ height: "30vh", width: '100%' }} src={item.image} />}
                        >
                          <Meta title={item.title} description={`${item.price} TL`} />
                          <span>{item.rating.rate} - {item.rating.count} değerlendirme</span>
                        </Card>
                      </List.Item>
                    )
                  }}
                />
              </Col>
            </Content>
          </Layout>

        </Col>
      </Row>
    </Content>
  )
}
