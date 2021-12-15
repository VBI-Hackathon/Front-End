import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, FormControl, TextField, Button, Input } from '@mui/material';

const IInput: any = Input;

export function FarmerPage() {
  const [famerName, setFarmerName] = useState('');
  const [productName, setProductName] = useState('');
  const [note, setNote] = useState('');
  const [quantity, setQuantity] = useState('');

  const onChangeFamerName = text => setFarmerName(text.target.value);
  const onChangeProductName = text => setProductName(text.target.value);
  const onChangeNote = text => setNote(text.target.value);
  const onChangeQuantity = text => setQuantity(text.target.value);
  return (
    <Box sx={{ p: 1 }}>
      <Helmet>
        <title>Farmer</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>

      <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
        <TextField
          label="Farmer name"
          id="outlined-size-small"
          value={famerName}
          onChange={onChangeFamerName}
          size="small"
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
        <TextField
          label="Product name"
          id="outlined-size-small"
          defaultValue={productName}
          onChange={onChangeProductName}
          size="small"
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
        <TextField
          label="Note"
          id="outlined-size-small"
          defaultValue={note}
          onChange={onChangeNote}
          size="small"
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
        <TextField
          label="Quantity"
          id="outlined-size-small"
          defaultValue={quantity}
          onChange={onChangeQuantity}
          size="small"
          type="number"
        />
      </FormControl>
      <Box mt="20px" display="flex" justifyContent="center">
        <label htmlFor="contained-button-file">
          <IInput
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </Box>
      <Box mt="80px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            console.log('Create batch no!');
          }}
        >
          Create batch no
        </Button>
      </Box>
    </Box>
  );
}
