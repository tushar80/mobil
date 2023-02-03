import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Button, Typography, Box, Stack, TextField, MenuItem, Divider } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

import BorderedSection from "../utils/BorderedSection";
import { Link } from "react-router-dom";


function StaffManagement(props) {

  let apiServerPrefix = "http://localhost:7215/api"
  if (props.staff_type === "customer-care")
    apiServerPrefix += "/Staff"
  else if (props.staff_type === "senior")
    apiServerPrefix += "/SeniorStaff"
  else if (props.staff_type === "security")
    apiServerPrefix += "/SecurityStaff"

  const staff = [
    {
      id: '13',
    },
    {
      id: '14',
    },
    {
      id: '15',
    },
  ];

  const [staffid, setStaffid] = useState("");
  const [staffFirstName, setStaffFirstName] = useState('');
  const [staffLastName, setStaffLastName] = useState('');
  const [staffGender, setStaffGender] = useState('');
  const [staffAge, setStaffAge] = useState('');
  const [staffAddress, setStaffAddress] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffProfile, setStaffProfile] = useState('');
  const [kinName, setKinName] = useState('');
  const [kinAdress, setKinAddress] = useState('');
  const [kinPhone, setKinPhone] = useState('');
  const [gurantorName, setGurantorName] = useState('');
  const [gurantorAdress, setGurantorAddress] = useState('');
  const [gurantorPhone, setGurantorPhone] = useState('');


  const handleSubmit = (e, method) => {
    e.preventDefault();
    console.log("submitted", method)
  }

  useEffect(() => {
    if (staffid === "") {
      setStaffFirstName('');
      setStaffLastName('');
      setStaffGender('');
      setStaffAge('');
      setStaffAddress('');
      setStaffPhone('');
      setStaffProfile("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
      setKinName('');
      setKinAddress('');
      setKinPhone('');
      setGurantorName('');
      setGurantorAddress('');
      setGurantorPhone('');
    }
    else {
      axios.get('https://randomuser.me/api')
        .then(res => {
          setStaffFirstName(res.data.results[0].name.first);
          setStaffLastName(res.data.results[0].name.last);
          setStaffGender(res.data.results[0].gender);
          setStaffAge(res.data.results[0].dob.age);
          setStaffAddress(`${res.data.results[0].location.city}, ${res.data.results[0].location.state}, ${res.data.results[0].location.country}`);
          setStaffPhone(res.data.results[0].phone);
          setStaffProfile(res.data.results[0].picture.large);
          // setKinName(res.data.results[0].kin.name);
          // setKinAddress(res.data.results[0].kin.address);
          // setKinPhone(res.data.results[0].kin.phone);
          // setGurantorName(res.data.results[0].gurantor.name);
          // setGurantorAddress(res.data.results[0].gurantor.address);
          // setGurantorPhone(res.data.results[0].gurantor.phone);
        })
        .catch(err => console.log(err))
    }
  }, [staffid, props.staff_type])

  const handleStaffidChnage = (e) => {
    setStaffid(e.target.value);
  }

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Staff Management: {props.staff_type}
        </Typography>

        <Box component="form" sx={{}}>
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

          <Stack direction="row">
            <BorderedSection title="Personal Details">
              <TextField value={staffFirstName} name="surname" label="Surname" margin="normal" size="small" onChange={e => setStaffFirstName(e.target.value)} required fullWidth />
              <TextField value={staffLastName} name="firstname" label="firstname" margin="normal" size="small" onChange={e => setStaffLastName(e.target.value)} required fullWidth />
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="gender_id">Gender</InputLabel>
                <Select
                  labelId="gender_id"
                  id="gender"
                  value={staffGender}
                  label="Gender"
                  required
                  onChange={e => setStaffGender(e.target.value)}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <TextField value={staffAge} label="Age" name="age" size="small" onChange={e => setStaffAge(e.target.value)} />
              <TextField value={staffAddress} name="address" label="Address" margin="normal" size="small" onChange={e => setStaffAddress(e.target.value)} required multiline minRows="3" fullWidth />
              <TextField value={staffPhone} name="phone" label="Phone Number" margin="normal" size="small" onChange={e => setStaffPhone(e.target.value)} required fullWidth />
            </BorderedSection>
            <BorderedSection title="Picture">
              <img src={staffProfile} alt="Staff" style={{ height: '20rem' }} />
            </BorderedSection>
          </Stack>

          <Stack direction="row">
            <BorderedSection title="Next of kin">
              <TextField value={kinName} name="kin_name" label="Name" margin="normal" size="small" onChange={e => setKinName(e.target.value)} fullWidth />
              <TextField value={kinAdress} name="kin_address" label="Address" margin="normal" size="small" required multiline minRows="3" onChange={e => setKinAddress(e.target.value)} fullWidth />
              <TextField value={kinPhone} name="kin_phone" label="Phone Number" margin="normal" size="small" onChange={e => setKinPhone(e.target.value)} required fullWidth />
            </BorderedSection>
            <BorderedSection title="Staff Gurantor">
              <TextField value={gurantorName} name="gurantor_name" label="Name" margin="normal" size="small" onChange={e => setGurantorName(e.target.value)} fullWidth />
              <TextField value={gurantorAdress} name="gurantor_address" label="Address" margin="normal" size="small" onChange={e => setGurantorAddress(e.target.value)} required multiline minRows="3" fullWidth />
              <TextField value={gurantorPhone} name="gurantor_phone" label="Phone Number" margin="normal" size="small" onChange={e => setGurantorPhone(e.target.value)} required fullWidth />
            </BorderedSection>
          </Stack>

          <BorderedSection title="Management">
            <Container maxWidth="sm">
              <Stack direction="row" spacing={3}>
                <Button type="submit" variant="contained" onClick={e => handleSubmit(e, "Post")} disabled={!(staffid === '')}>
                  Employ Staff
                </Button>
                <Button type="submit" variant="contained" onClick={e => handleSubmit(e, "Put")} disabled={staffid === ''}>
                  Save Staff Information
                </Button>
                <Button variant="contained" color="error" disabled={staffid === ''}>
                  Retrench Staff
                </Button>
                <Button variant="contained" color="error" disabled={staffid === ''}>
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