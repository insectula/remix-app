import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import RussiaIcon from '~/assets/map';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Col } from 'react-bootstrap';

export default function Bullits() {
  const md = useMediaQuery('(min-width:768px)')
  return (
      <>
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '30px',textAlign:'center',alignItems:'center', justifyContent: 'center'}}>
          <h1> Промышленные системы вентиляции </h1>
          <h2 style={{fontSize:'1.3rem',fontWeight:'400',width:'75%', marginLeft:'auto', marginRight:'auto'}}>
          Поставляем вентиляторы дымоудаления, подпора, радиальные вентиляторы. <br/>
          Производим и поставляем клапаны систем вентиляции в следующих исполнениях.  <br/>
          Электроприводы для противопожарных и воздушных клапанов.<br/>
          Производство и поставка щитов автоматики для управления системами противодымной вентиляции. 
          </h2>
        </div>
        <div className="bullits" style={{flexDirection: md?'row':'column'}}>
          <Col md={{span:3, offset:1}}><div className='flex center'>
            <RussiaIcon sx={{color:'#ff6429'}} />
            <span style={{marginLeft: '5px'}}>Работаем по всей России</span>  
          </div></Col>
          <Col md={{span:3, offset:1}}><div className='flex center'>
            <HandshakeOutlinedIcon sx={{color:'#ff6429'}} fontSize='medium'/>
            <span style={{marginLeft: '5px'}}>Индивидуальные скидки<br/>для компаний партнёров</span>
          </div></Col>
          <Col md={{span:3, offset:1}}><div className='flex center'>
            <AvTimerIcon sx={{color:'#ff6429'}} fontSize='medium'/>
            <span style={{marginLeft: '5px'}}>Короткие сроки производства</span>
          </div></Col>
        </div>
      </>
  );
}
