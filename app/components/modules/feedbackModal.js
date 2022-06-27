import * as React from 'react';
import {Link} from "@remix-run/react";
import {IMaskInput} from "react-imask";
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';

import { 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText,
    Checkbox,
    Collapse,
    FormControl, 
    InputLabel,
    OutlinedInput as Input, 
    TextField,
    Typography,
    styled
} from "@mui/material";



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


export default function FeedbackModal(props) {
    const inputRef = React.useRef(null);
    const [disable, setDisable] = React.useState(true)
    const [color, setColor] = React.useState('warning')
    const [error, setError] = React.useState(false)
    const [agree, setAgree] = React.useState(false)
    const [sent, setSent] = React.useState(false)
    const [name, setName] = React.useState('')
    const [selectedFiles, setSelectedFiles] = React.useState()
    const [fileName, setFileName] = React.useState()
    const [progress, setProgress] = React.useState()
    const [message, setMessage] = React.useState()
    const [values, setValues] = React.useState({
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

    React.useEffect(() => {
        if ((values.textmask === '+7 (') || values.textmask.length < 17) {
            setDisable(true);
        } else {
            setDisable(false);
        }
    }, [values])

    return(
        <Dialog open={props.open} onClose={props.handleClose} sx={{textAlign: 'center'}} PaperProps={{sx: {backgroundColor: "#edf0f6"}}}>
        <div onClick={props.handleClose} style={{fontSize: '24px',width: '98%', textAlign: 'right'}}><span style={{cursor: 'pointer'}}>&times;</span></div>    
        <DialogTitle  sx={{alignItems: 'center'}}>Заявка на обратный звонок</DialogTitle>
        <DialogContent sx={{width: '500px'}}><center>
        {!sent ? (
            <>
            <DialogContentText>
                Оставьте пожалуйста свое имя и номер телефона,<br/>мы скоро свяжемяся с Вами!
            </DialogContentText>
            <FormControl sx={{marginTop: '25px', width:'300px', marginRight:'auto'}} variant="outlined">
            <InputLabel color='info' shrink htmlFor="name">Имя</InputLabel>
                <CssTextField
                    autoFocus={false}
                    id="name"
                    focusColor="rgba(0, 0, 0, 0.6)"
                    type="name"
                    value={name}
                    onChange={handleName}
                    variant="outlined"
                    sx={{ 'label + &': {
                        marginTop: '15px',
                      }}}
                />
            </FormControl>
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
            
                <InputLabel shrink color="info" htmlFor="user-message" sx={{marginTop: '120px'}}>Ваше сообщение</InputLabel>
                <CssTextField
                id="user-message"
                name="user-message"
                focusColor="rgba(0, 0, 0, 0.6)"
                multiline
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
            <DialogContentText>
                Ваша заявка принята,<br/>мы скоро свяжемяся с Вами!
            </DialogContentText>
            <div style={{width: '300px'}}>
                <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center',height: '139px'}}>
                    <CheckIcon color='success' sx={{fontSize: '100px'}}/>
                </div>
                <Button
                    onClick={props.handleClose}
                    variant="filled"
                    color={color}
                    sx={{
                        marginTop: '15px',
                        marginBottom: '30px',
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
                    }}
                >
                    Закрыть
                </Button>
            </div>
            </>
        )}
        </center>
        </DialogContent>
      </Dialog>
    )
}