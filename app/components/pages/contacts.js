import { YMaps, Map, Placemark } from "react-yandex-maps";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

export default function Contacts() {
    return(
        <>
            <div className="pageTitle">
                <span style={{fontSize: '30px'}}>Контакты</span>
            </div>
            <div style={{marginTop: '30px', marginLeft:'auto',marginRight:'auto',width:'max-content'}}>
                <div className='aimrow' style={{justifyContent: 'center', gap:'200px', paddingTop: '20px', borderTop: '1px solid #edf0f6'}}>
                    <div className="aimcol" style={{position: 'relative',alignItems: 'center', width:'350px',}}>
                        <span style={{fontSize: '20px'}}>Наши телефоны:</span>
                        <div className="aimrow" style={{alignItems:'center', height: '100%', width:'100%', justifyContent:'flex-end'}}>
                            <div className="aimcol" style={{padding:'20px',alignItems: 'flex-end'}}>
                                <h5 style={{margin: 0, padding: 0,width:'fit-content'}}>
                                    8 (800) 000-00-00
                                </h5>
                                <h5 style={{margin: 0, marginTop:'5px',padding: 0, width:'fit-content'}}>
                                    +7 (960) 067-01-08
                                </h5>
                            </div>
                            <CallOutlinedIcon sx={{color: '#ff6429', fontSize:'50px'}}/>
                        </div>
                    </div>
                    <div className="aimcol" style={{position: 'relative',alignItems: 'center', width:'350px',}}>
                        <span style={{fontSize: '20px'}}>Эл. почта:</span>
                        <div className="aimrow" style={{alignItems:'center', height: '100%', width:'100%', justifyContent:'flex-start'}}>
                            <EmailOutlinedIcon sx={{color: '#ff6429', fontSize:'50px'}}/>
                            <div className="aimcol" style={{padding:'20px', alignItems: 'flex-end'}}>
                                <h5 style={{margin: 0, padding: 0, width:'fit-content'}}>
                                    fenixklapan@yandex.ru
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='aimrow' style={{justifyContent: 'center', gap:'200px', paddingTop: '20px', borderTop: '1px solid #edf0f6',borderBottom: '1px solid #edf0f6'}}>
                    <div className="aimcol" style={{position: 'relative',alignItems: 'center', width:'350px',}}>
                        <span style={{fontSize: '20px'}}>Наш адрес:</span>
                        <div className="aimrow" style={{alignItems:'center', height: '100%', width:'100%', justifyContent:'flex-end'}}>
                            <div className="aimcol" style={{padding:'20px', alignItems: 'flex-end'}}>
                                <h5 style={{margin: 0, padding: 0, width:'fit-content', textAlign: 'right', lineHeight: '1.4rem'}}>
                                    г. Москва, м.Фили,
                                    <br/>
                                    Промышленный проезд, д.5, к.1
                                </h5>
                            </div>
                            <LocationOnOutlinedIcon sx={{color: '#ff6429', fontSize:'50px'}}/>
                        </div>
                    </div>
                    <div className="aimcol" style={{position: 'relative',alignItems: 'center', width:'350px',}}>
                        <span style={{fontSize: '20px'}}>Время работы:</span>
                        <div className="aimrow" style={{alignItems:'center', height: '100%', width:'100%', justifyContent:'flex-start'}}>
                            <EventNoteOutlinedIcon sx={{color: '#ff6429', fontSize:'50px'}}/>
                            <div className="aimcol" style={{padding:'20px', alignItems: 'flex-end'}}>
                                <h5 style={{margin: 0, padding: 0, width:'fit-content'}}>
                                    Пн - Пт:&emsp;&emsp;10:00-18:00
                                </h5>
                                <h5 style={{margin: 0, marginTop:'5px',padding: 0, width:'fit-content'}}>
                                    Сб - Вс:&ensp;выходные дни
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop:'60px'}}>
                <div className="aimrow" style={{justifyContent: 'center'}}>
                    <div className="aimcol">
                        <span style={{fontSize: '25px'}}>Мы на карте</span>
                    </div>
                </div>
                <div className="aimrow" style={{marginTop:'40px', justifyContent: 'center', gap:'100px', padding: '20px', borderBottom: '1px solid #edf0f6'}}>
                    <YMaps>
                        <div className="aimcol">
                            <span style={{fontSize: '20px'}}>
                                Производство оборудования в г. Казань
                            </span>
                            пос. Новониколаевский, «Индустриальный парк М-7»
                            <div style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                <Map 
                                    defaultState={{ 
                                        center: [55.84076, 49.03803], 
                                        zoom: 10,
                                        controls: ['zoomControl', 'fullscreenControl']
                                    }} 
                                    modules={['control.ZoomControl', 'control.FullscreenControl']}
                                    style={{width:'500px', height:'300px'}}
                                >
                                    <Placemark 
                                        modules={['geoObject.addon.balloon']} 
                                        defaultGeometry={[55.892660, 48.967989]} 
                                        options={{iconColor: '#ff6429'}}
                                        properties={{
                                            balloonContentBody: 'Россия, Республика Татарстан, Зеленодольский район, территория Промышленная Площадка Индустриальный Парк М7'
                                        }} 
                                    />
                                </Map>
                            </div>
                        </div>
                        <div className="aimcol">
                            <span style={{fontSize: '20px'}}>
                                Склад в г. Москва
                            </span>
                            м.Фили, Промышленный проезд, д.5, к.1
                            <div style={{paddingTop:'20px', paddingBottom:'20px'}}>
                                <Map 
                                    defaultState={{ 
                                        center: [55.740940, 37.513985], 
                                        zoom: 14,
                                        controls: ['zoomControl', 'fullscreenControl']
                                    }} 
                                    modules={['control.ZoomControl', 'control.FullscreenControl']}
                                    style={{width:'500px', height:'300px'}}
                                >
                                    <Placemark 
                                        modules={['geoObject.addon.balloon']} 
                                        defaultGeometry={[55.741235, 37.510149]} 
                                        options={{iconColor: '#ff6429'}}
                                        properties={{
                                            balloonContentBody: 'Россия, Москва, Промышленный проезд, 5с1'
                                        }} 
                                    />
                                </Map>
                            </div>
                        </div>
                    </YMaps>
                </div>
            </div>
        </>
    );
}