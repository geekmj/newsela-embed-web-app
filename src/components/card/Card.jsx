import React from 'react'
import {Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody
  } from 'reactstrap';
import img1 from "../../assets/images/download1.jpg"  

function Card1(){
    return (
        <div className="my-5">
        <div className="container">
        <CardDeck>
          <Card>
              <CardImg top width="100%" src={img1} alt="Card image cap" />
               <CardBody>
                 <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                       <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                         <Button>Button</Button>
                </CardBody>
          </Card>
          <Card>
              <CardImg top width="100%" src={img1} alt="Card image cap" />
               <CardBody>
                 <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                       <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                         <Button>Button</Button>
                </CardBody>
          </Card>
          <Card>
              <CardImg top width="100%" src={img1} alt="Card image cap" />
               <CardBody>
                 <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                       <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                         <Button>Button</Button>
                </CardBody>
          </Card>
        </CardDeck>
    </div>
   </div>
    )
}

export default Card1
