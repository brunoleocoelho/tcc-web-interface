import React from 'react'
import { Link } from 'react-router-dom'
import './ItemSuggestionCustom.css'

function ItemSuggestionCustom({ book }) {
    return (
        <Link to={`/livros/info/${book.id}/view`} className="item-suggest-custom">
            <div className="row">
                <div className="col-2">
                    <img src={book.image_url} width={44} alt={book.title} />
                </div>
                <div className="col-10">
                    <div>
                        <p>{ book.title }</p>
                        <p><small>{ book.subtitle }</small></p>
                        <small>{ book.author }</small>
                    </div>
                    <hr />
                </div>
            </div>
        </Link>
    )
}

export default ItemSuggestionCustom
