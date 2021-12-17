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
import { METHODS_RPC } from 'libs/utils/constants';
import { ProductInfo } from 'libs/utils/model';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

export function ProductDetailPage(xxx) {
  const params = useParams();
  const hashId = params.id;
  const { api } = useSubstrate();
  const [prodRouting, setProdRouting] = useState<ProductInfo[]>([]);
  const [prodInfo, setProdInfo] = useState<any>({});
  const [prodRoutingLoading, setProdRoutingLoading] = useState(true);
  const [prodInfoLoading, setProdInfoLoading] = useState(true);

  useEffect(() => {
    if (!hashId) return;
    const fetchRouting = async () => {
      setProdRoutingLoading(true);
      try {
        const prodRouting = await api.query[METHODS_RPC.traceAbility.key][
          METHODS_RPC.traceAbility.methods.logInfosOwned
        ](hashId);
        if (!!prodRouting) {
          setProdRouting(prodRouting.toJSON() as unknown as ProductInfo[]);
        }
      } catch (error) {
        console.log({ error });
      }
      setProdRoutingLoading(false);
    };
    const fetchInfo = async () => {
      setProdInfoLoading(true);
      try {
        const prodInfo = await api.query[METHODS_RPC.traceAbility.key][
          METHODS_RPC.traceAbility.methods.logInfos
        ](hashId);
        if (!!prodInfo) {
          setProdInfo(prodInfo.toJSON() as unknown as ProductInfo[]);
        }
      } catch (error) {}
      setProdInfoLoading(false);
    };
    fetchInfo();
    fetchRouting();
  }, [hashId]);

  const routing = useMemo(() => {
    return prodRouting.map(p => {
      return {
        ...p,
        label: `địa điểm ${p.address}`,
        description: `${p.userName} đã quét vào thời gian ${p.datetime} bằng tài khoản ${p.owner}`,
      };
    });
  }, [prodRouting]);

  if (!hashId) return null;
  const activeStep = 1;

  return (
    <>
      <Helmet>
        <title>Truy xuất nguồn gốc thực phẩm</title>
        <meta name="description" content="Truy xuất nguồn gốc thực phẩm" />
      </Helmet>
      <Box paddingX="20px" paddingTop="20px">
        {!prodRoutingLoading ? (
          <Box marginBottom="20px">
            <Box>
              <b>Sản phẩm:</b> {prodInfo?.productName}
            </Box>
            <Box>
              <b>Chủ sở hữu:</b> {prodInfo?.owner}
            </Box>
            <Box>
              <b>Được vận chuyển ngày:</b> {prodInfo?.datetime}
            </Box>
          </Box>
        ) : (
          'đang tải thông tin sản phẩm ...'
        )}

        <Box fontWeight="bold">Lộ trình:</Box>
        {!prodInfoLoading ? (
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
