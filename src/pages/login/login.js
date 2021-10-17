import React from 'react'
import { Row, Col, Input, Button } from "antd";
import "./styles-loginlayout.css";
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

function Login() {
    const history = useHistory();

    function onSubmit2() {
        history.push("/homepage");
    }

    return (
        <div className="loginLayout">
            <Row justify="center">
                <Col className="firstCol" span={8}>
                    {/*  <img className="logo" src="/facebook.svg" /> <br /> */}
                    <span className="text"> Shop app helps you connect and share <br /> with the people in your life. </span>
                </Col>
                <Col span={4}>
                    <div className="table">
                        <Input className="input" placeholder="Email address or phone number" />
                        <Input className="input" placeholder="Password" />
                        <Button className="button" onClick={onSubmit2} > Log in </Button>
                        <Link className="sifre"> Forgotten password ? </Link>
                        <hr className="hr" />
                        <Button className="button2"> Create new account </Button>
                    </div>
                    <div className="buttext">
                        <div className="create"> Create a Page </div>
                        <h7>   for a celebrity, band or business.</h7>
                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default Login;
