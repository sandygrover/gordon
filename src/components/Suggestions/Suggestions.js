import React from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'react-feather';
import ProfileCard from '../ProfileCard/ProfileCard';
import styles from './Suggestions.module.scss';

function Suggestions() {

  let [responseData, setResponseData] = React.useState('');
  const fetchBusinesses = React.useCallback(() => {
    axios({
      "method": "GET",
      url: 'http://3.129.45.198/api/auth/users/creator',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      setResponseData(response.data.data);
      console.log("creator List");
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  React.useEffect(() => {
    fetchBusinesses()
  }, [fetchBusinesses])

  return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.heading}>Suggestions</h3>
        <div className={styles.navigation}>
          <span className={styles.inactive}>
            <ChevronLeft />
          </span>
          <span>
            <ChevronRight />
          </span>
        </div>
      </div>

      {
        responseData.map((item) => (
          <ProfileCard
            // imageUrl={process.env.PUBLIC_URL + '/images/avatar/11.png'}
            imageUrl={item.profile == null ? process.env.PUBLIC_URL + '/images/avatar/julia.png' : item.profile}
            name={item.name}
            profileId={item.usename}
            accountType={'Free'}
            backgroundUrl={process.env.PUBLIC_URL + '/images/18.png'}
          />
        ))
      }

      {/* <ProfileCard
        imageUrl={process.env.PUBLIC_URL + '/images/avatar/17.png'}
        name={'Momal'}
        profileId={'@momalkobra'}
        accountType={'Free'}
        backgroundUrl={process.env.PUBLIC_URL + '/images/19.png'}
      />

      <ProfileCard
        imageUrl={process.env.PUBLIC_URL + '/images/avatar/11.png'}
        name={'Heran'}
        profileId={'@herachadi'}
        accountType={'Free'}
        backgroundUrl={process.env.PUBLIC_URL + '/images/18.png'}
      /> */}
    </div>
  );
}

export default Suggestions;
