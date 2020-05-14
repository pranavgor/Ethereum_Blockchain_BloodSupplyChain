import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './Admin.css';
import './List.css';

class Hospital extends Component {
  
  constructor(props) {
    super(props)
    this.state = {show: false, filter: ''}
  }

  showModal = () => {
    console.log("here")
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  changeFilter = (type) => {
    this.setState({ filter: type})
  }
  
  render() {
    return (
      <div id="content" style={{ justifyContent: 'center', width: '100%' }}>
        <h1 className="head">Welcome <strong>{this.props.usertype[this.props.account].name}.</strong></h1>
        <br />
        <h4 style={{ justifyContent: 'center' }}>Your Current Inventory</h4>
        {/* <form onSubmit={(event) => {
          event.preventDefault()
        }}>> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Collector Bank's (Name and Address)</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Used</th>
              </tr>
            </thead>
            <tbody id="Options list">
              {this.props.bags.sort((a, b) => b.expiry - a.expiry).reverse().slice(0, 10).map((bag, key) => {
                if (bag.owner === this.props.account) {
                  let a = bag.id.toNumber()
                  console.log(a)
                  const expiry = (new Date(bag.expiry * 1000)).toJSON().slice(0,10)
                  /*if(expiry < new Date().toJSON().slice(0,10)) {
                    
                      this.props.expiredBag(bag.id);
                    //console.log(bag.expired); 
                  }*/
                  return (
                    <tr key={key}>
                      <th scope="row">{bag.id.toString()}</th>
                      <td>{bag.owner_name} <br /> {bag.bank} </td>
                      <td>{bag.blood_group}</td>
                      <th scope="row">
                      <button
                          name={bag.id.toNumber()}
                          className="btn btn-primary"
                          disabled={bag.used && !bag.expired}
                          onClick={(event) => {
                            this.props.useBag(event.target.name);
                          }}>{bag.used ? "Bag used" : "Mark bag as used"}</button></th>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
      <p>&nbsp;</p>
        
        
        <List prs = {this.props} show={this.state.show}
         handleClose={this.hideModal} 
         filter={this.state.filter} changeFilter={this.changeFilter}>
        </List>
        <h4 style={{ justifyContent: 'center' }}>Available blood bags
        <button className="btn btn-primary float-right" style={{backgroundColor: 'green', display: 'flex', justifyContent: 'right', marginBottom: 10}} type="button" onClick={this.showModal}>
          Search Blood Bags
        </button></h4>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Collector Bank's (Name and Address)</th>
                <th scope="col">Current Owner's Name and Address</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Expiry</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody id="Options list">
              {this.props.bags.sort((a, b) => b.expiry - a.expiry).reverse().slice(0, 10).map((bag, key) => {
                if (bag.owner !== this.props.account && bag.used !== true && 
                  (new Date(bag.expiry * 1000).toJSON().slice(0,10)) >= new Date().toJSON().slice(0,10)) {
                  let a = bag.id.toNumber()
                  console.log(a)
                  console.log(bag.expiry,"expiry")
                  const expiry = (new Date(bag.expiry * 1000)).toString()
                  return (
                    <tr key={key}>
                      <th scope="row">{bag.id.toString()}</th>
                      <td>{this.props.usertype[bag.bank].name} <br /> {bag.bank} </td>
                      <td>{this.props.usertype[bag.owner].name} <br /> {bag.owner} </td>
                      <td>{bag.blood_group}</td>
                      <td>{expiry.slice(0,15)}</td>
                      <th scope="row">
                        <button
                          name={bag.id.toNumber()}
                          className="btn btn-primary"
                          onClick={(event) => {
                            this.props.h_placeOrder(event.target.name)
                          }}>Buy for 1.5 ETH </button></th>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        {/* </form> */}
      </div>
    );
  }
}

const List = ({ handleClose, show, prs, filter, changeFilter}) => {
  const showHideClassname = show ? "modal display-block" : "modal display-none";
  var i = 0
  return (
      <div className={showHideClassname}>
      <section className="modal-main">
      <p>&nbsp;</p>
      <div>
      <form class='form-inline' onSubmit={(event) => {
          event.preventDefault()
          const type = event.target[0].value
          changeFilter(type)
        }}>
          <div className="form-group mr-sm-2">
            <input 
              id="bloodtype"
              type="text"
              className="form-control"
              placeholder="Blood Group" 
              style={{marginLeft:10}}/> 
          </div>        
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
        </div>
        <br/>
      <table className="table" style={{marginLeft:10}}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Collector Bank's (Name and Address)</th>
            <th scope="col">Current Owner's Name and Address</th>
            <th scope="col">Blood Group</th>
            <th scope="col">Expiry</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="Bags list">
          {prs.bags.sort((a, b) => b.expiry - a.expiry).reverse().map((bag, key) => {
            if (bag.owner !== prs.account && bag.used !== true && 
              (new Date(bag.expiry * 1000).toJSON().slice(0,10)) >= new Date().toJSON().slice(0,10)) {
              /*console.log(bag.user)
              if (bag.user_type != 1){
                return true
              }*/
              if (filter !=''){
                if (bag.blood_group != filter) {
                  return true
                }
              }
              console.log(filter,bag.blood_group)
                i = i+1
              console.log(bag.expiry,"expiry")
              const expiry = (new Date(bag.expiry * 1000)).toString()
              return(
                <tr key={key}>
                <th scope="row">{i}</th>
                <td>{prs.usertype[bag.bank].name} <br /> {bag.bank} </td>
                <td>{prs.usertype[bag.owner].name} <br /> {bag.owner} </td>
                <td>{bag.blood_group}</td>
                <td>{expiry.slice(0,15)}</td>
                <th scope="row">
                  <button
                    name={bag.id.toNumber()}
                    className="btn btn-primary"
                    onClick={(event) => {
                      prs.h_placeOrder(event.target.name)
                    }}>Buy for 1.5 ETH </button></th>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
          <button className="btn btn-primary" 
          style={{margin:'auto', display: 'block',backgroundColor: 'red', display: 'flex', justifyContent: 'center'}}
           onClick={handleClose}>close</button>
          <br/>
      </section>
      </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);

export default Hospital;