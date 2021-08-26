const BookmarkLinearIcon = (props) => {
  const { width, height, className } = props;
  return (
    <svg className={className} width={width || 24} height={height || 24} viewBox="0 0 512 512">
      <path d="m448.8 0h-385.6c-8.284 0-15 6.716-15 15v482c0 6.067 3.655 11.536 9.26 13.858 5.605 2.321 12.057 1.038 16.347-3.252l182.193-182.193 182.193 182.193c4.29 4.29 10.741 5.573 16.347 3.252 5.605-2.322 9.26-7.791 9.26-13.858v-482c0-8.284-6.716-15-15-15zm-15 460.787-167.193-167.193c-2.929-2.929-6.768-4.394-10.606-4.394s-7.678 1.465-10.606 4.394l-167.195 167.193v-430.787h355.6z" />
    </svg>
  );
};

export default BookmarkLinearIcon;
