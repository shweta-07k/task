import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, getUserAction, registerUserAction, updateUserAction } from '../redux/actions/userActions'
import { toast } from 'react-toastify'
import { invalidate } from '../redux/slice/userSlice'
import { useFormik } from "formik"
import * as yup from "yup"
const Users = () => {
    const [selectedUser, setSelectedUser] = useState()
    const { loading, updated, deleted, error, users, registered } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            mobile: "",
        },
        validationSchema: yup.object({
            firstName: yup.string().required("Please Fill Your First Name"),
            lastName: yup.string().required("Please Fill Your Last Name"),
            address: yup.string().required("Please Fill Your Adress"),
            mobile: yup.string().matches(/^[8-9]{1}[0-9]{9}$/, "Please Enter Valid Mobile Number")
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(registerUserAction(values))
            resetForm()
        }
    })
    const editformik = useFormik({
        enableReinitialize: true,
        initialValues: {
            _id: selectedUser && selectedUser._id,
            firstName: selectedUser && selectedUser.firstName,
            address: selectedUser && selectedUser.address,
            lastName: selectedUser && selectedUser.lastName,
            mobile: selectedUser && selectedUser.mobile,
        },
        validationSchema: yup.object({
            firstName: yup.string().required("Please Fill Your First Name"),
            lastName: yup.string().required("Please Fill Your Last Name"),
            address: yup.string().required("Please Fill Your Address"),
            mobile: yup.string().matches(/^[8-9]{1}[0-9]{9}$/, "Please Enter Valid Mobile Number")
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(updateUserAction(values))
        }
    })

    useEffect(() => {
        dispatch(getUserAction())

        if (updated) {
            toast.success("User Update Successfully")
            dispatch(invalidate(["updated"]))
        } else if (deleted) {
            toast.success("User Deleted Successfully")
            dispatch(invalidate(["deleted"]))
        } else if (error) {
            toast.error(error)
            dispatch(invalidate(["error"]))
        } else if (registered) {
            toast.success("User Register Successfully")
            dispatch(invalidate(["registered"]))
        }

    }, [updated, deleted, error, registered])

    useEffect(() => {
        if (formik.errors.firstName || formik.errors.lastName || formik.errors.address || formik.errors.mobile) {
            toast.error(formik.errors.firstName || formik.errors.lastName || formik.errors.address || formik.errors.mobile)
        }
    }, [formik.errors])
    const handleDelete = () => {
        dispatch(deleteUserAction(selectedUser))
    }

    const USER_TABLE = <>
        {
            users && users.length === 0
                ? <h1 className='fs-1 text-center'>No Users Found</h1>
                : <div className='table-responsive mt-3'>
                    <table class="table table-primary table-striped table-hover">
                        <thead>
                            <tr>
                                <th >#</th>
                                <th >First Name</th>
                                <th >Last Name</th>
                                <th >Address</th>
                                <th >Mobile</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((item, i) => <tr key={item._id}>
                                    <td>{i + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.mobile}</td>
                                    <td>
                                        <button
                                            onClick={e => setSelectedUser(item)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#editModal"
                                            type="button"
                                            class="btn btn-warning btn-sm mx-3">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            onClick={e => setSelectedUser(item)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteModal"
                                            type="button"
                                            class="btn btn-danger btn-sm">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
        }
    </>

    if (loading) return <div class="spinner-border text-primary"></div>

    return <div className="container">


        <div className='text-end my-2'>
            <button type="button" className="btn btn-lg btn-primary" data-bs-toggle="modal" data-bs-target="#addUser">+Add User</button>
        </div>
        {USER_TABLE}


        {/* add user modal start */}
        <div class="modal fade" id="addUser" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div class="modal-body">
                            <div>
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input
                                    {...formik.getFieldProps("firstName")}
                                    type="text" className="form-control" id="fname" placeholder="Enter Your First Name" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-4'>
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input
                                    {...formik.getFieldProps("lastName")}
                                    type="text" className="form-control" id="lname" placeholder="Enter Your First Name" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-4'>
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    {...formik.getFieldProps("address")}
                                    type="text" className="form-control" id="address" placeholder="Enter Your Address" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-4'>
                                <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                <input
                                    {...formik.getFieldProps("mobile")}
                                    type="text" className="form-control" id="mobile" placeholder="Enter Your Mobile" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='text-end'>

                                <button data-bs-dismiss="modal" type="submit" class="btn btn-lg btn-primary mx-3">Add User</button>
                                <button data-bs-dismiss="modal" type="button" class="btn btn-lg btn-outline-success">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {/* add user modal end */}

        {/* delete modal start */}

        <div class="modal fade border-2 border-danger" id="deleteModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h6 className='text-danger'>Are you sure you want to delete?</h6>
                    </div>
                    <div className='modal-footer '>

                        <button type="button" class="btn  btn-outline-success" data-bs-dismiss="modal">Don't Delete Close</button>
                        <button onClick={handleDelete} type="button" class="btn  btn-danger mx-2" data-bs-dismiss="modal">Yes Delete</button>
                    </div>
                </div>
            </div>
        </div>

        {/* delete modal end */}

        {/* eidt user modal start */}
        <div class="modal fade" id="editModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={editformik.handleSubmit}>
                        <div class="modal-body">
                            <div>
                                <label htmlFor="fname" className="form-label">First Name</label>
                                <input
                                    {...editformik.getFieldProps("firstName")}
                                    type="text" className="form-control" id="fname" placeholder="Enter Your First Name" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-4'>
                                <label htmlFor="lname" className="form-label">Last Name</label>
                                <input
                                    {...editformik.getFieldProps("lastName")}
                                    type="text" className="form-control" id="lname" placeholder="Enter Your First Name" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-4'>
                                <label htmlFor="address" className="form-label">Address</label>
                                <input
                                    {...editformik.getFieldProps("address")}
                                    type="text" className="form-control" id="address" placeholder="Enter Your Address" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='my-4'>
                                <label htmlFor="mobile" className="form-label">Mobile Number</label>
                                <input
                                    {...editformik.getFieldProps("mobile")}
                                    type="text" className="form-control" id="mobile" placeholder="Enter Your Mobile" />
                                <div className="valid-feedback">Looks good!</div>
                                <div className="invalid-feedback">Please choose a username.</div>
                            </div>
                            <div className='text-end'>

                                <button data-bs-dismiss="modal" type="submit" class="btn btn-lg btn-primary mx-3">Edit User</button>
                                <button data-bs-dismiss="modal" type="button" class="btn btn-lg btn-outline-success">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {/* edit user modal end */}

    </div>

}

export default Users