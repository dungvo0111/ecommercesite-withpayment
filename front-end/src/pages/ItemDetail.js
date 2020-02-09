import React, {useState, useEffect} from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
export default function ItemDetail(match) {
    useEffect(() => {
        fetchItem()
    }, [])

    const [item, setItem] = useState([])
    const fetchItem = async () => {
        var myHeaders = new Headers();
myHeaders.append("Authorization", "{{authorization}}");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://fortnite-api.theapinetwork.com/item/get?id=91ca3cc-361294e-3fc8c66-46b1288", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    }

    return (
        <div>
            
        </div>
    )
}
