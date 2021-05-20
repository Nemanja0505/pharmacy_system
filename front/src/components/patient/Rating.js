import React from 'react'
import { ComboBoxComponent } from '@syncfusion/ej2-react-dropdowns';
import { useState, useEffect } from "react";
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Button,
    Link,
    TextField
  } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';




  const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: "5%",
    },
    hederRow: {
      background: "#4051bf",
    },
    hederCell: {
      cursor: "pointer",
      color: "#ffffff",
    },
    icons: {
      cursor: "pointer",
    },
  }));

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
      
    },
  });



const Rating = () => {

    const [typeList, setTypeList] = useState(['Dermatologist_rating','Medicine_rating','Pharmacy_rating','Pharmacist_rating'])
    const [selectedType, setSelectedType] = useState()
    const [staffs, setStaffs] = useState([])
    const [medicines, setMedicines] = useState([])
    const [pharmacies, setPharmacies] = useState([])
    const [openRatingDialog, setOpenRatingDialog] = useState(false)
    const [radioValue, setRadioValue] = React.useState('female');
    const [selectedRow, setSelectedRow] = useState()
    const classes = useStyles();

    const handleClickOpenRatingDialog= (row) => {
        setSelectedRow(row)
        setOpenRatingDialog(true)
    }
    const handleClickCloseRatingDialog = () => {
        setRadioValue()
        setOpenRatingDialog(false);

    };
    const handleClickSaveRating = () => {
        
        if(selectedType === 'Dermatologist_rating' || selectedType === 'Pharmacist_rating'){
            var staffDTO = {
                id:0,
                grade:radioValue,
                patientId:1,
                typeOfRating:selectedType,
                staffId:selectedRow.id,
                staffFirstName:selectedRow.firstName,
                staffLastName:selectedRow.lastName,
                staffEmail:selectedRow.email


            }
            axios.post('http://localhost:8080/api/rating/staff',staffDTO)
            .then((res)=> {
                setRadioValue()
                setOpenRatingDialog(false);
            })
            
        }
        if(selectedType === 'Medicine_rating'){
            var staffDTO = {
                id:0,
                grade:radioValue,
                patientId:1,
                typeOfRating:selectedType,
                medicineId:selectedRow.medicineId,
                medicineName:selectedRow.medicineName
            }
            axios.post('http://localhost:8080/api/rating/medicine',staffDTO)
            .then((res)=> {
                setRadioValue()
                setOpenRatingDialog(false);
            })
            
        }
        if(selectedType === 'Pharmacy_rating'){
            var staffDTO = {
                id:0,
                grade:radioValue,
                patientId:1,
                typeOfRating:selectedType,
                pharmacyId:selectedRow.id,
                pharmacyName:selectedRow.pharmacyName
            }
            axios.post('http://localhost:8080/api/rating/pharmacy',staffDTO)
            .then((res)=> {
                setRadioValue()
                setOpenRatingDialog(false);
            })
            
        }
    }


    const HandleClickRatingType = (type) => {
        if(type == 'Dermatologist_rating'){
            axios.get('http://localhost:8080/api/patient/1/dermatologist/expired')
            .then((res) => {
                setStaffs(res.data)
            })
        }else if(type == 'Medicine_rating'){
            axios.get('http://localhost:8080/api/patient/1/medicine')
            .then((res) => {
                setMedicines(res.data)
            })

        }else if(type == 'Pharmacy_rating'){
            axios.get('http://localhost:8080/api/patient/1/pharmacy')
            .then((res) => {
                setPharmacies(res.data)
            })

        }else{
            axios.get('http://localhost:8080/api/patient/1/pharmacist/expired')
            .then((res) => {
                setStaffs(res.data)
            })

        }
        setSelectedType(type)

    }


    const TableHeaderForStaff = (
        <TableHead>
          <TableRow className={classes.hederRow}>
            <TableCell className={classes.hederCell} >
             First name
            </TableCell>
            <TableCell className={classes.hederCell} >
             Last name
            </TableCell>
            <TableCell className={classes.hederCell} >
              Email
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      );
    
      const TableContentForStaff = (
        <TableBody>
          {staffs.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell><Button onClick={() => handleClickOpenRatingDialog(row)}>Set new rating</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      );
    

    const TableForDermatologistAndPharmacist = (
        <div>
        <Grid container spacing={1} style={{marginTop:'10%'}}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Table>
              {TableHeaderForStaff}
              {TableContentForStaff}
            </Table>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        </div>
    )

    const TableHeaderForMedicine= (
        <TableHead>
          <TableRow className={classes.hederRow}>
            <TableCell className={classes.hederCell} >
             Id
            </TableCell>
            <TableCell className={classes.hederCell} >
             Medicine Name
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      );
    
      const TableContentForMedicine = (
        <TableBody>
          {medicines.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.medicineId}</TableCell>
              <TableCell>{row.medicineName}</TableCell>
              <TableCell><Button onClick={() => handleClickOpenRatingDialog(row)}>Set new rating</Button></TableCell>

            </TableRow>
          ))}
        </TableBody>
      );

      const TableForMedicine = (
        <div>
        <Grid container spacing={1} style={{marginTop:'10%'}}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <Table>
              {TableHeaderForMedicine}
              {TableContentForMedicine}
            </Table>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
        </div>
    )

    const TableHeaderPharmacy = (
        <TableHead>
          <TableRow className={classes.hederRow}>
            <TableCell className={classes.hederCell} >
             Pharmacy name{" "}
            </TableCell>
            <TableCell className={classes.hederCell} >
             Address{" "}
            </TableCell>
            <TableCell className={classes.hederCell} >
              Rating {" "}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
      );
    
      const TableContentPharmacy = (
        <TableBody>
          {pharmacies.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.pharmacyName}</TableCell>
              <TableCell>{row.pharmacyAddress.streetName} {row.pharmacyAddress.streetNumber},{row.pharmacyAddress.city}</TableCell>
              <TableCell>{row.pharmacyAverageRating}</TableCell>
              <TableCell><Button onClick={() => handleClickOpenRatingDialog(row)}>Set new rating</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      );

      const TableForPharmacy = (
        <div>
            <Grid container spacing={1} style={{marginTop:'10%'}}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Table>
                    {TableHeaderPharmacy}
                    {TableContentPharmacy}
                    </Table>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
        </div>

      )

      const DialogTitle = withStyles(styles)((props) => {
        const { children, classes, onClose, ...other } = props;
        return (
          <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
              <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </MuiDialogTitle>
        );
      });
      
      const DialogContent = withStyles((theme) => ({
        root: {
          padding: theme.spacing(2),
        },
      }))(MuiDialogContent);
      
      const DialogActions = withStyles((theme) => ({
        root: {
          margin: 0,
          padding: theme.spacing(1),
        },
      }))(MuiDialogActions);

      const handleChange = (event) => {
        setRadioValue(event.target.value);
      };


      const CreateRatingDialog = (
        <div>
            <Dialog onClose={handleClickCloseRatingDialog} aria-labelledby="customized-dialog-title" open={openRatingDialog} fullWidth='true'
          maxWidth='sm'>
              <DialogTitle id="customized-dialog-title" onClose={handleClickCloseRatingDialog}>
                
              </DialogTitle>
              <DialogContent dividers>
             
                  <Typography gutterBottom>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={radioValue} onChange={handleChange}>
                        <FormControlLabel value="One" control={<Radio />} label="One" />
                        <FormControlLabel value="Two" control={<Radio />} label="Two" />
                        <FormControlLabel value="Three" control={<Radio />} label="Three" />
                        <FormControlLabel value="Four"  control={<Radio />} label="Four" />
                        <FormControlLabel value="Five"  control={<Radio />} label="Five" />
                    </RadioGroup>
                    </FormControl>
                  </Typography>
              
    
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClickCloseRatingDialog} autoFocus color="primary">
                  Close
                  </Button>
                  <Button onClick={handleClickSaveRating} autoFocus color="primary">
                  Save
                  </Button>
              </DialogActions>
            </Dialog>
        </div>
    
      )
    return (
        <div>
            Rating form:
            <p>Rating type:</p>  
            {CreateRatingDialog} 
            <ComboBoxComponent 
                id="diacritics"
                ignoreAccent={true}
                allowFiltering={true}
                dataSource={typeList}
                placeholderd="rating type"
                change={(e) => HandleClickRatingType(e.value)}
                  />
               {selectedType === 'Pharmacy_rating' && TableForPharmacy}
              {(selectedType === 'Dermatologist_rating' || selectedType === 'Pharmacist_rating')  && TableForDermatologistAndPharmacist}
              {selectedType === 'Medicine_rating' && TableForMedicine}             
        </div>
    )


}

export default Rating
