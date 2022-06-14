import { Icon } from "@mui/material";
import Map from './SVG/map.svg'

const RussiaIcon = (props) => {
    return(
    <Icon sx={{fontSize: '1.3rem'}}>
        <img src={Map} color={props.sx.color} style={{verticalAlign: 'top'}} />
    </Icon>
)}
export default RussiaIcon;