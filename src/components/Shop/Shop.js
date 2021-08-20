import { useState } from 'react';
import { Icon, Button, Modal } from 'semantic-ui-react';
import AddShopList from '../forms/AddShopList/AddShopList';
import AddProduct from '../forms/AddProduct/AddProduct';
import styles from './Shop.module.scss';

function Shop() {
  const [showModal, setShowModal] = useState(false);
  const [showCategory, setShowCategory] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const productsHandler = (category = '') => {
    setShowCategory(false);
    setActiveCategory(category);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left} />
        <div className={styles.shop}>
          <h4>
            {!showCategory ? (
              <Icon
                onClick={() => {
                  setActiveCategory(null);
                  setShowCategory(true);
                }}
                name="long arrow alternate left"
              />
            ) : (
              ''
            )}
            Shop {activeCategory ? '  > ' + activeCategory : ''}
          </h4>
          {showCategory ? (
            <div>
              <p>
                <small>Product lists</small>
              </p>
              <ul>
                <li onClick={() => productsHandler('Ebook')}>
                  <span>Ebooks</span> <Icon name="chevron right" />
                </li>
                <li onClick={() => productsHandler('Pdf')}>
                  <span>Pdf</span> <Icon name="chevron right" />
                </li>
                <li onClick={() => productsHandler('Gym Products')}>
                  <span>Gym Products</span> <Icon name="chevron right" />
                </li>
              </ul>
              <div>
                <Button onClick={() => setShowModal(true)} className={styles.button} primary>
                  <span>+</span> Add New Lists
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <p>
                <small>Products</small>
              </p>
              <ul>
                <li>
                  <span>Product 1 </span> <Icon name="chevron right" />
                </li>
                <li>
                  <span>Product 2 </span> <Icon name="chevron right" />
                </li>
              </ul>
              <div>
                <Button onClick={() => setShowModal(true)} className={styles.button} primary>
                  <span>+</span> Add New Item
                </Button>
              </div>
            </div>
          )}

          <Modal closeIcon className={styles.modal} size={'mini'} open={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>{!activeCategory ? 'Add list' : 'Add item to list'}</Modal.Header>
            <Modal.Content>{!activeCategory ? <AddShopList /> : <AddProduct />}</Modal.Content>
            <Modal.Actions>
              <Button className={styles.btn_white} onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                className={styles.btn_primary}
                primary
                onClick={() => {
                  setShowCategory(true);
                  setShowModal(false);
                }}
              >
                {!activeCategory ? 'Next' : 'Save'}
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
        <div className={styles.right}> </div>
      </div>
    </div>
  );
}

export default Shop;
