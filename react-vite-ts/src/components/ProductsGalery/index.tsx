import style from './ProductsGalery.module.css'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';


const ProductsGalery = () => {
  return (
    <div className={style.productsGalery}>
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="https://ecshopvietnam.com/ecshopmi/cdn/images/202204/goods_img/xiaomi-redmi-note-11s-5g-G4305-1650508487726.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
      <img src="https://ecshopvietnam.com/ecshopmi/cdn/images/202103/goods_img/samsung-galaxy-s21-5g-P4305-1615367782874.jpg" alt="" />

      </SwiperSlide>
      <SwiperSlide>
      <img src="https://ecshopvietnam.com/ecshopmi/cdn/images/202103/goods_img/samsung-galaxy-s21-5g-P4305-1615367860159.jpg" alt="" />

      </SwiperSlide>
      <SwiperSlide>
      <img src="https://ecshopvietnam.com/ecshopmi/cdn/images/202103/goods_img/samsung-galaxy-s21-5g-P4305-1615367860405.jpg" alt="" />

      </SwiperSlide>

    </Swiper>     
    </div>
  
  )
}

export default ProductsGalery