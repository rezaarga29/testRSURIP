import { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

export default function FormAddEdit() {
  const [input, setInput] = useState({
    Nama: "",
    Tgl_Lahir: "",
    Gaji: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      async function fetchKaryawanById() {
        try {
          let { data } = await axios({
            method: "get",
            url: `http://localhost:3000/karyawan/${id}`,
            headers: {
              Authorization: `Bearer ${localStorage.access_token}`,
            },
          });
          setInput({
            Nama: data.Nama,
            Tgl_Lahir: data.Tgl_Lahir,
            Gaji: data.Gaji,
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
      }
      fetchKaryawanById();
    }
  }, [id]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      let response = await axios({
        method: id ? "put" : "post",
        url: id
          ? `http://localhost:3000/karyawan/${id}`
          : "http://localhost:3000/karyawan",
        data: { ...input }, // Kirim data yang telah diinput

        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      let message = response.data.message;
      Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/homepage");
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

  return (
    <>
      <div
        className="bg-white bg-opacity-75"
        style={{
          marginLeft: 300,
          marginRight: 300,
          padding: 30,
          borderRadius: 10,
        }}
      >
        <form onSubmit={handleForm}>
          <div className="mb-3 bg-opacity-50">
            <label htmlFor="Nama" className="form-label">
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              id="Nama"
              name="Nama"
              value={input.Nama}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Tgl_Lahir" className="form-label">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="form-control"
              id="Tgl_Lahir"
              name="Tgl_Lahir"
              value={input.Tgl_Lahir}
              onChange={handleChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Gaji" className="form-label">
              Gaji
            </label>
            <input
              type="number"
              className="form-control"
              id="Gaji"
              name="Gaji"
              value={input.Gaji}
              onChange={handleChangeInput}
            />
          </div>
          <Button />
        </form>
      </div>
    </>
  );
}
