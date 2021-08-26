import AddPostForm from '../forms/AddPost/AddPost';
import styles from './NewPost.module.scss';

function NewPost() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.post}>
          <AddPostForm />
        </div>
        <div className={styles.right}> </div>
      </div>
    </div>
  );
}

export default NewPost;
