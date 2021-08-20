import DashboardLayout from '../components/common/DashboardLayout/DashboardLayout';
import Post from '../components/Posts/Posts'
import CommentsUI from './CommantsUI';
function Comments() {
  return (
      <>
    <DashboardLayout>
      <Post/>
      <CommentsUI/>
      

        
    </DashboardLayout>
    </>
  );
}

export default Comments;