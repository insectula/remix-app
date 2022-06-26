import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function (props) {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.callback(event.target.checked)
  };

  return (<div className="row" style={{alignItems:'center', width:'fit-content'}}>
    {props.left}
    <Switch
      color={props.color}
      checked={checked}
      onChange={handleChange}
    />
    {props.right}
    </div>
  );
}