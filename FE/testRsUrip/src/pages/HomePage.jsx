import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function UserPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await axios({
          method: "get",
          url: "http://localhost:3000/karyawan",
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/karyawan/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setEmployees(employees.filter((employee) => employee.id !== id));
      Swal.fire({
        title: "Deleted!",
        text: "Your record has been deleted.",
        icon: "success",
      });
    } catch (error) {
      console.log(error.response.data.error);
      let errMsg = error.response.data.error;
      Swal.fire({
        title: "Error",
        text: errMsg,
        icon: "error",
      });
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  return (
    <>
      <div style={{ marginLeft: 100, marginRight: 100 }}>
        <h1 className="display-5 text-center text-light">Employees</h1>
        <table className="table opacity-80">
          <thead className="table-secondary">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Salary</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{employee.Nama}</td>
                <td>{employee.Tgl_Lahir}</td>
                <td>{employee.Gaji}</td>
                <td>
                  <span className="d-flex">
                    <Link to={`/employee/edit/${employee.id}`} className="ms-3">
                      <span className="icon material-symbols-outlined text-danger">
                        edit
                      </span>
                    </Link>
                    <button
                      onClick={() => confirmDelete(employee.id)}
                      className="btn btn-link ms-3"
                    >
                      <span className="icon material-symbols-outlined text-danger">
                        delete
                      </span>
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
