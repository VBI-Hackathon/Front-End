import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, FormControl, TextField, Button, Input } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSubstrate } from 'libs/substrate/substrate.context';
import { SubtrateService } from 'libs/utils/service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { Link } from 'react-router-dom';

const orderingSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  quantity: Yup.number().required('Required'),
  note: Yup.string().required('Required'),
});
export function FarmerPage() {
  const { refreshInfo, api, accountSelected } = useSubstrate();
  const navigate = useNavigate();
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const orderingLink = useMemo(() => {
    if (!hash) return '';
    return window.location.origin + `/product/${hash}`;
  }, [hash]);

  const formik = useFormik({
    initialValues: {
      name: '',
      quantity: 0,
      note: '',
    },
    validationSchema: orderingSchema,
    onSubmit: values => {
      const svc = SubtrateService(api, accountSelected);
      setLoading(true);
      svc
        .createAbility(values.name, values.quantity, values.note)
        .then(async _ => {
          setTimeout(async () => {
            setLoading(false);
            const hashID = await svc.getHashId();
            console.log(hashID.toString());
            console.log('create abit');
            setHash(hashID.toString());
            toast.success('Tạo sản phẩm thành công', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
              onClose: () => {
                // refreshInfo();
                // navigate('/');
              },
            });
          }, 7000);
        });

      // setTimeout(() => {
      //   refreshInfo();
      //   navigate('/');
      // }, 1000);
    },
  });

  return (
    <Box sx={{ p: '20px' }}>
      <Helmet>
        <title>Farmer</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      {!loading && !hash && (
        <>
          <FormControl fullWidth sx={{ mt: '40px' }} variant="standard">
            <TextField
              label="Tên sản phẩm"
              name="name"
              value={formik.values.name}
              error={!!formik.errors.name}
              onChange={formik.handleChange}
              size="small"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <TextField
              label="Số lượng"
              type="number"
              name="quantity"
              value={formik.values.quantity}
              error={!!formik.errors.quantity}
              onChange={formik.handleChange}
              size="small"
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <TextField
              label="mô tả"
              name="note"
              value={formik.values.note}
              error={!!formik.errors.note}
              onChange={formik.handleChange}
              size="small"
              multiline
              rows={3}
            />
          </FormControl>
          <Box mt="40px" display="flex" justifyContent="center">
            <Button
              variant="outlined"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Tạo lô hàng
            </Button>
          </Box>
        </>
      )}
      {!!loading && <Box>Lô hàng đang được tạo, vui lòng chờ...</Box>}
      {!!orderingLink && (
        <Box
          mt="20px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <QRCode value={orderingLink} />
          <Box mt="20px">
            <Link to={`/product/${hash}`}> Xem đơn hàng</Link>
          </Box>
        </Box>
      )}
    </Box>
  );
}
