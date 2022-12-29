import React, { useState } from "react"

export default function (props) {
    return (
        <React.Fragment>
            <div className="">
                <h1>Todo list</h1>
                <button type="button " className="btn btn-primary text-right">Add</button>
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>
                                <button type="button" className="btn btn-info mr-1">Edit</button> &nbsp;&nbsp;
                                <button type="button" className="btn btn-dark">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}