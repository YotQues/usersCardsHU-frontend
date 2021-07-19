import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/apiSer';


import CardsList from './cardsList';
import PageHeader from './common/pageHeader';

function FavoriteCards(props) {
  let [cards_ar, setCardsAr] = useState([]);

  useEffect(() => {
    let url = API_URL + "/users/userCardsFav";
    doApi(url)
  }, [])

  const doApi = async (_url) => {
    try {
      let data = await doApiMethod(_url, "GET");
      console.log(data);
      setCardsAr(data);
    }
    catch (err) {
      console.log(err.response)
    }
  }

  //TODO: add redux to update

  return (
    <div>
      <PageHeader title="Your Favorite Business Cards: " />
      <CardsList ar={cards_ar} />
    </div>
  )
}

export default FavoriteCards