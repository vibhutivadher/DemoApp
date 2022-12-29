import React, { useState } from "react"

export default function (props) {
    const logout = () => {
        localStorage.setItem("isLoggedIn", false);
        window.location.href = "/login"
    }
    let [isAddTodo, setIsAddTodo] = useState(false)
    let [list, setList] = useState([])
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [updatedIndex, setUpdatedIndex] = useState();
    

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            let temp = list;
            temp.push(formData)
            setList(temp)
            setIsAddTodo(false)
        }
    }

    const validate = () => {
        let input = formData;
        let errorsVal = {};
        let isValid = true;
        if (!input["title"]) {
            isValid = false;
            errorsVal["title"] = "Please enter title.";
        }
        if (!input["description"]) {
            isValid = false;
            errorsVal["description"] = "Please enter description.";
        }

        setErrors(errorsVal);

        return isValid;
    }

    const addTodo = () => {
        setIsAddTodo(true)
    }

    const update = (key) => {
        let temp = list.filter(index => index == key);
        console.log("*****",temp)
        setIsAddTodo(true)
        setFormData({...temp})
    }
    const handleChange = ({ target }) => {
        console.log(target)
        setFormData({ ...formData, [target.name]: target.value });
    }

    return (
        isAddTodo ?
            <React.Fragment>
                <div className="Auth-form-container">
                    <form className="Auth-form" onSubmit={handleSubmit}>
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Add Todo</h3>
                            <div className="form-group mt-3">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                <div className="text-danger">{errors.title}</div>
                            </div>
                            <div className="form-group mt-3">
                                <label>Description</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="Enter description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                <div className="text-danger">{errors.description}</div>
                            </div>
                            <div className="form-group mt-3">
                                <label>Status</label>
                                <select className="form-select" onChange={handleChange} name="status">
                                    <option value="Complete">Complete</option>
                                    <option value="Incomplete">Incomplete</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </React.Fragment>
            :
            <React.Fragment>
                <h1 className="text-center">Todo list</h1>
                <div className="text-right">
                    <button type="button" className="btn btn-primary" onClick={addTodo}>Add</button>&nbsp;
                    <button type="button" className="btn btn-warning" onClick={logout}>Logout</button>
                </div>
                <div>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Task title</th>
                                <th scope="col">Task Description</th>
                                <th scope="col">Task status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list?.map((data,key) => 
                                    <tr>
                                        <th scope="row">{key+1}</th>
                                        <td>{data.title}</td>
                                        <td>{data.description}</td>
                                        <td>{data.status}</td>
                                        <td>
                                            <button type="button" className="btn btn-info mr-1" onClick={()=>update(key)}>Edit</button> &nbsp;&nbsp;
                                            <button type="button" className="btn btn-dark">Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
    )
}