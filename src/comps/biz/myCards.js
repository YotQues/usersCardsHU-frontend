import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiSer';
import PageHeader from '../common/pageHeader';

function MyCards(props) {
  let [ar, setAr] = useState([])

  useEffect(() => {
    doApi();
  }, [props.location])

  const doApi = async () => {
    let url = API_URL + "/cards/userCardsAdded?perPage=999";
    let data = await doApiMethod(url, "GET");
    // console.log(data);
    data.reverse();
    setAr(data);
  }

  const delCard = async (_id) => {
    if (window.confirm("Are you sure you want to permanently delete this business card?")) {
      let url = API_URL + "/cards/" + _id;
      let data = await doApiMethod(url, "DELETE");
      if (data.n === 1) {
        doApi();
        toast.info("Card deleted!");
      }
    }
  }

  return (
    <div className="container">
      <PageHeader title="Biz cards you added before:" />
      <Link className="btn btn-success" to="/addCard">New Card <i class="fa fa-plus" aria-hidden="true"></i></Link>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Descrption</th>
              <th>Address</th>
              <th>Phone</th>
              <th>edit/del</th>

            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr key={item._id}>
                  <td>{i + 1}</td>
                  <td>{item.bizName}</td>
                  <td>{item.bizDescription.substr(0, 40)}...</td>
                  <td>{item.bizAddress}</td>
                  <td>{item.bizPhone}</td>
                  <td className="text-center">
                    <Link to={"/editCard/" + item._id}>
                      <button className="badge text-info" ><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                    </Link>
                    <button onClick={() => {
                      delCard(item._id);
                    }} className="ms-2 badge text-danger" ><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyCards