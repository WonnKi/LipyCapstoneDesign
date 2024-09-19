import React from 'react';

function Case({ book }) {
    return (
        <div>
            {book && (
                <div>
                    <img className={'Books'} src={book.image} alt={book.title} />
                </div>
            )}
        </div>
    );
}

export default Case;
