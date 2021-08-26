import DashboardLayout from '../common/DashboardLayout/DashboardLayout';
import Posts from '../Posts/Posts';
import CommentsUI from './CommentsUI';

function Comment() {
  return (
    <>
      <DashboardLayout>
        {/* <Posts /> */}
        <CommentsUI />
      </DashboardLayout>
    </>
  );
}

export default Comment;
