import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import RussiaIcon from '~/assets/map';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Container, Grid } from '@mui/material';

export default function Bullits() {
  const md = useMediaQuery('(min-width:768px)')
  return (
      <>
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '30px', marginBottom: '15px',textAlign:'center',alignItems:'center', justifyContent: 'center'}}>
          <h1> Промышленные системы вентиляции </h1>
          <h2 style={{fontSize:'1.1rem',fontWeight:'400',width:'75%', marginLeft:'auto', marginRight:'auto'}}>
          Производство и поставка щитов автоматики для управления системами противодымной вентиляции. <br/>
          Производим и поставляем клапаны систем вентиляции в следующих исполнениях.  <br/>
          Поставляем вентиляторы дымоудаления, подпора, радиальные вентиляторы. <br/>
          Электроприводы для противопожарных и воздушных клапанов.
          
          </h2>
        </div>
        <Container maxWidth="xl">
        <Grid container direction={md?'row':'column'} sx={{justifyContent: 'center', alignItems:'center'}}>
          <Grid item md={3}><div className='flex center'>
            <RussiaIcon sx={{color:'#ff6429'}} />
            <span style={{marginLeft: '5px'}}>Работаем по всей России</span>  
          </div></Grid>
          <Grid item md={3}><div className='flex center'>
            <HandshakeOutlinedIcon sx={{color:'#ff6429'}} fontSize='medium'/>
            <span style={{marginLeft: '5px'}}>Индивидуальные скидки<br/>для компаний партнёров</span>
          </div></Grid>
          <Grid item md={3}><div className='flex center'>
            <AvTimerIcon sx={{color:'#ff6429'}} fontSize='medium'/>
            <span style={{marginLeft: '5px'}}>Короткие сроки производства</span>
          </div></Grid>
        </Grid></Container>
      </>
  );
}
