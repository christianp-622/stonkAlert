import React from 'react';
import Sidebar from '../components/Sidebar';
import "./About.css";
import Card from 'react-bootstrap/Card';
import { Container, ListGroup, ListGroupItem, CardDeck} from "react-bootstrap";
import Kevin from "../images/Kevin_Image.jpg"
import Ashray from "../images/Ashray_Image.jpg"
import Albert from "../images/Albert_Image.jpg"
import Christian from "../images/Christian_Image.jpg"
import Guan from "../images/Guan_Image.jpg"

 
const About = () => {
    return (
      <div className = "d-flex">
         <div>
            <Sidebar/>
         </div>
         <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
            <div style={{ height: "100%" }}>
               <div style={{ height: "calc(100% - 0px)", overflowY: "scroll" }}>
                  <div className="d-flex card-section">
                     <div className="cards-container">
                        <Container xl={3} className = "container">
                           <h1>About Stonk Alert</h1>
                           <CardDeck className = "deck">
                              <Card className = "description" text = "white">
                                 <Card.Body>
                                    <Card.Text>
                                          Stocks are slices of a company's ownership that grant their buyer partial ownership of that company. 
                                       People who participate in the stock market buy and sell stocks tactically to try and make as much money 
                                       as possible. They may try and buy stocks when shares, or slices of ownership, are low in price and then 
                                       wait to sell them when the price increases, when the company is notably successful and profitable. However, 
                                       the pricing patterns of some stocks seems to defy logic, spiking up and down almost arbitrarily in chains of 
                                       events whose origins are not even closely related to company success or previous stock trends. These stocks 
                                       gain much more public attention and become core elements of pop culture, attaining the title "meme stocks". 
                                       Stonk Alert is a website for tracking news, trends, providing information, and more on "meme stocks" and their
                                       companies. 
                                    </Card.Text>
                                 </Card.Body>
                              </Card>
                           </CardDeck>
                           <CardDeck className="deck">
                              <Card classname = "card" text = "white">
                                 <Card.Img className = "img" variant="top" src={Albert} />
                                 <Card.Body>
                                    <Card.Title>Albert Cho</Card.Title>
                                    <Card.Text>
                                       Albert is a mentor, researcher, and 3rd year Computer Science studnet at UT Austin. He works on developing the front end and back end for the website
                                       and is interested in Software Engineering, Machine Learning, and Data Science applications. Currently, Albert works as a computer science instructor
                                       for Juni Learning and is continuing his research on Autonomous Robotics and Learning Agents. 
                                    </Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                    <ListGroupItem>Commits: 14</ListGroupItem>
                                    <ListGroupItem>Issues: 7</ListGroupItem>
                                    <ListGroupItem>Tests: 0</ListGroupItem>
                                 </ListGroup>
                              </Card>
                              <Card classname = "card" text = "white">
                                 <Card.Img className = "img" variant="top" src= {Kevin} />
                                 <Card.Body>
                                    <Card.Title>Kevin Yang</Card.Title>
                                    <Card.Text>
                                       Kevin is a third-year Computer Science student at UT Austin. He works on developing the front end and back end for the website and is interested in
                                       Computer Vision, Software Development, and Machine Learning. Kevin has worked for many research and tech institutions in the past, and is interested
                                       in furthering his skillsets in these topics of interests.  
                                    </Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                    <ListGroupItem>Commits: 8</ListGroupItem>
                                    <ListGroupItem>Issues: 5</ListGroupItem>
                                    <ListGroupItem>Tests: 0</ListGroupItem>
                                 </ListGroup>
                              </Card>
                              <Card classname = "card" text = "white">
                                 <Card.Img className = "img" variant="top" src= {Guan} />
                                 <Card.Body>
                                    <Card.Title>Guan Lin Wee</Card.Title>
                                    <Card.Text>
                                       Guan is a Junior studying computer science at UT Austin. 
                                       He works on developing the front end and back end for the website and is interested in pursuing a career in software development
                                        and engineering. In his free time, he enjoys playing ultimate.
                                    </Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                    <ListGroupItem>Commits: 5</ListGroupItem>
                                    <ListGroupItem>Issues: 4</ListGroupItem>
                                    <ListGroupItem>Tests: 0</ListGroupItem>
                                 </ListGroup>
                              </Card>
                              <Card classname = "card" text = "white">
                                 <Card.Img className = "img" variant="top" src= {Ashray} />
                                 <Card.Body>
                                    <Card.Title>Ashray Desai</Card.Title>
                                    <Card.Text>
                                       Ashray is a third-year Computer Science student at UT Austin and Software Engineering Intern at Experian. He works on developing the front end and back end
                                       for the website and is interested in doing full stack development or machine learning work. In the future, Ashray hopes to develop products that create
                                       safety and ease for people with disabilities.
                                    </Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                       <ListGroupItem>Commits: 4</ListGroupItem>
                                       <ListGroupItem>Issues: 3</ListGroupItem>
                                       <ListGroupItem>Tests: 0</ListGroupItem>
                                 </ListGroup>
                              </Card>
                              <Card classname = "card" text = "white">
                                 <Card.Img className = "img" variant="top" src= {Christian} />
                                 <Card.Body>
                                    <Card.Title>Christian Pichardo</Card.Title>
                                    <Card.Text>
                                       Currently pursuring a Computer Science major and Entrepreneurship minor at UT Austin, Christian has a strong passion for solving complex engineering problems and enjoys learning about these topics. He works
                                       on developing the front end and back end for the website and is interested in ed-tech, 
                                       fin-tech, software engineering, data science, and web development. 
                                    </Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                    <ListGroupItem>Commits: 4</ListGroupItem>
                                    <ListGroupItem>Issues: 3</ListGroupItem>
                                    <ListGroupItem>Tests: 0</ListGroupItem>
                                 </ListGroup>
                              </Card>
                           </CardDeck>
                           <CardDeck className="deck">
                              <Card className = "card" text = "white">
                                 <Card.Body>
                                    <Card.Title>Total Commits</Card.Title>
                                    <Card.Text>35</Card.Text>
                                    <Card.Title>Total Issues</Card.Title>
                                    <Card.Text>22</Card.Text>
                                    <Card.Title>Total Tests</Card.Title>
                                    <Card.Text>0</Card.Text>
                                 </Card.Body>
                              </Card>
                              <Card className = "card" text = "white">
                                 <Card.Body>
                                    <Card.Title>Tools</Card.Title>
                                 </Card.Body>
                                 <ListGroup text = "white" className="list-group-flush listgroup">
                                       <ListGroupItem className = "listgroup" action href="https://cloud.google.com/gcp" rel="noopener noreferrer" target="_blank">Google Cloud Platform</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://www.postman.com/" rel="noopener noreferrer" target="_blank">Postman</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://code.visualstudio.com/" rel="noopener noreferrer" target="_blank">Visual Studio Code</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://getbootstrap.com/" rel="noopener noreferrer" target="_blank">Bootstrap</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://react-bootstrap.github.io/" rel="noopener noreferrer" target="_blank">React Bootstrap</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://flask.palletsprojects.com/en/2.0.x/" rel="noopener noreferrer" target="_blank">Flask</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://discord.com/" rel="noopener noreferrer" target="_blank">Discord</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://about.gitlab.com/" rel="noopener noreferrer" target="_blank">GitLab</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://www.namecheap.com/" rel="noopener noreferrer" target="_blank">NameCheap</ListGroupItem>
                                    </ListGroup>
                              </Card>
                              <Card className = "card" text = "white">
                                 <Card.Body><Card.Title>Resources</Card.Title></Card.Body>
                                 <ListGroup text = "white" className="list-group-flush listgroup">
                                    <ListGroupItem className = "listgroup" action href="https://gitlab.com/albertchokor/cs373-idb" rel="noopener noreferrer" target="_blank">Gitlab</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://gitlab.com/albertchokor/cs373-idb/-/wikis/Initial-Report" rel="noopener noreferrer" target="_blank">Gitlab Wiki</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://gitlab.com/albertchokor/cs373-idb/-/issues" rel="noopener noreferrer" target="_blank">Gitlab Issue Tracker</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://documenter.getpostman.com/view/16352153/TzecCkJB" rel="noopener noreferrer" target="_blank">Postman</ListGroupItem>
                                 </ListGroup>
                                 <Card.Body><Card.Title>APIs and Data Sources</Card.Title></Card.Body>
                                    <ListGroup text = "white" className="list-group-flush listgroup">
                                       <ListGroupItem className = "listgroup" action href="https://www.themuse.com/developers" rel="noopener noreferrer" target="_blank">The Muse - Information on company profiles</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://www.alphavantage.co/documentation/" rel="noopener noreferrer" target="_blank">Alpha Vantage - Realtime and historical stock data</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://newsapi.org/" rel="noopener noreferrer" target="_blank">News Api - Current and historical news articles</ListGroupItem>
                                       <ListGroupItem className = "listgroup" action href="https://www.styvio.com/" rel="noopener noreferrer" target="_blank">Styvio - Realtime and historical stock data and current stock sentiment</ListGroupItem>
                                    </ListGroup>
                              </Card>
                        </CardDeck>
                     </Container>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    );
}
 
export default About;