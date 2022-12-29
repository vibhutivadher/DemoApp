import React, { useState } from "react"

export default function (props) {

    let [authMode, setAuthMode] = useState("signin")

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            if (authMode == "signup") {
                localStorage.setItem(formData.username, JSON.stringify(formData));
                setAuthMode('signin')
            } else {
                const user = localStorage.getItem(formData.username);
                const userObj = JSON.parse(user);
                console.log(userObj)
                if (userObj?.username === formData.username && userObj?.password === formData.password) {
                    window.location.href = "/dashboard"
                    localStorage.setItem("isLoggedIn",true);
                } else {
                    setAuthMode('signup')
                }

            }
        }
    }


    const validate = () => {
        let input = formData;
        let errorsVal = {};
        let isValid = true;
        if (!input["username"]) {
            isValid = false;
            errorsVal["username"] = "Please enter user name.";
        }
        if (!input["password"]) {
            isValid = false;
            errorsVal["password"] = "Please enter your password.";
        }
        if (authMode == "signup") {
            if (!input["fullName"]) {
                isValid = false;
                errorsVal["fullName"] = "Please enter full name.";
            }

            if (!input["email"]) {
                isValid = false;
                errorsVal["email"] = "Please enter your email Address.";
            }

            if (typeof input["email"] !== "undefined") {

                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                if (!pattern.test(input["email"])) {
                    isValid = false;
                    errorsVal["email"] = "Please enter valid email address.";
                }
            }

            if (!input["confirmPassword"]) {
                isValid = false;
                errorsVal["confirmPassword"] = "Please enter your confirm password.";
            }

            if (typeof input["password"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {

                if (input["password"] != input["confirmPassword"]) {
                    isValid = false;
                    errorsVal["confirmPassword"] = "Passwords don't match.";
                }
            }

        }
        setErrors(errorsVal);

        return isValid;
    }


    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary cursor-pointer" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter Username"
                                name="username"
                                onChange={handleChange}
                            />
                            <div className="text-danger">{errors.username}</div>
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                name="password"
                                onChange={handleChange}
                            />
                            <div className="text-danger">{errors.password}</div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary cursor-pointer" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter username"
                            name="username"
                            onChange={handleChange}
                        />
                        <div className="text-danger">{errors.username}</div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter full name"
                            name="fullName"
                            onChange={handleChange}
                        />
                        <div className="text-danger">{errors.fullName}</div>
                    </div>

                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        <div className="text-danger">{errors.password}</div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            onChange={handleChange}
                        />
                        <div className="text-danger">{errors.confirmPassword}</div>
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name="email"
                            onChange={handleChange}
                        />
                        <div className="text-danger">{errors.email}</div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
