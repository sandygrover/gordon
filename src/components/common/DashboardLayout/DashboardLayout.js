import TopNav from './TopNav/TopNav';

function DashboardLayout(props) {
  return (
    <div>
      <TopNav />
      {props.children}
    </div>
  );
}

export default DashboardLayout;
