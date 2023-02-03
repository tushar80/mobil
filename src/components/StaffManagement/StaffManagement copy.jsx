import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Button, Typography, Box, Stack, TextField, MenuItem, Divider, Backdrop, CircularProgress, Snackbar, Alert } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { Link } from "react-router-dom";

import BorderedSection from "../utils/BorderedSection";


function StaffManagement(props) {

  let apiServerPrefix = "https://localhost:7215/api"
  if (props.staff_type === "customer-care")
    apiServerPrefix += "/Staff"
  else if (props.staff_type === "senior")
    apiServerPrefix += "/SeniorStaff"
  else if (props.staff_type === "security")
    apiServerPrefix += "/SecurityStaff"


  const [staffid, setStaffid] = useState('');
  const [allStaff, setAllStaff] = useState([])
  const [loading, setLoading] = useState(false)
  const [snack, setSnack] = useState({ open: false, message: "" })
  const [staff, setStaff] = useState({
    tblStaffID: '',
    tblFirstName: '',
    tblSurname: '',
    tblCaptaincy: true,
    tblSex: '',
    tblAge: '',
    tblAddress: '',
    tblPhoneNo: '',
    profilePicture: '',
    tblNextofKin: '',
    tblNOKAddress: '',
    tblNOKPhone: '',
    tblStaffGuarantor: '',
    tblStaffGuarantorPhone: '',
    tblStaffGuarantorAddress: '',
  })


  useEffect(() => {
    setLoading(true)
    axios.get(apiServerPrefix)
      .then(res => {
        setAllStaff(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [props.staff_type])


  const handleStaffidChnage = (e) => {
    if (e.target.value === '') {
      setStaffid('');
      setStaff({
        tblStaffID: '',
        tblFirstName: '',
        tblSurname: '',
        tblCaptaincy: true,
        tblSex: '',
        tblAge: '',
        tblAddress: '',
        tblPhoneNo: '',
        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        tblNextofKin: '',
        tblNOKAddress: '',
        tblNOKPhone: '',
        tblStaffGuarantor: '',
        tblStaffGuarantorPhone: '',
        tblStaffGuarantorAddress: '',
      })
    }
    else {
      setStaffid(e.target.value);
      let s = allStaff.find(a => a.tblStaffID === e.target.value)
      setStaff({
        tblStaffID: s.tblStaffID,
        tblFirstName: s.tblFirstName,
        tblSurname: s.tblSurname,
        tblCaptaincy: true,
        tblSex: s.tblSex,
        tblAge: s.tblAge,
        tblAddress: s.tblAddress,
        tblPhoneNo: s.tblPhoneNo,
        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        tblNextofKin: s.tblNextofKin,
        tblNOKAddress: s.tblNOKAddress,
        tblNOKPhone: s.tblNOKPhone,
        tblStaffGuarantor: s.tblStaffGuarantor,
        tblStaffGuarantorPhone: s.tblStaffGuarantorPhone,
        tblStaffGuarantorAddress: s.tblStaffGuarantorAddress,
      })
    }
  }

  const handleSubmit = (e, method) => {
    e.preventDefault();
    if (method === "POST") {
      axios.post(apiServerPrefix, staff)
        .then(res => {
          if (res.status === 200) {
            setSnack({ open: true, message: "Staff Employed" })
          }
        })
        .catch(err => console.log(err))
    }
    if (method === "PUT") {
      axios.put(apiServerPrefix, staff)
        .then(res => {
          if (res.status === 200) {
            setSnack({ open: true, message: "Changes Saved" })
          }
        })
        .catch(err => console.log(err))
    }
  }

  const handleRetrench = () => {
    axios.post(apiServerPrefix + '/suspend', { tblStaffID: staffid })
      .then(res => {
        if (res.status === 200) {
          setAllStaff(allStaff.filter(s => s.tblStaffID !== staffid))
          setSnack({ open: true, message: `Staff Retrenched: ${staffid}` })
        }
      })
      .catch(err => console.log(err))
  }

  const handleSuspend = () => {
    axios.post(apiServerPrefix + '/retrench', { tblStaffID: staffid })
      .then(res => {
        if (res.status === 200) {
          setAllStaff(allStaff.filter(s => s.tblStaffID !== staffid))
          setSnack({ open: true, message: `Staff Suspended: ${staffid}` })
        }
      })
      .catch(err => console.log(err))
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
          {snack.message}
        </Alert>
      </Snackbar>

      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Staff Management: {props.staff_type}
        </Typography>

        <BorderedSection title="Staff ID Number">
          <TextField id="staff_id"
            name="staff_id"
            label="Staff ID"
            margin="normal"
            value={staffid}
            onChange={handleStaffidChnage}
            fullWidth
            select
          >
            <MenuItem key="" value="">
              None
            </MenuItem>
            {staff.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.id}
              </MenuItem>
            ))}
          </TextField>
        </BorderedSection>

        <Box component="form" sx={{}}>

          <TextField value={staff.tblStaffID} name="staffID" label="Stadd ID" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblStaffID: e.target.value })} required fullWidth />
          <Stack direction="row">
            <BorderedSection title="Personal Details">
              <TextField value={staff.tblFirstName} name="surname" label="Surname" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblFirstName: e.target.value })} required fullWidth />
              <TextField value={staff.tblSurname} name="firstname" label="firstname" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblSurname: e.target.value })} required fullWidth />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="gender_id">Gender</InputLabel>
                <Select
                  labelId="gender_id"
                  id="gender"
                  value={staff.tblSex}
                  label="Gender"
                  required
                  onChange={e => setStaff({ ...staff, tblSex: e.target.value })}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <TextField value={staff.tblAge} label="Age" name="age" size="small" onChange={e => setStaff({ ...staff, tblAge: e.target.value })} />
              <TextField value={staff.tblAddress} name="address" label="Address" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblAddress: e.target.value })} required multiline minRows="3" fullWidth />
              <TextField value={staff.tblPhoneNo} name="phone" label="Phone Number" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblPhoneNo: e.target.value })} required fullWidth />
            </BorderedSection>
            <BorderedSection title="Picture">
              <img src={staff.profilePicture} alt="Staff" style={{ height: '20rem' }} />
            </BorderedSection>
          </Stack>

          <Stack direction="row">
            <BorderedSection title="Next of kin">
              <TextField value={staff.tblNextofKin} name="kin_name" label="Name" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblNextofKin: e.target.value })} required fullWidth />
              <TextField value={staff.tblNOKAddress} name="kin_address" label="Address" margin="normal" size="small" required multiline minRows="3" onChange={e => setStaff({ ...staff, tblNOKAddress: e.target.value })} fullWidth />
              <TextField value={staff.tblNOKPhone} name="kin_phone" label="Phone Number" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblNOKPhone: e.target.value })} required fullWidth />
            </BorderedSection>
            <BorderedSection title="Staff Gurantor">
              <TextField value={staff.tblStaffGuarantor} name="gurantor_name" label="Name" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblStaffGuarantor: e.target.value })} required fullWidth />
              <TextField value={staff.tblStaffGuarantorAddress} name="gurantor_address" label="Address" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblStaffGuarantorAddress: e.target.value })} required multiline minRows="3" fullWidth />
              <TextField value={staff.tblStaffGuarantorPhone} name="gurantor_phone" label="Phone Number" margin="normal" size="small" onChange={e => setStaff({ ...staff, tblStaffGuarantorPhone: e.target.value })} required fullWidth />
            </BorderedSection>
          </Stack>

          <BorderedSection title="Management">
            <Container maxWidth="sm">
              <Stack direction="row" spacing={3}>
                <Button type="submit" variant="contained" onClick={e => handleSubmit(e, "POST")} disabled={staffid === ''}>
                  Employ Staff
                </Button>
                <Button type="submit" variant="contained" onClick={e => handleSubmit(e, "PUT")} disabled={staffid !== ''}>
                  Save Staff Information
                </Button>
                <Button variant="contained" color="error" onClick={handleRetrench} disabled={staffid !== ''}>
                  Retrench Staff
                </Button>
                <Button variant="contained" color="error" onClick={handleSuspend} disabled={staffid !== ''}>
                  Suspend Staff
                </Button>
              </Stack>
            </Container>
          </BorderedSection>

        </Box>

        <Divider variant="middle" />

        <BorderedSection title="Recall">
          <Container maxWidth="sm">
            <Stack direction="row" spacing={3}>
              <Button component={Link} to={`/staff-management/${props.staff_type}/suspended-staff`} variant="contained" color="success">
                Suspended Staff
              </Button>
              <Button component={Link} to={`/staff-management/${props.staff_type}/retrenched-staff`} variant="contained" color="success">
                Retrenched Staff
              </Button>
            </Stack>
          </Container>
        </BorderedSection>

      </Container>
    </>
  )
}

export default StaffManagement;
