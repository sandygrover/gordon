const CardLinearIcon = (props) => {
  const { width, height, className } = props;
  return (
    <svg className={className} width={width || 24} height={height || 24} viewBox="0 0 512 512">
      <path d="m456 80h-400c-30.878 0-56 25.122-56 56v240c0 30.878 25.122 56 56 56h400c30.878 0 56-25.122 56-56v-240c0-30.878-25.122-56-56-56zm-400 32h400c13.233 0 24 10.767 24 24v32h-448v-32c0-13.233 10.767-24 24-24zm400 288h-400c-13.233 0-24-10.767-24-24v-176h448v176c0 13.233-10.767 24-24 24z" />
    </svg>
  );
};

export default CardLinearIcon;
