import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Image } from 'semantic-ui-react';
import PostCard from '../PostCard/PostCard';
import styles from './Bookmarks.module.scss';

function Profile() {

  let [responseData, setResponseData] = React.useState('');
  const fetchData = React.useCallback(() => {
    axios({
      "method": "GET",
      url: 'http://3.129.45.198/api/auth/posts',
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


  const [tabkey, setTabkey] = useState('all');

  const filterBookmarkHandler = (value = 'all') => {
    setTabkey(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.wall}>
          <div className={styles.tabs}>
            <div
              className={[styles.tab, tabkey === 'all' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterBookmarkHandler('all')}
            >
              All
            </div>
            <div
              className={[styles.tab, tabkey === 'images' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterBookmarkHandler('images')}
            >
              Photos
            </div>
            <div
              className={[styles.tab, tabkey === 'videos' ? styles.tab__active : ''].join(' ')}
              onClick={() => filterBookmarkHandler('videos')}
            >
              Videos
            </div>
          </div>
          <div className={[styles.bookmarks_items, tabkey === 'all' ? styles.bookmarks_items__active : ''].join(' ')}>
            {/* <PostCard /> */}
            {responseData && responseData.data.map((item, index) => (
              <PostCard postfromParent={item} key={index}/>
          ))}
          </div>
          <div
            className={[styles.bookmarks_items, tabkey === 'images' ? styles.bookmarks_items__active : ''].join(' ')}
          >
            <div className={styles.no_result}>No Photos saved currently</div>
          </div>
          <div
            className={[styles.bookmarks_items, tabkey === 'videos' ? styles.bookmarks_items__active : ''].join(' ')}
          >
            <div className={styles.video_block}>
              <Image src={process.env.PUBLIC_URL + '/images/onlyfansfaydee.jpg'} />
            </div>
          </div>
        </div>
        <div className={styles.right} />
      </div>
    </div>
  );
}

export default Profile;
