import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
import PostCard from '../PostCard/PostCard';
import WriteLinearIcon from '../icons/WriteLinearIcon';
import styles from './Posts.module.scss';

function Posts() {
  let history = useHistory();

  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      url: 'http://3.129.45.198/api/auth/otheruserpost',
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      setResponseData(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])


  return (
    <div>
      <div className={styles.taglabels}>
        <Label>Following</Label>
        <Label onClick={() => history.push('/add-post')}>
          <WriteLinearIcon />
        </Label>
      </div>
      <div className={styles.posts}>
      {responseData && responseData.data.map((item, index) => (
        <PostCard postfromParent={item} key={index}/>
          ))}
      </div>
      <div className={styles.posts}>
        {/* <PostCard />
        <PostCard key={2} /> */}
      </div>
    </div>
  );
}

export default Posts;
