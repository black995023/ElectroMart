import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      noPages: 0,
      curPage: 1,
      itemSelected: null
    };
  }
  render() {
    const prods = this.state.products.map((item) => {
      return (
        <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
          <td>{item._id}</td>
          <td>{item.name}</td>
          <td>{item.price}</td>
          <td>{new Date(item.cdate).toLocaleString()}</td>
          <td>{item.category.name}</td>
          <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
        </tr>
      );
    });
    const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
      if ((index + 1) === this.state.curPage) {
        return (
          <span key={index} className={this.getPaginationClass(true)}>
            | <b>{index + 1}</b> |
          </span>
        );
      } else {
        return (
          <span
            key={index}
            className={`link ${this.getPaginationClass(false)}`}
            onClick={() => this.lnkPageClick(index + 1)}
          >
            | {index + 1} |
          </span>
        );
      }
    });
    return (
      <div className='mt-2'>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <h2 className="text-center">PRODUCT LIST</h2>
              <table className="table table-bordered table-striped datatable">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Creation date</th>
                    <th>Category</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  {prods}
                </tbody>
              </table>
              <div className="d-flex justify-content-center">
                {pagination}
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} updateProducts={this.updateProducts} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  getPaginationClass(isCurrentPage) {
    // Thay đổi tên lớp dựa trên chế độ và trạng thái của trang hiện tại
    if (this.context.theme === 'dark') {
      return isCurrentPage ? 'pagination-current-dark' : 'pagination-link-dark';
    } else {
      return isCurrentPage ? 'pagination-current-light' : 'pagination-link-light';
    }
  }
  updateProducts = (products, noPages, curPage) => { // arrow-function
    this.setState({ products: products, noPages: noPages, curPage: curPage });
  }
  componentDidMount() {
    this.apiGetProducts(this.state.curPage);
  }
  // event-handlers
  lnkPageClick(index) {
    this.apiGetProducts(index);
  }
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }
  // apis
  apiGetProducts(page) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/products?page=' + page, config).then((res) => {
      const result = res.data;
      this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
    });
  }
}
export default Product;