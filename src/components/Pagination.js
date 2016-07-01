'use strict';

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

// Style
import paginationStyle from '../styles/components/pagination';

@Radium
export default class Pagination extends Component {
  static propTypes = {
    currentEnd: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    currentStart: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.calculateNumOfPages();
  }

  componentWillReceiveProps(nextProps) {
    this.calculateNumOfPages(nextProps);
  }

  calculateNumOfPages(nextProps) {
    const { itemsPerPage, total } = nextProps || this.props;

    if (this.state) {
      return this.setState({
        numOfPages: Math.ceil(total / itemsPerPage),
      });
    }
    this.state = {
      numOfPages: Math.ceil(total / itemsPerPage),
    };
    return false;
  }

  changePage(e, page) {
    e.preventDefault();
    const { itemsPerPage, onChangePage, total } = this.props;

    const newStart = 1 + (page - 1) * itemsPerPage;
    let newEnd = itemsPerPage + (page - 1) * itemsPerPage;
    newEnd = newEnd < total ? newEnd : total;

    onChangePage(page, newStart, newEnd);
  }

  paginationShowing() {
    const { currentEnd, currentStart, total } = this.props;
    const numOfPages = this.state;

    if (total === 1) return 'Showing 1 result';
    if (numOfPages <= 1) return `Showing all of ${total} results`;
    return `Showing ${currentStart}-${currentEnd} of ${total} results`;
  }

  makeClickHandler(i) {
    return (e) => this.changePage(e, i);
  }

  renderPages() {
    const { currentPage } = this.props;
    const { numOfPages } = this.state;

    const elems = [];
    let i;
    let j;

    // if pagination is over 5 pages
    if (currentPage - 2 < 1) {
      i = 1;
      j = 5;
    } else if (currentPage + 2 > numOfPages) {
      i = numOfPages - 5;
      j = numOfPages;
    } else {
      i = currentPage - 2;
      j = currentPage + 2;
    }

    // if pagination is 5 or less pages, reset previous calculations
    if (numOfPages <= 5) {
      i = 1;
      j = numOfPages;
    }

    for (i; i <= j; i++) {
      elems.push(
        <li style={paginationStyle.listAndItems} key={i}>
          {i === currentPage ?
            <span style={paginationStyle.selected}>{i}</span> :
            <Button
              style={paginationStyle.button}
              type="button"
              onClick={this.makeClickHandler(i)}
              empty
            >{i}</Button>
          }
        </li>
      );
    }

    return elems;
  }

  render() {
    const { currentPage, total } = this.props;
    const { numOfPages } = this.state;

    return (
      total > 0 &&
        <div style={paginationStyle.base}>
          <p style={paginationStyle.text}>
            {this.paginationShowing()}
          </p>
          {numOfPages > 1 &&
            <ul style={paginationStyle.ul}>
              {currentPage > 3 && numOfPages > 5 &&
                <li style={paginationStyle.listAndItems}>
                  <Button
                    style={paginationStyle.button}
                    type="button"
                    onClick={(e) => this.changePage(e, 1)}
                    empty
                  >
                    <i className="fa fa-angle-double-left" />
                  </Button>
                </li>
              }
              {currentPage !== 1 &&
                <li style={paginationStyle.listAndItems}>
                  <Button
                    style={paginationStyle.button}
                    type="button"
                    onClick={(e) => this.changePage(e, currentPage - 1)}
                    empty
                  >
                    <i className="fa fa-angle-left" />
                  </Button>
                </li>
              }
              {this.renderPages()}
              {currentPage !== numOfPages &&
                <li style={paginationStyle.listAndItems}>
                  <Button
                    style={paginationStyle.button}
                    type="button"
                    onClick={(e) => this.changePage(e, currentPage + 1)}
                    empty
                  >
                    <i className="fa fa-angle-right" />
                  </Button>
                </li>
              }
              {currentPage < numOfPages - 2 && numOfPages > 5 &&
                <li style={paginationStyle.listAndItems}>
                  <Button
                    style={paginationStyle.button}
                    type="button"
                    onClick={(e) => this.changePage(e, numOfPages)}
                    empty
                  >
                    <i className="fa fa-angle-double-right" />
                  </Button>
                </li>
              }
            </ul>
          }
        </div>
    );
  }
}
