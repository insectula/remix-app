import { useState, useEffect, useRef, forwardRef } from "react";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  Checkbox,
  Collapse,
  InputLabel,
  OutlinedInput as Input, 
  TextField,
  styled,
} from '@mui/material';
import {IMaskInput} from "react-imask";
import PropTypes from 'prop-types';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Bullits from '~/components/modules/bullits';
import Switch from '~/components/elements/switch';
import Filter from '~/assets/PNG/filter.png';
import CheckIcon from '@mui/icons-material/Check';
import dino from '~/assets/PNG/dino.png';
import { Link, useOutletContext, useLocation } from "@remix-run/react";
import Menu from '~/components/modules/menu';


const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
        <IMaskInput
            {...other}
            mask="+7 (%##) ###-####"
            definitions={{
                '%': /[1-9]/,
                '#': /[0-9]/,
            }}
            inputRef={ref}
            variant="outlined"
            onAccept={(value) => onChange({ target: { name: props.name, value } })}
            overwrite
        />
    );
});

TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function ProductCard({data}) {
    const pageLoaded = useLocation();
    const [cartItems, setCartItems, catalog] = useOutletContext();
    const inputRef = useRef(null);
    const scrollHere = useRef(null);
    const [disable, setDisable] = useState(true)
    const [color, setColor] = useState('warning')
    const [error, setError] = useState(false)
    const [agree, setAgree] = useState(false)
    const [sent, setSent] = useState(false)
    const [name, setName] = useState('')
    const [selectedFiles, setSelectedFiles] = useState()
    const [fileName, setFileName] = useState()
    const [progress, setProgress] = useState()
    const [message, setMessage] = useState()
    const [values, setValues] = useState({
        textmask: '(#__) ___-____',
        numberformat: '1320',
    });
    
    const CssTextField = styled(TextField, {
        shouldForwardProp: (props) => props !== "focusColor"
      })((p) => ({
        // input label when focused
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: p.focusColor
            }
          }
      }));

    const handleClick = () => {
        console.log('handleClick')
        if ((values.textmask === '+7 (') || values.textmask.length < 17) {
            console.log('phone error')
            setError(true);
            setDisable(true);
        }
        else {
        console.log('sending...')
        setError(false);
        setDisable(false);
        console.log(name, values.textmask);
        setSent(true);
        }
    }
    const handleName = (e) => {
        setName(e.target.value)
    }

      const handleMessageChange= event => {
        setMessage(event.target.value)
      };
      const submitHandler = e => {
        e.preventDefault() //prevent the form from submitting
        let formData = new FormData()
      
        formData.append("file", selectedFiles[0])
        /*axiosInstance.post("/upload_file", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          },
        })*/
      }

    const handleChange = (e) => {
        if ((values.textmask === '+7 (') || values.textmask.length < 17) {
            setDisable(true);
        } else {
            setDisable(false);
        }
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
        setError(false);
        setColor('warning')
    };

    const resetFileInput = () => {
        inputRef.current.value = null;
        setFileName(); 
        setSelectedFiles();
    };

    const handleCheck = () => {
        setAgree(!agree)
    }

    const truncate = (str) => {
        return (str.length > 30) ? '...' + str.substr(6) : str;
    }
    const HiddenConent = ({ content }) => {
      const [showMore, setShowMore] = useState(false);
      const handleShowMore = () => {
          setShowMore(!showMore);
          !showMore && setTimeout(() => { window.scrollTo({ top: (document.body.scrollHeight / 2), behavior: 'smooth' }) }, 50)
          !showMore && setTimeout(() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }, 250)
      }
    


      useEffect(() => {
        if ((values.textmask === '+7 (') || values.textmask.length < 17) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [values])

      return (
          
              <MuiAccordion disableGutters={true} square sx={{ margin: 0, padding: 0, boxShadow: 'none', background: 'transparent', cursor: 'default' }}>
                  <MuiAccordionSummary
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      onClick={handleShowMore}
                      sx={{ width: 'auto', padding: 0, margin: 0, height: '25px', }}
                  >
                      <Typography sx={{ color: '#ff6429', borderBottom: '1px dotted #ccc', cursor: 'pointer', lineHeight: 1, '&:hover': { color: '#555', borderBottom: '1px dotted #ff6429' } }}>{showMore ? 'cкрыть' : 'больше информации'}</Typography>
                  </MuiAccordionSummary>
                  <MuiAccordionDetails sx={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  none
                  </MuiAccordionDetails>
              </MuiAccordion>
      )
    }
    const search = (inputArray, id) => {
      console.log('search for', id)
      console.log('in', inputArray)
      for (let i = 0; i < inputArray.length; i++) {
          if (inputArray[i].productId === id) {
              console.log('found', inputArray[i], i)
              return [inputArray[i], i];
          }
      } console.log('search void')
      return [false, false];
    }
    const addToCart = (itemData) => {
      console.log('addToCart')
      let data = []
      if (localStorage.getItem('products')) {
          data = JSON.parse(localStorage.getItem('products'));
      }
      console.log('DATA RECIEVED', data)
      const id = itemData.id;
      console.log('event', event)
      console.log('GOT ID', id)
      let [item, key] = search(data, id)
      console.log(itemData)
      if (id) {
      if (data.length === 0) {
          data.push({ productId: id, qty: 1, data: itemData })
      } else if (item === false) {
          data.push({ productId: id, qty: 1, data: itemData })
      } else if (item.productId === id) {
          console.log(data[key].qty)
          data[key].qty = isNaN(data[key].qty) ? (1) : (data[key].qty + 1);
      }}
      console.log('DATA TO SEND', data)
      setCartItems(data);
      localStorage.setItem('products', JSON.stringify(data));
    }
    
      return (
        <>
          <Bullits/>
  
          <div className="pageTitle">
                <span style={{fontSize: '30px'}}>Каталог</span>
          </div>
        <Menu catalog={catalog}/>
          <div style={{marginTop: '20px', marginLeft: '-82px', marginRight: '-82px', backgroundColor: '#edf0f6', }}>
              <div style={{
                  position: 'relative', zIndex: 50, padding: '30px', display: 'flex', justifySelf: 'flex-start', flexDirection: 'column',
                  backgroundImage: `url(${data.product.picture})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'top right'
              }}>

                  <div className='row' style={{ justifyContent: 'center', background: `url(${Filter})`, backgroundSize: '150%' }}>
                      <div style={{
                        minWidth: '80%',
                          width: '600px',
                          marginLeft: 'auto', marginRight: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                      }}>
                        {data.product?<>
                          <div ref={scrollHere} style={{ width: '100%', display: 'flex' }}>
                              <span style={{ position: 'relative', zIndex: 50, fontSize: '38px', fontWeight: 600 }}> {data.product.title}  </span>
                          </div>
                          <div className='row' style={{ justifySelf: 'flex-start', width: '100%' }}>
                              {data.product.filter !== 'none' && <Switch
                                  left="Без возвратной пружины"
                                  color="warning"
                                  right="С возвратной пружиной"
                                  callback=""
                              />}
                          </div>
                          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                              <span 
                              style={{ textAlign: 'left', marginTop: '15px', width: '600px', fontSize: '16px', fontWeight: 400 }}
                              dangerouslySetInnerHTML={{ __html: data.product.content }} />
                              {data.product.hidden !== 'none' ? <HiddenConent content={data.product.hidden}/> : <div style={{marginTop: '20px'}}/>}
                              <Button onClick={() => addToCart({id: data.product.name, picture: data.product.picture, title: data.product.title, link: '/Каталог/' + (('categoryId' in data.params) ? data.params.categoryId + '/' : 'электроприводы/') + (('subCategoryId' in data.params && data.params.subCategoryId !== data.product.name) ? data.params.subCategoryId + '/' : '') + data.product.name})} sx={{ alignSelf: "flex-start", width: '180px', height: '35px', fontFamily: 'Roboto', fontWeight: 400, fontSize: '.75rem', borderRadius: 0, color: 'white', backgroundColor: '#ff6429', '&:hover': { backgroundColor: '#d67f06' } }}>добавить в корзину</Button>
                          </div>
                          </>:<>
                          <div style={{ width: '100%', display: 'flex' }}>
                              <span style={{ position: 'relative', zIndex: 50, fontSize: '38px', fontWeight: 400 }}> Товар не найден :( </span>
                          </div>
                          <div className="notFound" style={{backgroundImage: `url(${dino})`}}/>
                          </>}
                          
                      </div>
                  </div>
              </div>
          </div>
          <Grid container sx={{justifyContent: 'center'}}>
          <Grid item xl={7} sx={{justifyContent: 'flex-end'}}>
                          <div style={{ maxWidth: 'max-content', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: '25px'}}>
                          {data.products.map((item, index) => (
                                <div key={index} style={{borderTop: '1px solid #edf0f6', borderBottom: '1px solid #edf0f6',display: 'flex', alignItems: 'center', justifyContent:'space-between', marginTop: '-1px'}}>
                                    <div style={{float: 'left', fontWeight: 400}}>
                                        <Link 
                                        style={{display: 'flex', alignItems: 'center'}} 
                                        to={'/Каталог/' + (('categoryId' in data.params) ? data.params.categoryId + '/' : 'электроприводы/') + (('subCategoryId' in data.params && data.params.subCategoryId !== data.product.name) ? data.params.subCategoryId + '/' : '') + item.name}
                                        >
                                            <div style={{width: '50px', height:'50px',backgroundImage: `url(${dino})`, backgroundSize: 'cover', backgroundPosition: 'center',backgroundRepeat: 'no-repeat'}}/>
                                            <div style={{width: 'max-content', marginLeft: '20px'}}>
                                                {item.title}
                                            </div>
                                        </Link> 
                                    </div>
                                    <div style={{float: 'right', marginLeft:'40px', marginRight:'40px'}}>
                                        <Button onClick={() => addToCart({id: item.name, picture: item.picture, title: item.title, link: '/Каталог/' + (('categoryId' in data.params) ? data.params.categoryId + '/' : 'электроприводы/') + (('subCategoryId' in data.params && data.params.subCategoryId !== data.product.name) ? data.params.subCategoryId + '/' : '') + item.name})} size="small" sx={{color: 'white', backgroundColor: '#006efb', '&:hover': {backgroundColor: '#0056c5'}}}><AddShoppingCartOutlinedIcon fontSize="small"/></Button>
                                    </div>
                                </div>
                            )
                          )}
                        </div>
                    </Grid>
                    <Grid item container direction="column" xl={5}>
                    {!sent ? (
            <>
            <Typography>
                Оставьте пожалуйста свое имя и номер телефона,<br/>мы скоро свяжемяся с Вами!
            </Typography>
            <FormControl sx={{width:'300px', marginRight:'auto'}} variant="outlined">
                <InputLabel require color={error?"error":"warning"} shrink htmlFor="formatted-text-mask-input" sx={{marginTop: '25px'}}>Телефон*</InputLabel>
                <Input
                error={error}
                autoFocus={false}
                color={color}
                value={values.textmask}
                onChange={handleChange}
                variant="outlined"
                onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                        handleClick();
                    }
                    else if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                        setError(true);
                    } else if (values.textmask.length === 16 && event.key !== 'Enter' && (/[0-9]/.test(event.key))) {
                    setDisable(false);
                    } else if (values.textmask.length < 17) {
                        setDisable(true);
                    }
                    }}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
                sx={{
                    marginTop: '40px' }}
                />
            
                <InputLabel shrink color="info" htmlFor="user-message" sx={{marginTop: '120px'}}>Почта</InputLabel>
                <CssTextField
                id="user-message"
                name="user-message"
                focusColor="rgba(0, 0, 0, 0.6)"
                rows={3}
                sx={{
                    marginTop: '40px' }}
                />
                <Button
                    variant="contained"
                    component="label"

                    sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 400, 
                        fontSize: '.75rem',
                        borderRadius: 0,
                        color: 'white', 
                        boxShadow: 'none', 
                        '&:hover': {boxShadow: 'none'}
                    }}
                    >
                    Загрузить фото
                    <input
                        hidden
                        type="file"
                        accept="image/*"
                        ref={inputRef} 
                        onChange={e => {
                            setSelectedFiles(e.target.files)
                            setFileName(e.target.value)
                          }}
                    />
                    </Button>
                    <Collapse in={fileName} sx={{alignItems:'center', paddingTop:'5px'}}>{fileName&&truncate(fileName.replace(/^.*[\\\/]/, ''))}<div onClick={resetFileInput} style={{float:'right', cursor:'pointer'}}>&times;</div></Collapse>
                <Button
                    disabled={(disable || !agree)}
                    onClick={handleClick}
                    variant="filled"
                    color={color}
                    sx={{
                        marginTop: '25px',
                        width: '100%', 
                        height: '45px', 
                        fontFamily: 'Roboto',
                        fontWeight: 400, 
                        fontSize: '.75rem',
                        borderRadius: 0,
                        color: 'white',
                        backgroundColor: '#ff6429', 
                        '&:hover': 
                            {backgroundColor: '#d67f06'},  
                        '&:disabled':                
                            {backgroundColor: '#ccc'}                         
                    }}
                >
                    Отправить
                </Button>
            
            <div style={{display: 'flex', alignItems:'center', textAlign:'left', fontSize:'12px', marginLeft: '-15px',marginRight: '-15px', marginBottom: '30px'}}>
            <Checkbox checked={agree} onChange={handleCheck} name="privacyPolicy" />
            <span>нажимая на кнопку "отправить" вы соглашаетесь с <Link to="/privacy-policy"><Typography sx={{display: 'inherit',font: 'inherit',textDecoration: 'underline #ccc', '&:hover': {textDecoration: 'underline #ff6429'}}}>политикой конфиденциальности</Typography></Link></span>
            </div>
            </FormControl>

            </>
        ):(
            <>
            <Typography>
                Ваша заявка принята,<br/>мы скоро свяжемяся с Вами!
            </Typography>
            <div style={{width: '300px'}}>
                <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center',height: '139px'}}>
                    <CheckIcon color='success' sx={{fontSize: '100px'}}/>
                </div>
            </div>
            </>
        )}
                    </Grid>
            </Grid>
        </>
      );
    }