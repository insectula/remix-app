import { Grid } from "@mui/material";
import logoMin from "~/assets/PNG/logo_min.png"



export default function Footer() {
    return (
        <>
        <div style={{marginTop:'25px', borderTop:'1px solid #eee'}}/>
        <Grid container sx={{marginTop: '35px'}}>
            <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
                <img src={logoMin} width="90%" style={{pointerEvents: 'none'}}/>
            </Grid>
            <Grid item xl={2}/>
            
            <Grid item container direction='column' xl={3}>
                <span style={{fontWeight: 'bold'}}> 
                    Адрес
                </span>
                <p>
                г. Москва, м.Фили,
                <br/>Промышленный проезд, д.5, к.1
                </p>
                <span>
                г. Казань пос. Новониколаевский, 
                <br/>«Индустриальный парк М-7»
                </span>
            </Grid>
            <Grid item container direction='column' xl={3}>
                <span style={{fontWeight: 'bold'}}> 
                    Время работы
                </span>
                <span style={{fontSize: '.8rem'}}>
                <br/>ПОНЕДЕЛЬНИК - ПЯТНИЦА
                </span>
                <span style={{fontSize: '1rem'}}>
                    с 10:00 до 18:00
                </span>
                <span style={{fontSize: '.8rem'}}>
                <br/>СУББОТА И ВОСКРЕСЕНЬЕ
                </span>
                <span style={{fontSize: '1rem'}}>
                    выходные дни
                </span>
            </Grid>
            <Grid item container spacing={2} xl={3}>
                <Grid item container direction='column' xl={6}>
                <span style={{fontWeight: 'bold'}}> 
                    Контакты
                </span>
                <span style={{fontSize: '.8rem'}}>
                <br/>БЕСПЛАТНО ПО РОССИИ
                </span>
                <span style={{fontSize: '1rem'}}>
                    8 (800) 000-00-00
                </span> 
                <br/>
                <span style={{fontSize: '.8rem'}}>
                    ТЕЛЕФОН В МОСКВЕ
                </span>
                <span style={{fontSize: '1rem'}}>
                    +7 (960) 067-01-08  
                </span>   
                       
                </Grid>
                <Grid item container direction='column' xl={6}>
                <span style={{fontWeight: 'bold'}}> 
                <br/>   
                </span>
                <span style={{fontSize: '.8rem'}}>
                <br/>ПОЧТА
                </span>
                <span style={{fontSize: '1rem'}}>
                    fenixklapan@yandex.ru
                </span>
                </Grid>
            </Grid>
        </Grid>
    </>
    )
}