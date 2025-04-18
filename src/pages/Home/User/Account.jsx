import React, { useEffect, useState } from 'react';
import "./Account.css";
import signIn from "../../../assets/images/signin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, ResetUserAlert } from '../../../redux/actions/UserActions';
import toast from 'react-hot-toast';

export default function Account({ status = "register" }) {
    const dispatch = useDispatch();
    const { success, error } = useSelector((state) => state.UserReducer);
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_role: '2' // Default role
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (success === "Login successful!") {
            navigate('/home');
        }
        if (error) {
            toast.error(`Error: ${error}`);
            dispatch(ResetUserAlert());
        } else if (success) {
            toast.success(success);
            if (success === "Register successful!") {
                navigate('/login');
            }
            dispatch(ResetUserAlert());
        }
    }, [error, success, navigate, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (status === "register") {
            if (formData.user_repassword !== formData.user_password) {
                alert("Mật khẩu nhập lại không khớp")
            }
            else {
                dispatch(
                    registerUser(formData)
                )
            }
        } else {

            dispatch(loginUser(formData.user_name, formData.user_password));

        }
    }


    let content;
    if (status === "register") {
        content = <>
            <input
                className="form__input"
                type="password"
                name="user_repassword"
                id="user_repassword"
                placeholder="Re Password"
                onChange={handleChange}

            />
            <div className="account__status">
                <div className="button__container">
                    <div className="form__checkbox">
                        <a>Forgot Password</a>
                    </div>
                    <button className="form__button">SIGN IN</button>
                </div>
                <Link to="/login" className="link__register">
                    Login here
                </Link>
            </div>
        </>;
    } else {
        content = <>
            <div className="account__status">
                <div className="button__container">
                    <div className="form__checkbox">
                        <input
                            type="checkbox"
                            name="btn__remember"
                            id="btn__remember"
                        />
                        <label for="btn__remember">Remember me</label>
                    </div>
                    <button className="form__button">SIGN IN</button>
                </div>
                <Link to="/register" className="link__register">
                    Register here
                </Link>
            </div>
        </>;
    }
    return (
        <div className="account__container">
            <img src={signIn} className="account__img"></img>
            <div className="account__main">
                <Link to="/" className="back__btn">
                    &larr; Back to home
                </Link>
                <div className="account__title">
                    <h1>Perfect for Startups, freelancers & companies.</h1>
                    <p>Specially crafted for the people who care about design.</p>
                </div>
                <div className="account__form">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form__input"
                            type="text"
                            name="user_name"
                            value={formData.form_username}
                            onChange={handleChange}
                            required
                            id="user_name"
                            placeholder="Username"
                        />
                        <input
                            className="form__input"
                            type="password"
                            name="user_password"
                            value={formData.form_password}
                            onChange={handleChange}
                            required
                            id="user_password"
                            placeholder="Password"
                        />
                        {content}
                    </form>
                </div>
            </div>
        </div>
    );
}
