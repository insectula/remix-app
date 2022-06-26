import * as React from 'react';
import {Link} from "@remix-run/react";
import {IMaskInput} from "react-imask";
import {    
    Button,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText,
    Checkbox,
    FormControl, 
    InputLabel,
    OutlinedInput as Input, 
    TextField,
    ToggleButton, 
    ToggleButtonGroup,
    Typography, 
    IconButton} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PropTypes from 'prop-types';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
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


function useForceUpdate(){
    const [renders, setRenders] = React.useState(0);
    return () => setRenders(renders => renders + 1); // update the state to force render
  }

export default function CartModal (props) {
  const forceUpdate = useForceUpdate();
  //const [cart, setCart] = props.contents
  const [cartItems, setCartItems] = props.context;
  const[disable, setDisable] = React.useState(true);
  const [color, setColor] = React.useState('warning');
  const [error, setError] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [values, setValues] = React.useState({
      textmask: '(#__) ___-____',
      numberformat: '1320',
  });
  const [delivery, setDelivery] = React.useState('web');
  const handleDelivery = (event, newDelivery) => {
    setDelivery(newDelivery);
  }




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
    console.log('handleName')
      setName(e.target.value)
  }
  const handlePhoneChange = (e) => {
    console.log('handlePhoneChange')
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


  const handleCheck = () => {
      setAgree(!agree)
  }


  const clearAll= () => {
    setCartItems([])
    localStorage.setItem('products', JSON.stringify([]));
    forceUpdate();
  }

  const handleQtyChange = (e, index) => {
    const id = e.target.name
    console.log('changeQty', e.target.value,)
    let data = [...cartItems]
    if (e.target.value > 0) {data[index].qty = e.target.value;
        setCartItems(data)
        localStorage.setItem('products', JSON.stringify(data));
        forceUpdate();
    } else props.removeItem(id)
}



    /*React.useEffect(() => {
        console.log(cartItems);
        //let data = [...cartItems]
        //localStorage.setItem('products', JSON.stringify(data));
    },[cartItems])



  /*React.useEffect(() => {
    console.log('useEffect cart')
    let data = [...cart]
    console.log('DATA =', data)
 
    Object.entries(data).map(([key, value]) => (
        data2 = [...data2, {productId: key, qty: value}]
    ));
    setCartItems(data2)
    console.log('CartItems =', cartItems)
  }, [cart])*/

  React.useEffect(() => {
    console.log('useEffect phone')
      if ((values.textmask === '+7 (') || values.textmask.length < 17) {
          setDisable(true);
      } else {
          setDisable(false);
      }
  }, [values])

    return(
        <Dialog open={props.open} onClose={props.handleClose} maxWidth="lg" sx={{textAlign: 'center'}}>
        <DialogContent sx={{padding:0}}>
        
        
    <div className="aimrow" style={{alignItems: 'stretch'}}>
        <div className="aimcol" style={{paddingLeft:'15px',width: cartItems.length > 0?'70%':'150px'}}>
            <DialogTitle sx={{justifySelf:'flex-start'}}>
                Корзина
            </DialogTitle>
            <div className="aimrow" style={{alignItems: 'center'}}>
                <div className="aimcol">
                    Товары
                </div>
                <div className="col cart-hr"/>
            </div>
            <div className="aimcol" style={{padding:'15px', margin:0}}>
            {cartItems.map((item, index) => (
                <div key={index} className="aimrow" style={{justifyContent:'space-between',alignItems:'center',textAlign: 'left', marginTop:'10px'}}>
                    <div style={{float: 'left', fontWeight: 600}}>
                        <Link className="aimrow" 
                        style={{alignItems: 'center'}} 
                        to={item.data.link}
                        >
                            <div style={{width: '80px', height:'50px',backgroundImage: `url(${item.data.picture})`, backgroundSize: 'cover', backgroundPosition: 'right',backgroundRepeat: 'no-repeat'}}/>
                            <div style={{width: 'max-content', marginLeft: '20px'}}>
                                {item.data.title}
                            </div>
                        </Link>
                    </div>
                    <div className="aimrow" style={{float: 'right',}}>
                        <TextField
                            id="standard-number"
                            type="number"
                            name={item.productId}
                            label="кол-во"
                            value={item.qty}
                            onChange={(event) => handleQtyChange(event, index)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            size="small"
                            sx={{width: '75px', marginLeft: '10px'}}
                        /><IconButton onClick={() => props.removeItem(item.productId)} size="small" sx={{'&:hover':{backgroundColor: 'white', color: '#555'}}}><CancelOutlinedIcon fontSize="medium"/></IconButton>
                    </div>
                </div>)
            )}
            
            </div>

            {cartItems.length > 0 && (<>
                <div  className="aimrow" style={{justifyContent: 'flex-end'}}>
            <button onClick={clearAll} style={{border: 'none', background: 'none', boxShadow:'none'}}>
                <Typography  sx={{width: '140px',color: '#555',borderBottom: '1px dotted #ff6429', cursor: 'pointer', lineHeight: 1, '&:hover': {color: '#555',borderBottom: '1px dotted #ff6429'}}}>очистить корзину</Typography>
            </button>
            </div>
            <div className="aimrow" style={{alignItems: 'center'}}>
                <div className="aimcol" style={{minWidth:'fit-content'}}>
                    Способ получения
                </div>
                <div className="col cart-hr"/>
            </div>
            <div className="aimcol" style={{alignItems:'center',padding:'15px', margin:0}}>
                <ToggleButtonGroup
                    color="primary"
                    value={delivery}
                    exclusive
                    onChange={handleDelivery}
                    size="small"
                >
                    <ToggleButton size="small" value="web">Доставка</ToggleButton>
                    <ToggleButton size="small" value="android">Самовывоз из терминала</ToggleButton>
                    <ToggleButton size="small" value="ios">Самовывоз со склада</ToggleButton>
                </ToggleButtonGroup>
            </div></>)}
        </div>
          <div className="aimcol" style={{backgroundColor: '#edf0f6', marginLeft:'auto', padding:'20px'}}>
          <div onClick={props.handleClose} style={{fontSize: '24px',marginTop:'-20px', marginRight: "-10px", textAlign: 'right'}}><span style={{cursor: 'pointer'}}>&times;</span></div>  
          <FormControl sx={{marginTop: '25px', width:'300px', marginRight:'auto'}} variant="outlined">
            <InputLabel color="warning" shrink htmlFor="name">Имя</InputLabel>
                <Input
                    disabled={cartItems.length > 0?false:true}
                    autoFocus={false}
                    id="name"
                    color='warning'
                    type="name"
                    value={name}
                    onChange={handleName}
                    variant="outlined"
                    sx={{ 'label + &': {
                        marginTop: '15px',
                      }}}
                />
            </FormControl>
            <FormControl sx={{marginTop: '25px', width:'300px', marginRight:'auto'}} variant="outlined">  
                <InputLabel require color={error?"error":"warning"} shrink htmlFor="formatted-text-mask-input">Телефон*</InputLabel>
                <Input
                error={error}
                disabled={cartItems.length > 0?false:true}
                autoFocus={false}
                color={color}
                value={values.textmask}
                onChange={handlePhoneChange}
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
                    marginTop: '15px' }}
                />
                <Button
                    disabled={(cartItems.length === 0 || disable || !agree)}
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
                    Оформить заказ
                </Button>
            
            <div style={{display: 'flex', alignItems:'center', textAlign:'left', fontSize:'12px', marginLeft: '-15px',marginRight: '-15px', marginBottom: '30px'}}>
            <Checkbox disabled={cartItems.length > 0?false:true} checked={agree} onChange={handleCheck} name="privacyPolicy" />
            <span style={{color: cartItems.length > 0?'#555':'#ccc'}}>нажимая на кнопку "оформить заказ" вы соглашаетесь с <Link to="/privacy-policy"><Typography sx={{color: cartItems.length > 0?'#555':'#ccc', display: 'inherit',font: 'inherit',textDecoration: 'underline #ccc', '&:hover': {color: '#555',textDecoration: 'underline #ff6429'}}}>политикой конфиденциальности</Typography></Link></span>
            </div>
            </FormControl>
          </div>
          </div>
        </DialogContent>
      </Dialog>
    )
}