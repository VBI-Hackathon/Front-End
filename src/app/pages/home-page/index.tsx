import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { selectBottomNav } from 'app/stores/setting-store/selectors';
import { useSubstrate } from 'libs/substrate/substrate.context';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const dispath = useDispatch();
  const { accountInfo } = useSubstrate();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Truy xuất nguồn gốc thực phẩm</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      <Box position="relative">
        <Box mb="10px" p="20px 10px">
          <span>Truy xuất nguồn gốc thực phẩm</span>
          <Box>
            Truy xuất nguồn gốc thực phẩm là gì? Với một định nghĩa ngắn gọn và
            dễ hiểu, truy xuất nguồn gốc là giải pháp cho phép người tiêu dùng
            trực tiếp dễ dàng thu thập thông tin ngược dòng từ sản phẩm cuối
            cùng về nơi sản xuất ban đầu. Giúp người tiêu dùng nhận được thông
            tin xác thực về sản phẩm qua từng công đoạn của quá trình sản xuất,
            chế biến và phân phối.
            <img
              src="https://clv.vn/wp-content/uploads/2019/11/Truy-xuat-nguon-goc-thuc-pham.jpg"
              style={{ maxWidth: '100%' }}
              alt="truy xuat"
            />
            <br /> Xu hướng hiện nay là sử dụng công nghệ thông tin và các thiết
            bị điện tử. Nhằm giúp cho việc cập nhật thông tin, quản lý dữ liệu
            và truy xuất nguồn gốc sản phẩm được thuận lợi. Giải pháp này đặc
            biệt được coi trọng trong an toàn thực phẩm. Tại nhiều nước phát
            triển, truy xuất nguồn gốc là yếu tố quan trọng và bắt buộc đối với
            nhiều loại sản phẩm. Trong đó được quan tâm nhất là vẫn là các mặt
            hàng thực phẩm.
          </Box>
        </Box>
        {!accountInfo && (
          <Box
            position="absolute"
            display="flex"
            bgcolor="#0000008d"
            top={0}
            left={0}
            width={1}
            height={1}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/register');
                }}
              >
                Đăng kí tài khoản
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
