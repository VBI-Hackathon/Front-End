import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, FormControl, TextField, Button, Input } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSubstrate } from 'libs/substrate/substrate.context';
import { SubtrateService } from 'libs/utils/service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const registerSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
});
export function RegisterPage() {
  const { refreshInfo, api, accountSelected } = useSubstrate();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      address: '',
    },
    validationSchema: registerSchema,
    onSubmit: values => {
      setLoading(true);
      const svc = SubtrateService(api, accountSelected);

      svc.registerUser(values.username, values.address).then(res => {
        setTimeout(() => {
          setLoading(false);
          refreshInfo();
          navigate('/');
          toast.success('Đăng kí thành công', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            onClose: () => {},
          });
        }, 6000);
      });

      // setTimeout(() => {
      //   setTimeout(() => {
      //     refreshInfo();
      //   }, 500);
      //   navigate('/');
      // }, 2000);
    },
  });

  return (
    <Box sx={{ p: '20px' }}>
      <Helmet>
        <title>Farmer</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      {!loading && (
        <>
          <FormControl fullWidth sx={{ mt: '40px' }} variant="standard">
            <TextField
              label="Tài khoản"
              name="username"
              value={formik.values.username}
              error={!!formik.errors.username}
              onChange={formik.handleChange}
              size="small"
            />
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
            <TextField
              label="Địa chỉ"
              name="address"
              value={formik.values.address}
              error={!!formik.errors.address}
              onChange={formik.handleChange}
              size="small"
            />
          </FormControl>
          <Box mt="40px" display="flex" justifyContent="center">
            <Button
              disabled={loading}
              variant="outlined"
              onClick={() => {
                formik.handleSubmit();
              }}
            >
              Tạo tài khoản
            </Button>
          </Box>
        </>
      )}
      {!!loading && <Box>Đang xử lý tài khoản, vui lòng chờ...</Box>}
    </Box>
  );
}
