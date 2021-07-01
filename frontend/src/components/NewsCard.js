import React from 'react';
import { NavLink } from 'react-router-dom';

const NewsCard = ({article}) => {
   return (
      <div className="card-bg w-100 border d-flex flex-column">
          <div className="p-4 d-flex flex-column h-100">
              <div className="d-flex align-items-center justify-content-between">
                  <h2 class="text-light">{article.title}</h2>

              </div>
              <p className="my-4 text-left text-light">
                  <strong>Company: </strong>{article.company}
                  <br></br>
                  <strong>Stock: </strong>{article.stock}
                  <br></br>
                  <strong>Date: </strong> {article.date}
                  <br></br>
                  <strong>Source: </strong> {article.source}
                  <br></br>
                  <strong>Description: </strong>{article.description}
                  <br></br>



              </p>

              <NavLink exact to={"/news/" + article.id} activeClassName="activeClicked">
                  <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                      More info about this article
                      <i className="fas fa-arrow-right ml-1"></i>
                  </p>
              </NavLink>
              <NavLink exact to={"/companies/" + article.stock} activeClassName="activeClicked">
                  <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                      More info about the company
                      <i className="fas fa-arrow-right ml-1"></i>
                  </p>
              </NavLink>

              <NavLink exact to={"/stocks/" + article.stock} activeClassName="activeClicked">
                  <p className="c-p mb-0 text-light font-weight-bold text-right mt-auto">
                      More info about the stock
                      <i className="fas fa-arrow-right ml-1"></i>
                  </p>
              </NavLink>



          </div>
      </div>
  );
};

export default NewsCard;
