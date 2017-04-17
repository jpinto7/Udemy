import '../styles/image_viewer.css';
import image1 from '../assets/image1.jpg';
import image5 from '../assets/image5.jpg';

export default () => {
  const image = document.createElement('img');
  image.src = image5;
  document.body.appendChild(image);

  const bigImage = document.createElement('img');
  bigImage.src = image1;
  document.body.appendChild(bigImage);
};
