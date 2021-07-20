import React, { useEffect, useState } from 'react';
import { getUserData, removeUserCardFav, updateUserCardsAddFav } from '../services/userSer';

function CardsList(props) {

  let [userData, setUserData] = useState();
  let [update, forceUpdate] = useState(1)

  useEffect(() => {
    setUserData(getUserData());
  }, [])


  const showBtnFav = (item) => {
    if (!userData.cards.includes(item.bizNumber)) {
      return (
        <button onClick={async () => {
          await updateUserCardsAddFav(item.bizNumber);
          forceUpdate(update + 1);
        }} className="btn btn-success">+ fav</button>
      )
    }
    else {
      return (<button onClick={async () => {
        await removeUserCardFav(item.bizNumber)
        forceUpdate(update + 1);
      }} className="btn btn-warning">- fav</button>)
    }
  }

  return (
    <div className="row">
      {props.ar.map(item => {
        let bg = item.bizImage?.length > 2 ? item.bizImage : '/images/default.png'
        return (
          <div key={item._id} className="col-lg-4 p-3">
            <div className="border">
              <div className="biz_img" style={{
                backgroundImage: `url("${bg}")`
              }} >

              </div>
              <article className="p-3">
                <h2>{item.bizName}</h2>
                <p>{item.bizDescription}</p>
                <hr />
                <div><strong>Phone:</strong> {item.bizPhone}</div>
                <div><strong>Address:</strong> {item.bizAddress}</div>
                <div><strong>Biz number:</strong> {item.bizNumber}</div>
                {userData._id ? showBtnFav(item) :
                  <small className="text text-danger">* Log in to add to favorites</small>}
              </article>
            </div>
          </div>
        )
      })}
    </div>

  )
}

export default CardsList;