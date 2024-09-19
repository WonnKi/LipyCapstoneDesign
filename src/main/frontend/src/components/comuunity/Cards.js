import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function BasicExample() {
    return (
        <Card style={{ width: '18rem', margin: 20 }}>
            <Card.Img variant="top" src="https://velog.velcdn.com/images/whatever/post/84ac7c9c-0ff7-4276-8a5f-aeba6344640e/image.png" />
            <Card.Body>
                <Card.Title>제목</Card.Title>
                <Card.Text>
                    내용-------------------------------------------------
                    -------------------
                    ---------------------------
                </Card.Text>

            </Card.Body>
        </Card>
    );
}

export default BasicExample;