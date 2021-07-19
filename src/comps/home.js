import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/apiSer';

import CardsList from './cardsList';
import PageHeader from './common/pageHeader';
import Pagenation from './common/pagenation';


function Home(props) {
  let [cards_ar, setCardsAr] = useState([]);

  useEffect(() => {
    const queries = new URLSearchParams(window.location.search);
    let page = queries.get("page") ? queries.get("page") - 1 : 0;
    let url = API_URL + "/cards?page=" + page;
    doApi(url)
  }, [props.location])

  const doApi = async (_url) => {
    let data = await doApiGet(_url);
    // console.log(data);
    setCardsAr(data);
  }


  return (
    <div>
      <PageHeader title="Welcome to Business Cards" />
      <Pagenation urlOfItemNum="/cards/totalCards" linkTo="/?page=" />
      <CardsList ar={cards_ar} />
    </div>
  )
}

export default Home