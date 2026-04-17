import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api";
import "../style.css";

export default function BookDetail() {
    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        API.get(`/${id}`).then(res => setBook(res.data));
    }, [id]);

    return (
        <div className="container">
            <div className="detail">
                <img src={book.imageUrl} alt={book.title} />

                <h2>{book.title}</h2>
                <p><b>Tác giả:</b> {book.author}</p>
                <p><b>Thể loại:</b> {book.category}</p>
                <p><b>Nhà XB:</b> {book.publisher}</p>
                <p><b>Năm:</b> {book.publishedYear}</p>
                <p><b>Mô tả:</b> {book.description}</p>

                <Link to="/">⬅ Quay lại</Link>
            </div>
        </div>
    );
}