import { Grid } from "@mui/material";
import logoMin from "~/assets/PNG/logo_min.png"



export default function Footer() {
    return (
        <Grid container sx={{marginTop: '30px'}}>
            <Grid item xl={1}>
                <img src={logoMin} width="80%" />
            </Grid>
            <Grid item xl={1}/>
            
            <Grid item container direction='column' xl={2}>
                <span style={{fontWeight: 'bold'}}> 
                    Адрес
                </span>
                <p>
                г. Москва, м.Фили,<br/>
                Промышленный проезд, д.5, к.1
                </p>
                <p>
                г. Казань
                пос. Новониколаевский, «Индустриальный парк М-7»
                </p>
            </Grid>
            <Grid item container direction='column' xl={3}>
                <span style={{fontWeight: 'bold'}}> 
                    Время работы
                </span>
                <p>
                <br/>Пн - Пт:  10:00-18:00
                </p>
                <p>
                Сб - Вс: выходные дни
                </p>
            </Grid>
            <Grid item container direction='column' xl={2}>
                <span style={{fontWeight: 'bold'}}> 
                    Контакты
                </span>
                <p>
                Бесплатно по России
                <br/>8 (800) 000-00-00
                <br/>
                <br/>Телефон в Москве
               <br/>+7 (960) 067-01-08     
                </p>          
            </Grid>
            <Grid item container direction='column' xl={2}>
                <span style={{fontWeight: 'bold'}}> 
                     
                </span>
                <p>
                <br/>Почта
                <br/>fenixklapan@yandex.ru
                </p>
            </Grid>
        </Grid>
    )
}