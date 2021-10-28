import Carousel from '../components/Testing';

const test = () => {
  return (
    <div
      horizontal='true'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 64,
        Height: '500px',
      }}
    >
      <Carousel>
        <img src='images/search.png' alt='placeholder' />
        <img src='images/search.png' alt='placeholder' />
        <img src='images/search.png' alt='placeholder' />
      </Carousel>
    </div>
  );
};

export default test;
