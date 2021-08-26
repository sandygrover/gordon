// Vue.use(ImagePicker)
// import ImagePicker from 'image-picker-rui'
import React, { PropTypes, Component , useState, useEffect} from 'react'
import {input} from 'react';
import { Color } from 'jest-matcher-utils/node_modules/chalk';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import { Link, useHistory } from 'react-router-dom';
// import ImagePicker from 'react-image-picker'
import Swal from 'sweetalert2';
import { Image, Button, TextArea, Form,Input } from 'semantic-ui-react';
import ImagesIcon from '../../icons/ImagesIcon';
import VideoIcon from '../../icons/VideoIcon';
import GifIcon from '../../icons/GifIcon';
import styles from './AddPost.module.scss';

function AddPost() {
  const [file, setfile] = useState('');
  const [filename, setfilename] = useState('');
  let history = useHistory();
  return (
    <div className={styles.AddPost}>
      <Form onSubmit={(event) => {
        if(file == '') {
          Swal.fire({
            title: 'Warning',
            text: "Please Select Media First",
            icon: 'danger'
          }).then(() => {

          });
        } else {
          let formData = new FormData();
          formData.append('title', "Post Title");
          formData.append('description', event.target.elements.description.value);
          formData.append('meta_data', file);
          axios({
            method: 'post',
            url: 'http://3.129.45.198/api/auth/posts',
            headers: {
              "Authorization" : `Bearer ${localStorage.getItem('token')}`,
              'Accept' : 'multipart/form-data',
              'Content-Type': 'multipart/form-data'
            },
            data: formData,
          })
          .then(function(response) {
              setfile('');
              setfilename('');
              if(response.data.status) {
                Swal.fire({
                  title: 'Success',
                  text: response.data.message,
                  icon: 'success'
                }).then(() => {
                  history.push('/profile');
                });
              } else {
                Swal.fire({
                  title: 'Error',
                  text: response.data.message,
                  icon: 'warning'
                }).then(() => {

                });
              }
          }).catch(res => {
            window.location.reload(false);
          });
        }
      }}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>Create a post</h3>
          <Button primary>Post</Button>
        </div>
      </div>
      <div className={styles.author}>
        <Image spaced src={localStorage.getItem('profile') == null ? process.env.PUBLIC_URL + '/images/avatar/julia.png' : localStorage.getItem('profile')} avatar />
        <span>{ localStorage.getItem('name') }</span>
      </div>
      <div className={styles.post_message}>
        <TextArea name="description" required="required" placeholder="What's in your mind" />
      </div>
      <div className={styles.post_media}>
        <div className={styles.title}>Add to you post</div>
        {/* <ImagePicker images={imagesList.map(image, i=> ({src:image, value:i}))}
        onPick={thiss.onPick}/> */}
        {/* <image-picker v-model="url" uploadImage="uploadImage"> </image-picker> */}
        <div className={styles.media_actions}>
          <span>
          {/* {filename == '' ? '' : filename} */}
          </span>
          <span>
            <Dropzone name="meta_data" multiple={true} accept="image/*" onDrop={(files) => {
              setfile(files[0]);
              setfilename(files[0].name);
            }}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <ImagesIcon />
                  </div>
                </section>
              )}
            </Dropzone>
          </span>
          <span>
            <Dropzone name="meta_data" multiple={true} accept="video/*" onDrop={(files) => {
              setfile(files[0]);
              setfilename(files[0].name);
            }}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <VideoIcon />
                  </div>
                </section>
              )}
            </Dropzone>
          </span>
          <span>
            <Dropzone name="meta_data" multiple={true} accept="gif/*" onDrop={(files) => {
              setfile(files[0]);
              setfilename(files[0].name);
            }}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <GifIcon />
                  </div>
                </section>
              )}
            </Dropzone>
          </span>
          {/* <span>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <VideoIcon />
                  </div>
                </section>
              )}
            </Dropzone>
          </span>
          <span>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <GifIcon />
                  </div>
                </section>
              )}
            </Dropzone>
          </span> */}

        </div>
      </div>
      </Form>
    </div>
  );
}

export default AddPost;
