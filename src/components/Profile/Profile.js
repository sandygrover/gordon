import React, {useState }from 'react';
import {
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  MailruIcon,
  MailruShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,

} from "react-share";
import 'antd/dist/antd.css';
import {Button} from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import Dropzone from 'react-dropzone'
import { Image, Input, Icon, Dropdown, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {Modal} from 'antd';
import WriteLinearIcon from '../icons/WriteLinearIcon';
import ShareIcon from '../icons/ShareIcon';
import PostCard from '../PostCard/PostCard';
import styles from './Profile.module.scss';









const filterByArr = [
  { value: 'All time', text: 'All time' },
  { value: 'Last three months', text: 'Last three months' },
  { value: 'Last month', text: 'Last month' },
  { value: 'Last week', text: 'Last week' },
  { value: 'Latest post', text: 'Latest post' },
  { value: 'Most liked', text: 'Most liked' },
  { value: 'Highest tips', text: 'Highest tips' }


];

function handleDrop(files) {







  let formData = new FormData();
  formData.append('username', localStorage.getItem('username'));
  formData.append('name', localStorage.getItem('name'));
  formData.append('phone_number', localStorage.getItem('phone_number'));
  formData.append('email', localStorage.getItem('email'));
  formData.append('subscription_fee', localStorage.getItem('subscription_fee'));
  formData.append('location', localStorage.getItem('location'));
  formData.append('website', localStorage.getItem('website'));
  formData.append('profile', files[0]);
  axios({
    method: 'post',
    url: 'http://3.129.45.198/api/auth/update-profile',
    headers: {
      "Authorization" : `Bearer ${localStorage.getItem('token')}`,
      'Accept' : 'multipart/form-data',
      'Content-Type': 'multipart/form-data'
    },
    data: formData,
  })
  .then(function(response) {
      if(response.data.status) {
        Swal.fire({
          title: 'Success',
          text: 'Profile Updated Successfully',
          icon: 'success'
        }).then(() => {
          localStorage.setItem('profile', response.data.data[0].profile);
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
    // window.location.reload(false);
  });
}

function Profile() {

  let [responseData, setResponseData] = React.useState('');
  let [search, setSearch] = React.useState('');
  let [filter, setFilter] = React.useState('');


  const [trModalVisible, settrModalVisible] = useState(false);

  const handleCa = () => {
    settrModalVisible(false);
  }

  const onModal = () => {
    settrModalVisible(true);
  }



  let fetchData = React.useCallback(() => {
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

  return (

    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.profile}>
          <div className={styles.hero_wrap}>
            <div
              className={styles.hero}
              style={{ backgroundImage: 'url(' + process.env.PUBLIC_URL + '/images/19.png)' }}
            >
              <div className={styles.user}>
                <Dropzone multiple={true} accept="image/*" onDrop={handleDrop}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Image
                            className={styles.avatar}
                            src={localStorage.getItem('profile') == null ? process.env.PUBLIC_URL + '/images/avatar/julia.png' : localStorage.getItem('profile')}
                            size="tiny"
                            circular
                            verticalAlign="middle"
                          />
                      </div>
                    </section>
                  )}
                </Dropzone>
                <Link to="/settings/profile" className={styles.edit}>
                  <WriteLinearIcon />
                  Edit Profile
                </Link>
                <div className={styles.name}>{localStorage.getItem('username')}</div>
              </div>
            </div>
            <div className={styles.share_shop}>
              <Link to="/profile/shop">
                <span>
                  {/* {/ <ShoppingBag /> /} */}
                </span>
              </Link>
              <span>




              <Button icon={<ShareIcon className={styles.svg} />} onClick={onModal}   type="link" style={{ color: 'grey', fontSize: '35px', border:'1px solid transparent', backgroundColor:'transparent',cursor:'pointer',marginRight:'-60px' }}> </Button>



                <Modal visible={trModalVisible} footer={null} onCancel={handleCa} width={'500px'} style={{ border: 'none', borderTop: '4px darkblue solid' }}>
<center>
  <br/>

<container style={{width:'350px'}}>
  <Segment>
    <FacebookShareButton url="http://18.188.153.23:3000/chat">
<FacebookIcon />
    </FacebookShareButton>


<WhatsappShareButton url="http://18.188.153.23:3000/chat">
<WhatsappIcon/>
</WhatsappShareButton>



<TwitterShareButton url="http://18.188.153.23:3000/chat">
<TwitterIcon/>
</TwitterShareButton>


<MailruShareButton url="http://18.188.153.23:3000/chat">
  <MailruIcon/>
</MailruShareButton>


  </Segment>
</container>



</center>
                </Modal>


              </span>
            </div>
          </div>
          <div className={styles.posts_filters}>
            <div className={styles.total_posts}>
              <span>{ responseData && responseData.data.length } Posts</span>
            </div>
            <div className={styles.filter_buttons}>
              <span>
                <Input onChange={()=>{}} className={styles.posts_search} icon={<Icon name="search" />} />
              </span>
              <span className={styles.posts_by_time}>
                <Dropdown
                  icon={
                    <span className={styles.hamburger}>
                      <span className={styles.line} />
                      <span className={[styles.line, styles.line__middle].join(' ')} />
                      <span className={[styles.line, styles.line__bottom].join(' ')} />
                    </span>
                  }
                >
                  <Dropdown.Menu className={styles.menu}>
                    <Dropdown.Menu scrolling>
                      {filterByArr.map((option) => (
                        <Dropdown.Item key={option.value} {...option} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              </span>
            </div>
          </div>

          {/* <div>
            <PostCard />
          </div> */}
          {responseData && responseData.data.map((item, index) => (
            <div>
              <PostCard postfromParent={item} key={index}/>
            </div>
          ))}
        </div>
        <div className={styles.right} />
      </div>
    </div>
  );
}

export default Profile;
