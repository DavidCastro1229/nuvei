import React, { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";
import getAllCards from '../getAllCards';
import DeleteCard from '../deleteCard';
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
    const decodificado = jwt.decode(token, { complete: true });
    console.log(decodificado)
    const id = decodificado.payload.sub;
    return id;
  };

  const lookTarjetasHandler = async () => {
    try {

      console.log('lookTarjetasHandler ah sido activado!!!');
      const idUser = getCookieUser();
      const cardsResponse = await getAllCards(idUser);
      console.log(cardsResponse)
      setCards(cardsResponse)
    } catch (error) {
      console.log('Error: ', error.message);
    }
  };
  const eliminarCard = (token)=>{
    const idUser = getCookieUser();
    const eliminar = DeleteCard(idUser)

  }

  return (
    <div>
      <button onClick={() => lookTarjetasHandler()}>ver tarjetas guardadas</button>
      <div>
        {
          cards.map((c, i) => {
            return(

              <aside key={i} style={{ display: 'flex', width:'100%' }}>
              <h1>Nombre: {c.holder_name}</h1>
              <h1>Expira: {c.expiry_year}</h1>
              <button onClick={eliminarCard(c.token)}>Eliminar</button>
            </aside>
              )
          })
        }

      </div>
    </div>
  );
}

export default Tarjetas;