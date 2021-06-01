import "../css/WorkSchedule.css";
import AppointmentInfoDialog from "./AppointmentInfoDialog.js";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-react-schedule";
import { TextField, Grid, Typography } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import axios from "axios";
import { useEffect, useState } from "react";
import {URL} from "../other/components"


const WorkCalendar = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [data, setData] = useState([]);

  const [pharmacies, setPharmacies] = useState([]);

  const resourceDataSource = [
    { Id: 1, Color: "#e51e36", Name: "missed" },
    { Id: 2, Color: "#4caf50", Name: "open" },
    { Id: 3, Color: "#ff9800", Name: "expired" },
  ];

  const schedule = false;

  const onPopupOpen = (args) => {
    args.cancel = true;
  };

  useEffect(() => {
    axios
      .get(URL + "/api/pharmacy/getPharmacies/" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPharmacies(res.data);
        addAppointmentForSelectedPharmacy(res.data[0].pharmacyId);
      });
  }, []);

  const addAppointmentForSelectedPharmacy = (pharmacyId) => {
    axios
      .get(
        URL + "/api/dermatologistAppointment/allMissed/" +
          userId +
          "/" +
          pharmacyId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        addAppointmentsToData(res.data);
      });
    axios
      .get(
        URL + "/api/dermatologistAppointment/allExpired/" +
          userId +
          "/" +
          pharmacyId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        addAppointmentsToData(res.data);
      });
    axios
      .get(
        URL + "/api/dermatologistAppointment/allReserved/" +
          userId +
          "/" +
          pharmacyId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        addAppointmentsToData(res.data);
      });
  };

  const addAppointmentsToData = (appointments) => {
    setData((previousState) => [...previousState, ...appointments]);
  };

  const [appointmentInfo, setAppointmentInfo] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const appointmentClick = async (e) => {
    var appointment = e.event;
    setAppointmentInfo(appointment);
    setOpenDialog(true);
  };

  const changeAppointmentToMissed = async (id) => {
    axios
      .put(
        URL + "/api/dermatologistAppointment/changeStatusToMissed/" +
          id,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setOpenDialog(false);
        setData(
          data.map((appointment) =>
            appointment.id === id ? { ...appointment, colorId: 1 } : appointment
          )
        );
      })
      .catch((error) => {
        setOpenDialog(false);
        alert("You can only set missed for appointment which is in past!");
      });
  };

  const handleChangePharmacy = async (pharmacy) => {
    setData([]);
    addAppointmentForSelectedPharmacy(pharmacy.pharmacyId);
  };

  return (
    <div style={{ marginLeft: "15%", marginTop: "2%" }}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4" style={{ width: "100%" }}>
            Work calendar
          </Typography>
        </Grid>
        <Grid item xs={3}>
          {pharmacies.length !== 0 && (
            <Autocomplete
              id="controllable-states-demo"
              size="small"
              options={pharmacies}
              getOptionLabel={(option) => option.pharmacyName}
              defaultValue={pharmacies.find((v) => v.pharmacyName[0])}
              disableClearable
              onChange={(event, value) => handleChangePharmacy(value)}
              renderInput={(params) => (
                <TextField {...params} label="Pharmacy" variant="outlined" />
              )}
            />
          )}
        </Grid>
      </Grid>

      <ScheduleComponent
        eventSettings={{
          dataSource: data,
          fields: {
            subject: { name: "subject", title: "Subject" },
            startTime: {
              name: "dermatologistAppointmentStartTime",
              title: "Start Duration",
            },
            endTime: {
              name: "dermatologistAppointmentEndTime",
              title: "End Duration",
            },
          },
        }}
        popupOpen={onPopupOpen}
        timeFormat="HH:mm"
        height="500px"
        width="80%"
        eventClick={(e) => appointmentClick(e)}
        style={{ marginTop: "1%" }}
      >
        <ResourcesDirective>
          <ResourceDirective
            field="colorId"
            idField="Id"
            colorField="Color"
            textField="Name"
            dataSource={resourceDataSource}
          ></ResourceDirective>
        </ResourcesDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      <AppointmentInfoDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        appointment={appointmentInfo}
        changeAppointmentToMissed={changeAppointmentToMissed}
        schedule={schedule}
      ></AppointmentInfoDialog>
    </div>
  );
};

export default WorkCalendar;
