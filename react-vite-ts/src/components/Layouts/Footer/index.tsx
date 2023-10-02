import style from './Footer.module.css'
import FooterCoppyRight from '../../FooterCoppyRight'

const Footer = () => {
  return (
    <footer className={style.footer}>
        <div className="container">
      <div className={style.footer_middle}>
            <div className={style.footer_middle_item}>About us</div>
            <div className={style.footer_middle_item}>Contact info</div>
            <div className={style.footer_middle_item}>customer service</div>
            <div className={style.footer_middle_item}>popular tag</div>
      </div>

        </div>
    <FooterCoppyRight/>
    </footer>
  )
}

export default Footer