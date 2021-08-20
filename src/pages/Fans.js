import DashboardLayout from '../components/common/DashboardLayout/DashboardLayout';
function Fans() {
    return (
      <>
       <DashboardLayout>

    <div class="ui relaxed divided list">
  <div class="item">
    <i class="large github middle aligned icon"></i>
    <div class="content">
      <a class="header">User 1</a>
      <div class="description">Updated 10 mins ago</div>
    </div>
  </div>
  <div class="item">
    <i class="large github middle aligned icon"></i>
    <div class="content">
      <a class="header">User 2</a>
      <div class="description">Updated 22 mins ago</div>
    </div>
  </div>
  <div class="item">
    <i class="large github middle aligned icon"></i>
    <div class="content">
      <a class="header">user 3r</a>
      <div class="description">Updated 34 mins ago</div>
    </div>
  </div>
</div>
</DashboardLayout>
      

      </>
    );
  }
  
  export default Fans;