import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import hospital from './images/hospital.png';
import './styles.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import maintenance from './images/maintenance.png';
import { constants, createurl, log } from '../env';

function Home() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('');
    const [mobNo, setMobNo] = useState('');
    const [emailId, setEmailId] = useState('');
    const [drname, setDrname] = useState('');
    const [clinic, setClinic] = useState('');
    const [draddress, setDraddress] = useState('');
    const [drmob, setDrmob] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [drdata, setDrdata] = useState([]);
    const [drid, setDrid] = useState('');
    const [timedata, setTimedata] = useState([]);
    const [enable, setEnable] = useState(true);
    const [live, setLive] = useState(true);
    const [memailid, setMmailid] = useState('');
    const [mdrid, setMdrid] = useState('');

    // --------------
    log(drname, clinic, draddress, drmob, date);
    // --------------

    const history = useHistory();

useEffect(()=>{
    const getDoctors = async() => {
        const url = createurl('/getdoctors');
        axios.get(url)
        .then(res => {
            log(res.data);
            setDrdata(res.data);
        })
        .catch(error => {
            log(error);
            setLive(false);
        });
    };
    getDoctors();
}, []);

const handleDoctor = (e) => {
    const dr_id = e.target.value;
    setDrid(dr_id);
    if(dr_id!==''){
        const url = createurl('/gettimes');
        axios.post(url, {
            "drid": dr_id,
        })
        .then(res => {
            log(res.data);
            setTimedata(res.data);
            setEnable(false);
        })
        .catch(error => {
            log(error);
            setLive(false);
        });
    }else{
        setEnable(true);
    }
};

const bookAppointment = async() =>{
    if(name==='' || age==='' || gender==='' || address==='' || mobNo==='' || 
    emailId==='' || drid==='' || time===''){
        toast.error("Please fill all the required fields",{autoClose:1500, theme:'colored'});
    }
    else if(mobNo.length!==10){
        toast.error("Mobile number is not valid",{autoClose:1500, theme:'colored'});
    }
    else if(!emailRegex.test(emailId)){
        toast.error("Email id is not valid",{autoClose:1500, theme:'colored'});
    }
    else{
        const url = createurl('/book');
        axios.post(url,
        {
            "name": name,
            "age": age,
            "gender": gender,
            "address": address,
            "mob_no": mobNo,
            "email_id": emailId,
            "drid": drid,
            "appointment_time": time,
        })
        .then(res =>{
            log(res.data);
            if(res.data.message === "already booked"){
                toast.error("already booked an appointment for today",{autoClose:4000, theme:'colored'});
            }else if(res.data.message === "appointment booked"){
                toast.success("Appointment booked suucessfully!", {autoClose:1500, theme:'colored'});
                getData(res.data.data.insertId);
                sessionStorage.setItem("id",res.data.data.insertId);
                history.push('/booked');
                setTimeout(() => {
                    deleteSlot(drid, time);
                }, 2000);
            }
        })
        .catch(error => {
            log(error);
            setLive(false);
        });
    }
};

const deleteSlot = async(doctorId, timeSlot) => {
    debugger;
    const url = createurl('/deleteslot');
    axios.post(url, {
        "drid": doctorId,
        "timeslot": timeSlot,
    })
    .then(res => {
        log(res.data);
    })
    .catch(error => {
        log(error);
        setLive(false);
    });
};

const getData = async(userId) =>{
    const url = createurl('/getdata');
    axios.post(url, {
        "id": userId
    })
    .then(res =>{
        log(res.data);
        setName(res.data.name);
        setAge(res.data.age);
        setGender(res.data.gender);
        setAddress(res.data.address);
        setMobNo(res.data.mob_no);
        setEmailId(res.data.email_id);
        setDrname(res.data.drname);
        setClinic(res.data.clinic);
        setDraddress(res.data.draddress);
        setDrmob(res.data.drmob);
        setDate(res.data.date);
        setTime(res.data.time);
        const mail = res.data.email_id;
        const na = res.data.name;
        const da = res.data.date;
        const ti = res.data.time;
        const drName = res.data.drname;
        const clin = res.data.clinic;
        const drAddr = res.data.draddress;
        setTimeout(() =>{
            sendmail(mail, na, da, ti, drName, clin, drAddr);
        }, 2000);
    })
    .catch(error => {
        log(error);
        setLive(false);
    });
};

const sendmail = async(mail, na, da, ti, drName, clin, drAddr)=>{
    const url = createurl('/sendmail');
    axios.post(url,{
            "email_id": mail,
            "name": na,
            "date": da,
            "time": ti,
            "drname": drName,
            "draddress": drAddr,
            "clinic": clin
    })
    .then(res =>{
            log(res.data);
            toast.success("you can find your appointment details in the email", {autoClose:1500, theme:'colored'});
    })
    .catch(error => {
        log(error);
        setLive(false);
    })
};

const download = async() => {
    if(memailid==='' || mdrid===''){
        toast.error("Please fill all the required fields",{autoClose:1500, theme:'colored'});
    }else if(!emailRegex.test(memailid)){
        toast.error("Email id is not valid",{autoClose:1500, theme:'colored'});
    }else{
        const url = createurl('/download');
        axios.post(url,{
            "email_id": memailid,
            "drid": mdrid
        })
        .then(res =>{
            log(res.data);
            if(res.data.error === "appointment not found"){
                toast.error("Coudn't find appointment for today. Please check your email id.", {autoClose:2500, theme:'colored'});
            }
            else{
                sessionStorage.setItem("id",res.data.id);
                history.push('/booked');
            }
        })
        .catch(error => {
            log(error);
            if(error.response.data.error === "appointment not found"){
                toast.error("Coudn't find appointment for today. Please check your email id.", {autoClose:2500, theme:'colored'});
            }else{
            setLive(false);
            }
        });
    }
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
{/* ########################## */}
<div className="modal fade" id="downloadModal" tabIndex="-1" aria-labelledby="downloadModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="downloadModalLabel">Download my today's receipt</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <input type="text" className="form-control my-3" id="" placeholder="Enter your email id"
                                required onChange={(e) => {setMmailid(e.target.value)}}/>
            <select name="doctor" id="" className="form-control" required onChange={(e)=>setMdrid(e.target.value)}>
            <option value="">--select doctor--</option>
                {
                    drdata.map( (getdoctor, index) => (
                        <option key={index} value={getdoctor.id}>{getdoctor.drname}</option>
                    ) )
                }
            </select>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={download}
            data-bs-toggle="modal" data-bs-target="#downloadModal">Go</button>
        </div>
        </div>
    </div>
    </div>
{/* ########################## */}

<div className="main-box">

<div className="row my-3 download-link">
    <Link to="#" data-bs-toggle="modal" data-bs-target="#downloadModal"><h6>Download my today's receipt</h6></Link>
</div>

<div className="row">
    <div className="col-xl-3 col-md-2 col-0"></div>
    <div className="col-xl-6 col-md-8 col-12 box">
    {/* ==================================== */}
    <div className="header-container row">
        <div className="col-xl-3 col-3 logo-img">
            <img src={hospital} alt="" />
            <div className="logo-content">
            {constants.APP_NAME}
            </div>
        </div>
        <div className="col-xl-2 col-2"></div>
        <div className="col-xl-7 col-7 header-content">
            <span>{constants.APP_NAME}</span>
            <p>{constants.ADDR_LINE_1}<br/> 
            {constants.ADDR_LINE_2} <br/>
            {constants.WEBSITE}</p>
        </div>
    </div>
    <hr/>
    {/* ==================================== */}
    <div className="home">
<div className="home-header row">
    <span>Doctor Appointment Request Form</span>
    <p>Fill the form below and we will get back soon to you</p>
</div>

<div className="home-conatainer row">
<div className="col-xl-2 col-md-2"></div>
<div className="col-xl-8 col-md-8">
    <div className="form">
        <div className="form-group">
        <label htmlFor="">Full Name<span> *</span></label>
            <input type="text" className="form-control" id="" placeholder="Enter your name"
            required onChange={(e) => {setName(e.target.value)}}/>
            <label htmlFor="">Age<span> *</span></label>
            <input type="number" className="form-control" id="" placeholder="Enter your age"
            min="0" max="120" required onChange={(e) => {setAge(e.target.value)}}/>
            <label htmlFor="">Gender<span> *</span></label>
            <select className="form-select" required onChange={(e) => {setGender(e.target.value)}}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label htmlFor="">Address<span> *</span></label>
            <textarea name="" className="form-control" rows="3"
            required onChange={(e) => {setAddress(e.target.value)}}></textarea>
            <label htmlFor="">Mobile number<span> *</span></label>
            <input type="text" className="form-control" id="" placeholder="Enter your mobile number"
            required onChange={(e) => {setMobNo(e.target.value)}}/>
            <label htmlFor="">Email id<span> *</span></label>
            <input type="text" className="form-control" id="" placeholder="Enter your email id"
            required onChange={(e) => {setEmailId(e.target.value)}}/>
            <label htmlFor="">Doctor<span> *</span></label>
            <select name="doctor" className="form-control" id="" onChange={(e)=>handleDoctor(e)}>
                <option value="">--select doctor--</option>
                {
                    drdata.map( (getdoctor, index) => (
                        <option key={index} value={getdoctor.id}>{getdoctor.drname}</option>
                    ) )
                }
            </select>
            <label htmlFor="">Timeslot<span> *</span></label>
            <select name="time" className="form-control" id="" disabled={enable} 
            onChange={(e)=>setTime(e.target.value)}>
                <option value="">--select timeslot--</option>
                {
                    timedata.map( (gettime, index) => (
                        <option key={index} value={gettime.timeslot}>{gettime.value}</option>
                    ))
                }
            </select>
        </div>
        <center><button className="btn btn-outline-success"
            onClick={bookAppointment}><b>Book Appointment</b></button></center>
    </div>
</div>
<div className="col-xl-2 col-md-2"></div>
</div>
<hr/>
    </div>
    {/* ==================================== */}
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

</div> </>
}
</>)
}

export default Home