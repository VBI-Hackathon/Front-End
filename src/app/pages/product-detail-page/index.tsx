import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useSubstrate } from 'libs/substrate/substrate.context';
import { hexToAscii } from 'libs/utils/common';
import { ProductInfo } from 'libs/utils/model';
import { SubtrateService } from 'libs/utils/service';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { AccountRegisterBtn } from 'app/components/account-register';

export function ProductDetailPage() {
  const params = useParams();
  const hashId = params.id as string;
  const { api, apiState, accountSelected, accountInfo } = useSubstrate();
  const [prodRouting, setProdRouting] = useState<ProductInfo[]>([]);
  const [prodRoutingLoading, setProdRoutingLoading] = useState(true);
  const [blockLoading, setBlockLoading] = useState(false);

  const routing = useMemo(() => {
    return prodRouting.map(p => {
      const time = dayjs(p.datetime * 1000).format('HH:mm:ss DD/MM/YYYY');
      return {
        ...p,
        label: `địa điểm ${hexToAscii(p.address)}`,
        time,
        description: `${hexToAscii(
          p.userName,
        )} đã quét vào thời gian [${time}] bằng tài khoản ${p.owner}`,
      };
    });
  }, [prodRouting]);

  const isChecked = useMemo(() => {
    return prodRouting.some(r => r.owner === accountSelected.address);
  }, [prodRouting, accountSelected]);

  const prodInfo = useMemo(() => {
    return routing[0] || {};
  }, [routing]);

  const updateRouting = async () => {
    setBlockLoading(true);
    const svc = SubtrateService(api, accountSelected);
    svc.updateAbility(hashId).finally(() => {
      setInterval(() => {
        setBlockLoading(false);
        window.location.reload();
      }, 7000);
    });
  };

  useEffect(() => {
    if (!hashId || apiState !== 'READY') return;
    const fetchRouting = async () => {
      setProdRoutingLoading(true);
      try {
        const svc = SubtrateService(api);
        const prodRouting = await svc.logInfosOwned(hashId);
        if (!!prodRouting) {
          setProdRouting(prodRouting.toJSON() as unknown as ProductInfo[]);
        }
      } catch (error) {
        alert('Lỗi hệ thống, Vui lòng refresh page');
        console.log({ error });
      }
      setProdRoutingLoading(false);
    };
    setTimeout(() => {
      fetchRouting();
    }, 200);
  }, [hashId, api, apiState]);

  if (!hashId) return null;

  return (
    <>
      <Helmet>
        <title>Truy xuất nguồn gốc thực phẩm</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      {!isChecked && !!accountInfo && (
        <>
          <Box py="10px" display="flex" justifyContent="center">
            {!!blockLoading &&
              'Vui lòng chờ, đang xử cập nhập thông tin lô hàng ...'}
            {!blockLoading && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  updateRouting();
                  // formik.handleSubmit();
                }}
              >
                Đã nhận lô hàng
              </Button>
            )}
          </Box>
          <hr />
        </>
      )}

      <AccountRegisterBtn />

      <Box paddingX="20px" paddingTop="20px">
        {!prodRoutingLoading ? (
          <Box marginBottom="20px">
            <Box>
              <b>Sản phẩm:</b>
              {' ' + hexToAscii(prodInfo?.productName)}
            </Box>
            <Box>
              <b>Chủ sở hữu:</b> {prodInfo?.owner}
            </Box>
            <Box>
              <b>Được vận chuyển vào:</b> {prodInfo?.time}
            </Box>
          </Box>
        ) : (
          'đang tải thông tin sản phẩm ...'
        )}

        <Box fontWeight="bold">Lộ trình:</Box>
        {!prodRoutingLoading ? (
          <Stepper
            activeStep={Math.max(0, routing.length - 1)}
            orientation="vertical"
          >
            {routing.map((step, index) => (
              <Step key={step.label} expanded={true}>
                <StepLabel
                // optional={
                //   index === 2 ? (
                //     <Typography variant="caption">Last step</Typography>
                //   ) : null
                // }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        ) : (
          'Đang tải thông tin lộ trình'
        )}
      </Box>
    </>
  );
}
