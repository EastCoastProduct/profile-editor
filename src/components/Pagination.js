'use strict';

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

// Style
import paginationStyle from '../styles/components/pagination';

@Radium
export default class Pagination extends Component {
  static propTypes = {
    currentEnd: PropTypes.number,
    currentPage: PropTypes.number,
    currentStart: PropTypes.number,
    itemsPerPage: PropTypes.number.isRequired,
    numOfPages: PropTypes.number,
    onPaginationChange: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  };

  componentWillMount() {
    this.calculatePagination();
  }

  componentWillReceiveProps(nextProps) {
    this.calculatePagination(nextProps);
  }

  calculateNewProps(currentPage, itemsPerPage, total) {
    const newNumOfPages = Math.ceil(total / itemsPerPage);
    let newPage = currentPage || 1;
    newPage = newPage <= newNumOfPages ? newPage : newNumOfPages;
    const newStart = 1 + (newPage - 1) * itemsPerPage;
    let newEnd = itemsPerPage + (newPage - 1) * itemsPerPage;
    newEnd = newEnd < total ? newEnd : total;
    return { newPage, newNumOfPages, newStart, newEnd };
  }

  calculatePagination(nextProps) {
    const { currentPage, itemsPerPage, numOfPages, onPaginationChange, total } =
      nextProps || this.props;
    const { total: oldTotal } = this.props;

    if (!numOfPages || oldTotal !== total) {
      const p = this.calculateNewProps(currentPage, itemsPerPage, total);
      onPaginationChange(p.newPage, p.newNumOfPages, p.newStart, p.newEnd);
    }
  }

  changePage(e, page) {
    e.preventDefault();
    const { itemsPerPage, onPaginationChange, total } = this.props;

    const p = this.calculateNewProps(page, itemsPerPage, total);
    onPaginationChange(p.newPage, p.newNumOfPages, p.newStart, p.newEnd);
  }

  paginationShowing() {
    const { currentEnd, currentStart, numOfPages, total } = this.props;

    if (total === 1) return 'Showing 1 result';
    if (numOfPages <= 1) return `Showing all of ${total} results`;
    return `Showing ${currentStart}-${currentEnd} of ${total} results`;
  }

  makeClickHandler(i) {
    return (e) => this.changePage(e, i);
  }

  renderPages() {
    const { currentPage, numOfPages } = this.props;

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
    const { currentPage, numOfPages, total } = this.props;

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
