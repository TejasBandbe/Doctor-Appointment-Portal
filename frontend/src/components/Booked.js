import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import sign from './images/sign.png';
import './styles.css';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import hospital from './images/hospital.png';
import maintenance from './images/maintenance.png';
import { constants, createurl, log } from '../env';

function Booked() {

  const pdfRef = useRef();
  const id = sessionStorage.getItem("id");
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  const fdate = `${day} ${month} ${year}`;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [mobNo, setMobNo] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [drname, setDrname] = useState('');
  const [clinic, setClinic] = useState('');
  const [draddress, setDraddress] = useState('');
  const [drmob, setDrmob] = useState('');
  const [live, setLive] = useState(true);

useEffect(() => {
  const getData = async() =>{
    const url = createurl('/getdata');
    axios.post(url, {
        "id": id
    })
    .then(res =>{
        log(res.data);
        setName(res.data.name);
        setAge(res.data.age);
        setGender(res.data.gender);
        setAddress(res.data.address);
        setMobNo(res.data.mob_no);
        setDrname(res.data.drname);
        setClinic(res.data.clinic);
        setDraddress(res.data.draddress);
        setDrmob(res.data.drmob);
        setDate(res.data.date);
        setTime(res.data.time);
    })
    .catch(error => {
        log(error);
        setLive(false);
    });
};
getData();
},[id]);

const downloadPDF = ()=>{
  const input = pdfRef.current;
  html2canvas(input).then((canvas) =>{
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio)/2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio);
      pdf.save('appointment.pdf');
  });
};

  return (<>
  {
    live === false ? 
    <>
    <div className="row maintenance-container">
        <div className="col-xl-4 col-md-3 col-2"></div>
        <div className="col-xl-4 col-md-6 col-8 outer-box">
<div className="maintenance-box">
    <img src={maintenance} alt="" />
    <h3>Server is under maintenance
    <br/>Please try again later</h3>
</div>
        </div>
        <div className="col-xl-4 col-md-3 col-2"></div>
    </div>
    </>:
<>

<div className="main-box">
<div className="download-button">
    <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
</div>

<div className="row">
<div className="col-xl-3 col-md-2 col-0"></div>
<div className="col-xl-6 col-md-8 col-12 box" ref={pdfRef}>
{/* ================================= */}
<div className="header-container row">
  <div className="col-xl-3 col-3 logo-img">
      <Link to="/"><img src={hospital} alt="" /></Link>
      <div className="logo-content">
      {constants.APP_NAME}
      </div>
  </div>
  <div className="col-xl-2 col-2"></div>
  <div className="col-xl-7 col-7 header-content">
      <span>{drname}</span>
      <p>{clinic} <br/> 
      {draddress}<br/>
      +91 {drmob}</p>
  </div>
</div>
<hr/>
{/* ================================= */}
<div className="home">
<div className="home-header row">
    <span>Doctor Appointment Receipt</span>
    <div className="date">
        Date: {fdate}
    </div>
</div>

<div className="home-container row">
  <div className="col-xl-2 col-md-1 col-0"></div>
  <div className="col-xl-8 col-md-10 col-12">
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Patient's Name</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {name}</div>
      </div>
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Appointment date</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {date}</div>
      </div>
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Appointment time</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {time}</div>
      </div>
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Age</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {age}</div>
      </div>
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Gender</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {gender}</div>
      </div>
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Address</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {address}</div>
      </div>
      <div className="row info">
      <div className="col-xl-4 col-md-4 col-lg-4 col-4">Mobile number</div>
      <div className="col-xl-8 col-md-8 col-lg-8 col-8">: {mobNo}</div>
      </div>
      <div className="sign">
          <img src={sign} alt="" />
          <p><b>{drname}</b></p>
      </div>
  </div>
  <div className="col-xl-2 col-md-1 col-0"></div>
</div>
</div>
<hr/>
{/* ================================= */}
<div className="footer">
  <div className="footer-container row">
      <div className="col-xl-2 col-1"></div>
      <div className="col-xl-4 col-5" style={{display:'flex'}}>
          <i className="fa-solid fa-phone"></i>
          <p>{constants.MOBILE_NO}</p>
      </div>
      <div className="col-xl-4 col-5" style={{display:'flex'}}>
          <i className="fa-solid fa-envelope"></i>
          <p>{constants.EMAIL_ID}</p>
      </div>
      <div className="col-xl-2 col-1"></div>
  </div>

  <div className="footer-container row">
      <div className="col-xl-2 col-1"></div>
      <div className="col-xl-4 col-5" style={{display:'flex'}}>
          <i className="fa-solid fa-location-dot"></i>
          <p>{constants.LOCATION}</p>
      </div>
      <div className="col-xl-4 col-5" style={{display:'flex'}}>
          <i className="fa-solid fa-globe"></i>
          <p>{constants.WEBSITE}</p>
      </div>
      <div className="col-xl-2 col-1"></div>
  </div>
</div>
</div>
<div className="col-xl-3 col-md-2 col-0"></div>
</div>
</div></>
  }
  </>)
}

export default Booked