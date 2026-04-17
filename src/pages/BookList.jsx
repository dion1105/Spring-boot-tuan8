import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "../style.css";

export default function BookList() {
    const [books, setBooks] = useState([]);
    const [keyword, setKeyword] = useState("");

    // load dữ liệu
    const loadData = async () => {
        try {
            const res = await API.get();
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // xóa
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa không?")) {
            await API.delete(`/${id}`);
            loadData();
        }
    };

    // search
    const handleSearch = async () => {
        try {
            const res = await API.get(`/search?keyword=${keyword}`);
            setBooks(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            {/* HEADER */}
            <div className="header">
                <h2 className="title">📚 Quản lý sách</h2>

                <Link to="/add">
                    <button className="btn btn-add">+ Thêm sách</button>
                </Link>
            </div>

            {/* SEARCH */}
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm theo tên, tác giả..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="btn" onClick={handleSearch}>
                    Tìm
                </button>
            </div>

            {/* LIST */}
            <div className="card-container">
                {books.length === 0 ? (
                    <p>Không có dữ liệu</p>
                ) : (
                    books.map((b) => (
                        <div className="card" key={b.id}>
                            <img
                                src={b.imageUrl || "https://via.placeholder.com/150"}
                                alt={b.title}
                            />

                            <div className="card-body">
                                <div className="card-title">{b.title}</div>
                                <div className="card-author">{b.author}</div>

                                <div style={{ marginTop: 10 }}>
                                    <Link to={`/detail/${b.id}`}>Chi tiết</Link>
                                </div>

                                <div>
                                    <Link to={`/edit/${b.id}`}>
                                        <button className="btn btn-edit">Sửa</button>
                                    </Link>

                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(b.id)}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}