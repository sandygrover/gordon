import moment from 'moment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Image, Dropdown } from 'semantic-ui-react';
import TipForm from '../forms/TipForm/TipForm';
import HeartLinearIcon from '../icons/HeartLinearIcon';
import MessageLinearIcon from '../icons/MessageLinearIcon';
import DollarLinearIcon from '../icons/DollarLinearIcon';
import styles from './PostCard.module.scss';

let is_like = 0;
function PostCard(postfromParent) {
  const [openTipForm, SetOpenTipform] = useState(false);

  const [count, setCount] = useState(postfromParent.postfromParent.is_like);
  const [likeCount, setLikecount] = useState(postfromParent.postfromParent.like.length);
  const [isHide, setisHide] = useState(postfromParent.postfromParent.is_hide);

  is_like = postfromParent.postfromParent.is_like;

  const tipHandler = (open = false, otherUserProfile = null, otherUserName = '', otherUserUserName) => {
    localStorage.setItem('otherUserProfile', otherUserProfile);
    localStorage.setItem('otherUserName', otherUserName);
    localStorage.setItem('otherUserUserName', otherUserUserName);
    SetOpenTipform(open);
  };

  function stringToDate(date) {
    return moment(date).fromNow() + ' ' + moment(date).format('h:m');
  }

  function doLike(postId) {
    axios({
      method: 'POST',
      url: 'http://3.129.45.198/api/auth/posts/like',
      data: {
        post_id: postId,
        like: 1
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        Swal.fire({
          title: 'successful',
          text: response.data.message,
          icon: 'success'
        });
        setCount(response.data.data);
        if (response.data.data == 0) {
          setLikecount(likeCount - 1);
        } else {
          setLikecount(likeCount + 1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function HidePost(id) {
    axios({
      method: 'GET',
      url: 'http://3.129.45.198/api/auth/posts/' + id + '/hide',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        let isHide1 = isHide == 0 ? 1 : 0;
        let message = isHide1 == 0 ? 'Post Hide Successfully' : 'Post Show Successfully';
        setisHide(isHide1);
        Swal.fire({
          title: 'Success',
          text: message,
          icon: 'success'
        }).then(() => {});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function DeletePost(id) {
    axios({
      method: 'DELETE',
      url: 'http://3.129.45.198/api/auth/posts/' + id,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function isFileImage(str) {
    if ( typeof str !== 'string' ) return false;
    return !!str.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi);
  }

  return (
    <div className={styles.card}>
      <div className={styles.author}>
        <div className={styles.about}>
          {/* <Image src={process.env.PUBLIC_URL + '/images/avatar/julia.png'} size="mini" alt="Juila" avatar /> */}
          <Image
            src={
              postfromParent &&
              postfromParent.postfromParent.user != null &&
              postfromParent.postfromParent.user != 'null'
                ? postfromParent.postfromParent.user.profile
                : process.env.PUBLIC_URL + '/images/avatar/julia.png'
            }
            size="mini"
            alt="Juila"
            avatar
          />
          <div className={styles.user_status}>
            <strong>
              {postfromParent &&
              (postfromParent.postfromParent.user == 'null' || postfromParent.postfromParent.user == null)
                ? 'Un Known'
                : postfromParent.postfromParent.user.name}
            </strong>
            <span>{stringToDate(postfromParent && postfromParent.postfromParent.created_at)}</span>
          </div>
        </div>
        <div className={styles.menu}>
          <Dropdown icon="ellipsis vertical">
            <Dropdown.Menu style={{ marginLeft: '-75px' }}>
              <Dropdown.Item
                style={{
                  display: postfromParent.postfromParent.user != null && postfromParent.postfromParent.user.id == localStorage.getItem('userId') ? 'block' : 'none'
                }}
                text="Edit Post"
              />
              <Dropdown.Item
                onClick={() => HidePost(postfromParent.postfromParent.id)}
                text={isHide == 0 ? 'Hide Post' : 'Show Post'}
              />
              <Dropdown.Item onClick={() => DeletePost(postfromParent.postfromParent.id)} text="Delete Post" />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={styles.feed_content}>{postfromParent && postfromParent.postfromParent.description}</div>
      <div className={styles.media}>
        {/* <img src={process.env.PUBLIC_URL + '/images/onlyfansfaydee.jpg'} alt="media" /> */}
        {
          isFileImage(postfromParent.postfromParent.meta_data) ? <img src={postfromParent && postfromParent.postfromParent.meta_data} alt="media" /> : <div>
            <video style={{ width:'100%' }} className="video-container video-container-overlay" autoPlay="true" loop muted="">
                <source src={ postfromParent && postfromParent.postfromParent.meta_data } type="video/mp4" />
            </video>
          </div>
        }
      </div>
      <div className={styles.stats}>
        <div className={styles.stats_view}>
          <div>{postfromParent && likeCount} Likes</div>
          <div>
            <span>{postfromParent && postfromParent.postfromParent.comment.length} Comments</span>
            <span>$.15 tips</span>
          </div>
        </div>
        <div className={styles.stats_actions}>
          <span onClick={() => doLike(postfromParent.postfromParent.id)}>
            <HeartLinearIcon is_like={count} />
          </span>
          <Link to={`/comments/${postfromParent.postfromParent.id}`}  style={{ width: '-4px' }}>
            <MessageLinearIcon />
          </Link>
          <span onClick={() => tipHandler(true, (postfromParent.postfromParent.user != null && postfromParent.postfromParent.user != 'null') ? postfromParent.postfromParent.user.profile : null, (postfromParent.postfromParent.user != null && postfromParent.postfromParent.user != 'null') ? postfromParent.postfromParent.user.name : null , (postfromParent.postfromParent.user != null && postfromParent.postfromParent.user != 'null') ? postfromParent.postfromParent.user.username : null )}>
            <DollarLinearIcon />
          </span>
        </div>
        <TipForm setOpen={tipHandler} open={openTipForm} />
      </div>
    </div>
  );
}

export default PostCard;
