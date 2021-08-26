import { useParams } from "react-router-dom";
import moment from 'moment';
import React, {useState }from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function doComment(id) {
  var comment = document.getElementById('noter-text-area').value;

  axios({
    method: 'POST',
    url: 'http://3.129.45.198/api/auth/posts/comment',
    data: {
      post_id: id,
      comment: comment
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
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

function stringToDate(date) {
  return moment(date).fromNow() + ' ' + moment(date).format('h:m');
}

function CommentsUI() {
  const { id } = useParams();
  localStorage.setItem('post_id', id);
  let [responseData, setResponseData] = React.useState('');
  let fetchData = React.useCallback(() => {
    axios({
      method: 'POST',
      url: 'http://3.129.45.198/api/auth/posts/getComment',
      data: {
        post_id: localStorage.getItem('post_id')
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      setResponseData(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [])
  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <div class="ui comments" style={{ margin: 'auto', paddingTop: '40px', paddingBottom: '50px' }}>
        <h3 class="ui dividing header">Comments</h3>
        {
          responseData && responseData.map((item) => (
            <div class="comment">
              <div class="content">
                <a class="author">{item.user.name}</a>
                <div class="metadata">
                  <span class="date">{stringToDate(item.created_at)}</span>
                </div>
                <div class="text">{item.comment}</div>
                <div class="actions">
                  <a class="reply">Reply</a>
                </div>
              </div>
            </div>
          ))
        }
        {/* <div class="comment">
          <div class="content">
            <a class="author">Elliot Fu</a>
            <div class="metadata">
              <span class="date">Yesterday at 12:30AM</span>
            </div>
            <div class="text">
              <p>This has been very useful for my research. Thanks as well!</p>
            </div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
          <div class="comments">
            <div class="comment">
              <div class="content">
                <a class="author">Jenny Hess</a>
                <div class="metadata">
                  <span class="date">Just now</span>
                </div>
                <div class="text">Elliot you are always so right :)</div>
                <div class="actions">
                  <a class="reply">Reply</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="content">
            <a class="author">Joe Henderson</a>
            <div class="metadata">
              <span class="date">5 days ago</span>
            </div>
            <div class="text">Dude, this is awesome. Thanks so much</div>
            <div class="actions">
              <a class="reply">Reply</a>
            </div>
          </div>
        </div>
         */}
        <form class="ui reply form">
          <div class="field">
            <textarea id="noter-text-area"></textarea>
          </div>
          <div onClick={() => doComment(id)} class="ui blue labeled submit icon button">
            <i class="icon edit" style={{ width: '30px' }}></i> Add Reply
          </div>
        </form>
      </div>
    </>
  );
}
export default CommentsUI;
