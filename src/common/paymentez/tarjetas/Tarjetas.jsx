import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";
import axios from 'axios';
import endPoints from '@services/api';
import getAllCards from '../getAllCards';
import styles from '@styles/Paymentez.module.scss';
const Tarjetas = () => {
  
  const codePaymentezNuvei = process.env.NEXT_PUBLIC_API_PAYMENTEZ_API_CODE;

  const keyPaymentezNuvei = process.env.NEXT_PUBLIC_API_PAYMENTEZ_API_KEY;
  console.log("de tajetas", codePaymentezNuvei)
  console.log("de tarjetas", keyPaymentezNuvei)
  let tarjetas = [];
  const [email, setEmail] = useState('vacio');

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
    // const { data: fetch } = await axios.get(endPoints.users.getUser(uId));
    // setEmail(fetch.email);
    // setuId(token);
    console.log("de cookie",token)
    return token;
  };
  // const hiToken = getCookieUser();


  const [userId, setUSerId] = useState()
  // useEffect(() => {
  //   try {
  //     const decodificado = jwt.decode(hiToken, { complete: true });
  //     setUSerId(decodificado.payload.sub)
  //   } catch (error) {
  //     console.log('no log')
  //   }

  // }, [])


  const lookTarjetasHandler = async () => {
    try {

      console.log('lookTarjetasHandler ah sido activado!!!');
      const aynimarUserToken = getCookieUser();
      const decodificado = jwt.decode(aynimarUserToken, { complete: true });
      console.log(decodificado)
      const uId = decodificado.payload.sub;
      console.log(uId)
      console.log('antes de declarar funcion');
      const cards = await getAllCards(uId);
      return cards
//  return console.log(getAllCards)
      console.log('antes de inicializar');
      console.log(cards);
      console.log('antes de inicializar2');
      const promiseOfGet = await cards();
      console.log(promiseOfGet.dataResponse);
      console.log('response looktarjetas');
      console.log(cards.response);
      console.log(promiseOfGet);

      const response = await axios.get(
        `https://ccapi-stg.paymentez.com/v2/card/list?uid=${uId}`);
      console.log(response);
      console.log('Respuesta: tarjetas ', response.data);
      console.log(response.dataResponse);
    } catch (error) {
      console.log('Error: ', error);
      console.log('Error: ', error.message);
    }
  };

  return (
    <div>
      <button onClick={() => lookTarjetasHandler()}>ver tarjetas guardadas</button>
    </div>
  );
}

export default Tarjetas;