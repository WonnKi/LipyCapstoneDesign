import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
    const { bookId } = useParams();

    return (
        <div>
            책정보

        </div>
    );
};

export default BookDetail;
