import React from 'react';
import Sidebar from '../components/Sidebar';
import "./About.css";
import Card from 'react-bootstrap/Card';
import { Container, ListGroup, ListGroupItem, CardDeck} from "react-bootstrap";
import { useEffect, useState } from 'react';
import Kevin from "../images/Kevin_Image.jpg"
import Ashray from "../images/Ashray_Image.jpg"
import Albert from "../images/Albert_Image.jpg"
import Christian from "../images/Christian_Image.jpg"
import Guan from "../images/Guan_Image.jpg"
import logo from '../images/stonkalertlogo.png';
import Button from 'react-bootstrap/Button'

 
const About = () => {
   const GITLAB_ISSUES_API = "https://gitlab.com/api/v4/projects/27576968/issues?per_page=1000";
   const GITLAB_COMMITS_API = "https://gitlab.com/api/v4/projects/27576968/repository/commits?per_page=1000";
   const [commit, setCommits] = useState([0, 0, 0, 0, 0]);
   const [issue, setIssues] = useState([0, 0, 0, 0, 0]);
   let totalCommits = 0;
   let totalIssues = 0;

   useEffect(() => {
      const parse_Commits_Issues = async () => {
         let commits = [0, 0, 0, 0, 0, 0]
         let issues = [0, 0, 0, 0, 0, 0]

         const response_commit = await fetch(GITLAB_COMMITS_API);
         const all_commits = await response_commit.json();
         all_commits.forEach((commit) => {
            let name = commit['author_name'];
            if (name === "Kevin Yang") {
               commits[0] += 1;
            } else if (name === "Albert Cho") {
               commits[1] += 1;
            } else if (name === "ashraydesai") {
               commits[2] += 1;
            } else if (name === "christianp-622") {
               commits[3] += 1;
            } else if (name === "Guan Lin Wee") {
               commits[4] += 1;
            }
            commits[5] += 1;
         })
         setCommits(commits);
         totalCommits = commits[5];

         const response_issue = await fetch(GITLAB_ISSUES_API);
         const all_issues = await response_issue.json();
         all_issues.forEach((issue) => {
           let name = issue['author']['name'];
           if (name === "Kevin Yang") {
                 issues[0] += 1;
           } else if (name === "Albert Cho") {
                 issues[1] += 1;
           } else if (name === "Ashray Desai") {
                 issues[2] += 1;
           } else if (name === "christianp-622") {
                 issues[3] += 1;
           } else if (name === "guanlin-w") {
                 issues[4] += 1;
           }
           issues[5] += 1;
         })
         setIssues(issues);
         totalIssues = issues[5];
      };
      parse_Commits_Issues();
   });

    return (
      <div className = "d-flex">
         <div>
            <Sidebar/>
         </div>
         <div style={{ flex: "1 1 auto", display: "flex", flexFlow: "column", height: "100vh", overflowY: "hidden" }}>
            <div style={{ height: "100%" }}>
               <div style={{ height: "calc(100% - 0px)", overflowY: "scroll" }}>

                     <div className="cards-container">
                        <Container xl={3} className = "container" align = "center">
                           
                           <CardDeck className = "deck">
                              <Card className = "description" text = "white">
                                 <Card.Body>
                                 <h1 className="text-light">About Stonk Alert</h1>
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
                                       Albert is a mentor, researcher, and 3rd year Computer Science student at UT Austin. He works on developing the front end and back end for the website
                                       and is interested in Software Engineering, Machine Learning, and Data Science applications. Currently, Albert works as a computer science instructor
                                       for Juni Learning and is continuing his research on Autonomous Robotics and Learning Agents. 
                                    </Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                    <ListGroupItem>Commits: {commit[1]}</ListGroupItem>
                                    <ListGroupItem>Issues: {issue[1]}</ListGroupItem>
                                    <ListGroupItem>Tests: 3</ListGroupItem>
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
                                    <ListGroupItem>Commits: {commit[0]}</ListGroupItem>
                                    <ListGroupItem>Issues: {issue[0]}</ListGroupItem>
                                    <ListGroupItem>Tests: 3</ListGroupItem>
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
                                    <ListGroupItem>Commits: {commit[4]}</ListGroupItem>
                                    <ListGroupItem>Issues: {issue[4]}</ListGroupItem>
                                    <ListGroupItem>Tests: 30</ListGroupItem>
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
                                       <ListGroupItem>Commits: {commit[2]}</ListGroupItem>
                                       <ListGroupItem>Issues: {issue[2]}</ListGroupItem>
                                       <ListGroupItem>Tests: 3</ListGroupItem>
                                 </ListGroup>
                              </Card>
                              <Card className = "card" text = "white">
                              <Card.Img width='100%' className = "img" variant="top" src= {logo} />
                                 <Card.Body>
                                    <Card.Title>Total Commits</Card.Title>
                                    <Card.Text>{commit[5]}</Card.Text>
                                    <Card.Title>Total Issues</Card.Title>
                                    <Card.Text>{issue[5]}</Card.Text>
                                    <Card.Title>Total Tests</Card.Title>
                                    <Card.Text>60</Card.Text>
                                 </Card.Body>
                                 <ListGroup className="list-group-flush">
                                       <ListGroupItem>Unit Tests</ListGroupItem>
                                       <ListGroupItem>Models, DB, API Calls, Postman</ListGroupItem>
                                       <ListGroupItem><Button href="/api/tests" variant="outline-dark">Run All Tests</Button>{' '}</ListGroupItem>
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
                                    <ListGroupItem>Commits: {commit[3]}</ListGroupItem>
                                    <ListGroupItem>Issues: {issue[3]}</ListGroupItem>
                                    <ListGroupItem>Tests: 21</ListGroupItem>
                                 </ListGroup>
                              </Card>
                           </CardDeck>
                           
                           <CardDeck className="deck">
                           <Card className = "card" text = "white">
                                 <Card.Body>
                                    <Card.Title>IEX Cloud API</Card.Title>
                                    <ListGroup text = "white" className="list-group-flush listgroup">
                                       <ListGroupItem className = "listgroup" action href="https://iexcloud.io/" rel="noopener noreferrer" target="_blank">Provides financial data. 
                                       To scrape data for our stocks, news, and companies in create_db.py, we sent timed (for rate limit) stock quote, stock news, and company overview requests using the Python requests HTTP library and json() conversion method to get information on attributes for all of our models in json dictionary and list formats. From the data fetched, we then accessed attributes like stock price, sector, and volume for the stock model;
                                       company name, ceo, number of employees, industry, website, and company description for the company model; and headline, datetime, source, link, and summary for each article model. </ListGroupItem>
                                    </ListGroup>
                                 </Card.Body>

                              </Card>
                              <Card className = "card" text = "white">
                                 <Card.Body>
                                    <Card.Title>Finnhub API</Card.Title>
                                    <ListGroup text = "white" className="list-group-flush listgroup">
                                       <ListGroupItem className = "listgroup" action href="https://finnhub.io/" rel="noopener noreferrer" target="_blank">Provides real time data on stocks, currencies, and crypto. To scrape the tickers of many stocks in create_db.py, we sent timed (for rate limit) requests using the Python requests HTTP library and json() conversion method 
                                       to get a json list of ticker symbols for stocks in the NYSE, where all the meme stocks come from. We then accessed this json list and iterated through each stock symbol to provide our models the ticker symbol attribute. We also use this attribute as the
                                       primary key for the stock and company models.</ListGroupItem>
                                    </ListGroup>
                                 </Card.Body>

                              </Card>
                              <Card className = "card" text = "white">
                                 <Card.Body>
                                    <Card.Title>Styvio API</Card.Title>
                                    <ListGroup text = "white" className="list-group-flush listgroup">
                                       <ListGroupItem className = "listgroup" action href="https://www.styvio.com/" rel="noopener noreferrer" target="_blank">Provides real time information on stock chat, fundamental and technical data, and social sentiment. Since
                                       To scrape data for our stocks in create_db.py, we sent timed (for rate limit) requests using the Python requests HTTP library and json() conversion method to get information for each stock in terms of a json dictionary of labeled data, and accessed its tradescores and investscores to add to our stock models. This provided our users with information
                                       on social sentiment for each instance of our stock model. In the same manner, we accessed its yearly prices that was stored in an array of the json dictionary to populate our stock graph data coordinates.</ListGroupItem>
                                    </ListGroup>
                                 </Card.Body>

                              </Card>
                           </CardDeck>

                           <CardDeck className="deck">


                              <Card className = "card" text = "white">
                                 <Card.Body><Card.Title>Resources</Card.Title></Card.Body>
                                 <ListGroup text = "white" className="list-group-flush listgroup">
                                    <ListGroupItem className = "listgroup" action href="https://gitlab.com/albertchokor/cs373-idb" rel="noopener noreferrer" target="_blank">Gitlab</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://gitlab.com/albertchokor/cs373-idb/-/wikis/Initial-Report" rel="noopener noreferrer" target="_blank">Gitlab Wiki</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://gitlab.com/albertchokor/cs373-idb/-/issues" rel="noopener noreferrer" target="_blank">Gitlab Issue Tracker</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://documenter.getpostman.com/view/16352153/TzecCkJB" rel="noopener noreferrer" target="_blank">Postman</ListGroupItem>
                                    <ListGroupItem className = "listgroup" action href="https://speakerdeck.com/" rel="noopener noreferrer" target="_blank">Speaker Deck Presentation</ListGroupItem>
                                 </ListGroup>
                                 <Card.Body><Card.Title>Tools</Card.Title></Card.Body>
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
                        </CardDeck>
                     </Container>
                     </div>
                  </div>
               </div>
            </div>
         </div>


    );
}
 
export default About;