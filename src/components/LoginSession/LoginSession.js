import { Button } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LoginSession.module.scss';

function clearSession() {
  axios({
    "method": "GET",
    url: 'http://3.129.45.198/api/auth/clear-session',
    data: {
    },
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    localStorage.clear();
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  })
}

function LoginSession() {
  const [sessionData, setsessionData] = useState([]);
  axios({
    "method": "GET",
    url: 'http://3.129.45.198/api/auth/get-sessions',
    data: {
    },
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then((response) => {
    setsessionData(response.data.data);
  })
  .catch((error) => {
    console.log(error);
  })

  return (
    <div>
      <div className={styles.form}>
        <h3 className={styles.title}>Login Session</h3>
        <ul className={styles.list}>
            {sessionData.map((item, i) => (
              <li>
                <div>
                  <p>{item.device}</p>
                  {/* <span>192.168.0.1 England</span> */}
                </div>
                <div className={styles.status}>Active Now</div>
                </li>
            ))}
            {/* <div>
              <p>Chrome Windows 10</p>
              <span>192.168.0.1 England</span>
            </div> */}
        </ul>
        <div className={styles.button_submit}>
          <Button onClick={() => clearSession()} primary>Clear All Sessions</Button>
        </div>
      </div>
    </div>
  );
}

export default LoginSession;
