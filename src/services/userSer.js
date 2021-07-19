import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "./apiSer";

let user = {};


export const updateUserData = async () => {
  if (localStorage["tok"]) {
    let url = API_URL + "/users/userInfo";
    try {
      let data = await doApiMethod(url, "GET");
      if (data._id) {
        user = data
      }
      else {
        localStorage.removeItem("tok");
        user = {}
      }
      return user
    }
    catch (err) {
      localStorage.removeItem("tok");
      user = {};
      return user
    }
  }
  else {
    user = {}
    return user;
  }
}

export const getUserData = () => {
  return user;
}

export const updateUserCardsAddFav = async (_bizCardNumber) => {
  let temp_ar = [...user.cards, _bizCardNumber];
  temp_ar = new Set([...temp_ar]);
  user.cards.splice(0, user.cards.length, ...temp_ar);
  let url = API_URL + "/users/cards"
  try {
    let data = await doApiMethod(url, "PATCH", { cards: user.cards });
    if (data.n === 1) {
      toast.success("Card added to your favorites!")
    }
    return data;
  }
  catch (err) {
    console.log(err)
    toast.error("A problem ocurred, please try again later.")
    throw err
  }
}

export const removeUserCardFav = async (_bizCardNumber) => {
  let temp_ar = user.cards.filter(item => item !== _bizCardNumber)
  user.cards.splice(0, user.cards.length, ...temp_ar);
  let url = API_URL + "/users/cards"
  try {
    let data = await doApiMethod(url, "PATCH", { cards: user.cards });
    if (data.n === 1) {
      toast.warning("Card removed from your favorites.")
    }
    return data;
  }
  catch (err) {
    console.log(err)
    toast.error("A problem ocurred, please try again later.")
    throw err
  }
}