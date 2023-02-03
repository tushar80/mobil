import { useEffect, useState } from "react";
import { Alert, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from "@mui/material/Button";
import axios from "axios";



function SuspendedStaff(props) {

  let apiServerPrefix = "http://localhost:7215/api"
  if (props.staff_type === "customer-care")
    apiServerPrefix += "/Staff"
  else if (props.staff_type === "senior")
    apiServerPrefix += "/SeniorStaff"
  else if (props.staff_type === "security")
    apiServerPrefix += "/SecurityStaff"

  console.log(apiServerPrefix)

  const [suspendedStaff, setSuspendedStaff] = useState([])
  const [loading, setLoading] = useState(false)
  const [snack, setSnack] = useState({ open: false, message: "" })

  useEffect(() => {
    setLoading(true)
    // axios.get(`${apiServerPrefix}/getSuspendedStaff`)
    axios.get('https://randomuser.me/api/?results=5&inc=name,login')
      .then(res => {
        setSuspendedStaff(res.data.results)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const handleRecall = (e) => {
    let id = e.target.name

    // axios.get(apiServerPrefix + '/recallSuspend/' + id)
    //   .then(res => {
    //     if (res.status === 200) {
    setSnack({
      open: true,
      message: `Recalled: ${id}`
    })
    setSuspendedStaff(suspendedStaff.filter(s => s.login.uuid !== id))

    //     }
    //   })
    //   .catch(err => console.log(err))
  }

  const handleSnackClose = () => {
    setSnack({ open: false, message: "" });
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={snack.open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleSnackClose}>
        <Alert severity="success">
          Recalled: {snack.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Suspended Staff: {props.staff_type}
        </Typography>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Recall</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                suspendedStaff.map((staff) => (
                  <TableRow key={staff.login.uuid}>
                    <TableCell>{staff.login.uuid}</TableCell>
                    <TableCell align="right">{`${staff.name.first} ${staff.name.last}`}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" name={staff.login.uuid} onClick={handleRecall}>Recall</Button>
                    </TableCell>
                  </TableRow>

                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default SuspendedStaff;
