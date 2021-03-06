import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet, PER_PAGE } from '../../services/apiSer';

function Pagenation(props) {
  let [countPage, setCountPage] = useState(0);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + props.urlOfItemNum
    let data = await doApiGet(url);

    setCountPage(Math.ceil(data.count / PER_PAGE));
  }

  return (
    <div>
      <span>Page: </span>
      {[...Array(countPage)].map((item, i) => {
        return (
          <Link key={i} to={props.linkTo + (i + 1)} className="btn btn-dark me-1" >{i + 1}</Link>
        )
      })}
    </div>
  )
}

export default Pagenation