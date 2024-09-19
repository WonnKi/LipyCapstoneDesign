import Nav from 'react-bootstrap/Nav';

function FillExample() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home"
         style={{
             backgroundColor: "#E0B88A"
         }}>
      <Nav.Item>
        <Nav.Link href="/FirstBookCase"
                  style={{
                      color:"black",
                      borderColor:"black"
                  }}>읽을책</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/SecondBookCase"
                  style={{
                      color:"black",
                      borderColor:"black"
                  }}>읽는책</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/ThirdBookCase"
                  style={{
                      color:"black",
                      borderColor:"black"
                  }}>읽은책</Nav.Link>
      </Nav.Item>

    </Nav>
  );
}

export default FillExample;