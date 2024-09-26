import React, { useState } from 'react';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import TechnoxLogo from '../../../public/images/logo/logo.png'; // Replace with actual path to your logo
import StyledTableCell from '@mui/material/TableCell';

const InvoiceContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  border: '1px solid #ddd',  // Fix the border property here
  borderRadius: theme.shape.borderRadius,
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'uppercase',
  textAlign: 'center',
}));

const DetailsBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'center',
}));

const PartyDetails = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(3), // Adjust margin as needed
  textAlign: 'left',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Footer = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  marginTop: theme.spacing(2),
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  gridColumn: '1',
  gridRow: 'span 2',
  justifySelf: 'start',
  alignSelf: 'center',
}));

const LogoImage = styled('img')({
  width: '150px', // Adjust the width as per your requirement
  height: 'auto',
});

const data = [
  {
    sno: 1,
    description: "Google workspace for 5 Mail ID's",
    qty: 5,
    rate: 2543,
    amount: 13140,
  },
  {
    sno: 2,
    description: 'Professional Charge',
    qty: 1,
    rate: 2000,
    amount: 2000,
  },
];

function TaxInvoice() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-001');
  const [invoiceDate, setInvoiceDate] = useState('28 June 2024');
  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
  const tax = totalAmount * 0.09;
  const grandTotal = totalAmount + tax * 2;
  const displayAmount = 15140.00;

  return (
    <InvoiceContainer maxWidth="md">
      <Header>
        <Box />
        <Box>
          <Title variant="h4">Tax Invoice</Title>
        </Box>
        <Box textAlign="right">
          <Typography variant="body1">{`Invoice No: ${invoiceNumber}`}</Typography>
          <Typography variant="body1">{`Date: ${invoiceDate}`}</Typography>
        </Box>
      </Header>
      <Box display="grid" gridTemplateColumns="auto 1fr" gridGap={20}>
        <LogoContainer>
          <LogoImage src={TechnoxLogo} alt="Technox Logo" />
        </LogoContainer>
        <DetailsBox sx={{marginRight:'90px'}}>
          <Typography variant="h6" style={{ color: '#1976d2', fontSize: '1.4rem', marginBottom: '8px' }}>TECHNOX TECHNOLOGIES</Typography>
          <Typography style={{ fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
            D.No. 54, 1st Floor, Bharathi Park Rd, 7th cross,<br />
            Saibaba Colony, Coimbatore - 641011<br />
          </Typography>
          <Typography variant="body1" style={{ color: '#FFA726', fontSize: '1rem' }}>
            GSTIN: 33AASFT4193M1ZF
          </Typography>
        </DetailsBox>
      </Box>
      <Divider />
      <PartyDetails>
        <Typography variant="h6" gutterBottom>
          Party's Name: M/s. Yagna Group
        </Typography>
        <Typography>
          97-104, Sree Narayana Guru Rd, Nesavaalar Colony,<br />
          Saibaba Colony, Coimbatore, Tamil Nadu 641011<br />
          GSTIN: 33AACFY2997E1ZZ
        </Typography>
      </PartyDetails>
      <Divider />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">S.No</StyledTableCell>
              <StyledTableCell>Particulars (Descriptions)</StyledTableCell>
              <StyledTableCell align="right">Qty</StyledTableCell>
              <StyledTableCell align="right">Rate</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="right">{row.sno}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">{row.rate.toFixed(2)}</TableCell>
                <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {/* Adding 8 empty rows */}
            {[...Array(8)].map((_, index) => (
              <TableRow key={`empty-${index}`}>
                <TableCell colSpan={5}>&nbsp;</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell rowSpan={4} colSpan={3}>
                <Typography variant="body2" style={{ whiteSpace: 'pre-wrap' }}>
                  Account Details:
                  {"\n"}Name : Technox Technologies
                  {"\n"}Ac/No : 174502000000577
                  {"\n"}Bank : Indian Overseas Bank
                  {"\n"}Type : Business Account
                  {"\n"}IFSC : IOBA0001745
                  {"\n"}Branch : Vadavalli
                </Typography>
              </TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">{displayAmount.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">CGST @ 9%</TableCell>
              <TableCell align="right">{tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">SGST @ 9%</TableCell>
              <TableCell align="right">{tax.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">Grand Total</TableCell>
              <TableCell align="right">{grandTotal.toFixed(2)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Footer>
        <Typography variant="body2">
          Total Amount (INR - In Words): Seventeen Thousand Eight Hundred and Sixty Five only.
        </Typography>
      </Footer>
    </InvoiceContainer>
  );
}

export default TaxInvoice;
