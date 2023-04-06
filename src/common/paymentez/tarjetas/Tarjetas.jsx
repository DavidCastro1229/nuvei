import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";
import axios from 'axios';
import endPoints from '@services/api';
import getAllCards from '../getAllCards';
import styles from '@styles/Paymentez.module.scss';
const Tarjetas = () => {
  const [email, setEmail] = useState('vacio');
  const [cards, setCards] = useState([])

  const router = useRouter();
  // const [uId, setuId] = useState(undefined)
  const getCookieUser = () => {
    const token = Cookie.get('token');
    if (!token) {
      return console.log('no logueado')
      // alert('necesitas iniciar session');
      // router.push('/login');
    }
    console.log('logeado')
    console.log("de cookie", token)
    return token;
  };

  const lookTarjetasHandler = async () => {
    try {

      console.log('lookTarjetasHandler ah sido activado!!!');
      const aynimarUserToken = getCookieUser();
      const decodificado = jwt.decode(aynimarUserToken, { complete: true });
      console.log(decodificado)
      const uId = decodificado.payload.sub;
      console.log(uId)
      console.log('antes de declarar funcion');
      const cardsResponse = await getAllCards(uId);
      console.log(cardsResponse)
      setCards(cardsResponse)
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };

  return (
    <div>
      <button onClick={() => lookTarjetasHandler()}>ver tarjetas guardadas</button>
      <div>
        {
          cards.map((c) => {
            <aside style={{ display: 'flex', width:'100%' }}>
              <h1>{c.bin}</h1>
            </aside>
          })
        }

      </div>
    </div>
  );
}

export default Tarjetas;