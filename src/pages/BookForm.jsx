import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";
import "../style.css";

export default function BookForm() {
    const [form, setForm] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            API.get(`/${id}`).then(res => setForm(res.data));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (id) {
            await API.put(`/${id}`, form);
        } else {
            await API.post("", form);
        }
        navigate("/");
    };

    return (
        <div className="container">
            <div className="form">
                <h2>{id ? "Sửa sách" : "Thêm sách"}</h2>

                <input name="title" placeholder="Title" value={form.title || ""} onChange={handleChange} />
                <input name="author" placeholder="Author" value={form.author || ""} onChange={handleChange} />
                <input name="category" placeholder="Category" value={form.category || ""} onChange={handleChange} />
                <input name="publisher" placeholder="Publisher" value={form.publisher || ""} onChange={handleChange} />
                <input name="publishedYear" placeholder="Year" value={form.publishedYear || ""} onChange={handleChange} />
                <input name="quantity" placeholder="Quantity" value={form.quantity || ""} onChange={handleChange} />
                <input name="imageUrl" placeholder="Image URL" value={form.imageUrl || ""} onChange={handleChange} />
                <textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange}></textarea>

                <button className="btn btn-add" onClick={handleSubmit}>Lưu</button>
            </div>
        </div>
    );
}