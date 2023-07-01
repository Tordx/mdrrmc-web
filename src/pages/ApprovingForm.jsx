import React, { useEffect, useState } from "react";
import addPortrait from "../img/userIcon.png";
import DocUpload from '../img/document-file-page-paper-sheet-up-upload-icon-3.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc , updateDoc } from "firebase/firestore";
import { useNavigate, Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import MDSW from '../img/DSWD-Logo.png'
import MOL from '../img/Labrador-Logo.png'
import { useSelector } from "react-redux";
import emailjs from '@emailjs/browser';
import { Approved, Deactivated, Denied } from "../messages/messages";


const ApprovingForm = ({}) => {
  const { FullName, UserID } = useParams();
  const currentUser = useSelector(state => state.currentUser)
  const navigate = useNavigate();
  const date = new Date();
  const year = date.getFullYear();
  const createdate = date.toLocaleDateString()
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(currentUser.user.FullName);
  const [userID, setUserID] = useState(currentUser.user.userID);
  const [email, setEmail] = useState(currentUser.user.email);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.user.phoneNumber);
  const [landlineNumber, setLandlineNumber] = useState(currentUser.user.landlineNumber);
  const [birthDate, setBirthDate] = useState(currentUser.user.birthDate);
  const [sex, setSex] = useState(currentUser.user.sex);
  const [address, setAddress] = useState(currentUser.user.address);
  const [typeOfDisability, setTypeOfDisability] = useState(currentUser.user.typeOfDisability || []);
  const [causeOfDisability, setCauseOfDisability] = useState(currentUser.user.causeOfDisability);
  const [highestEducation, setHighestEducation] = useState(currentUser.user.highestEducation);
  const [employmentStatus, setEmploymentStatus] = useState(currentUser.user.employmentStatus);
  const [sss, setSSS] = useState(currentUser.user.sss);
  const [gsis, setGSIS] = useState(currentUser.user.gsis);
  const [pagibig, setPagibig] = useState(currentUser.user.pagibig);
  const [psn, setPSN] = useState(currentUser.user.psn);
  const [philhealth, setPhilHealth] = useState(currentUser.user.philhealth);
  const [dl, setDL] = useState(currentUser.user.dl);
  const [others, setOthers] = useState(currentUser.user.others);
  const [father, setFather] = useState(currentUser.user.Father);
  const [mother, setMother] = useState(currentUser.user.Mother);
  const [guardian, setGuardian]= useState(currentUser.user.Guardian);
  const [batchCode, setBatchCode] = useState(year);
  const [disabilityCode, setDisabilityCode] = useState(currentUser.user.disabilityCode);
  const [physician, setPhysician] = useState(currentUser.user.Physician);
  const [license, setLicense] = useState(currentUser.user.License);
  const [processingOfficer, setProcessingOfficer] = useState(currentUser.user.ProcessingOfficer);
  const [approvingOfficer, setApprovingOfficer] = useState(currentUser.user.ApprovingOfficer);
  const [encoder, setEncoder] = useState(currentUser.user.Encoder);
  const [specDis, setSpecDis] = useState(currentUser.user.specDis);
  const [occupation, setOccupation] = useState(currentUser.user.occupation);
  const [emergencyContactPerson, setEmergencyContactPerson] = useState(currentUser.user.emergencyContactPerson);
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(currentUser.user.emergencyContactNumber);
  const [photoURL, setPhotoURL] = useState(currentUser.user.photoURL)
  const [status, setStatus] = useState(currentUser.user.Status);
  const [image, setImage] = useState(''); // not yet implemented as image upload was set as file for default in the recent update.
  const [file, setFile] = useState(currentUser.user.file);
  const [isExpanded, setIsExpanded] = useState(false);
  const [deactreason, setdeactreason] = useState('');
  const [street, setStreet] = useState(currentUser.user.street)
  const [barangay, setBarangay] = useState(currentUser.user.barangay)

  useEffect(() => {
    if(!currentUser) {
      navigate('admin/userlist')
    }
  },[])

  const downloadFileFromFirebase = async() => {
    const fileUrl = currentUser.user.file;
    window.open(fileUrl, '_blank');
  }

  const handleSubmit = async(e) => {
    setLoading(true);
    e.preventDefault();

        if (
          fullName.length === 0 ||
          email.length === 0 ||
          phoneNumber.length === 0 ||  
          birthDate === '' || 
          sex === 'Select Sex' || 
          address.length === 0 || 
          typeOfDisability.length === 0 || 
          causeOfDisability.length === 0 || 
          highestEducation === 'Select' || 
          employmentStatus ===  'Select'|| 
          batchCode.length === 0 || 
          disabilityCode.length === 0) {
          alert('Please fill in all the required fields')
          setLoading(false);
        }else if(street.length === 0){
          alert('House Number must be included')
        }else {

          try {

            console.log(status)

            if(status === 'Active'){
              console.log('here')
              emailjs.send('service_j9gk41l', 'template_ofueynr', {
                to_name: fullName,
                to_email: email,
                message:"We are pleased to inform you that your application to the Labrador PWD has been approved! \n\nWe appreciate your patience during the verification process and we hope that you find our platform to be helpful in managing your PWD needs. \n\nYou may now access your account using your registered email and password \n\n" + "Password:" + userID + " \n\nIf you have any questions or concerns, please do not hesitate to contact us at support@labradorpwd.com or you can simply message us through the Android mobile application! you may download the app here: https://labradorpwd.com\n\nOnce again, welcome to Labrador PWD. We look forward seeing you!",
                from_name: 'Labrador PWD',
              }, '_YQcAYq48tPDPYaZ7')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            } else if (status === 'Denied'){
              emailjs.send('service_j9gk41l', 'template_ofueynr', {
                to_name: fullName,
                to_email: email,
                message: "We regret to inform you that your application for the Labrador PWD System has been denied. We understand that this is not the outcome you were hoping for, and we want to assure you that our officers have thoroughly reviewed your application.\n\n Unfortunately, we were unable to approve your application due to the following reasons\n\n"+ "Reason: " + deactreason +".\n\nWe encourage you to reapply once you have addressed these issues. If you have any questions or concerns regarding your application, please feel free to contact us at support@labradorpwd.com. \n\n Thank you for your interest in the Labrador PWD.",
                from_name: 'Labrador PWD',
              }, '_YQcAYq48tPDPYaZ7')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            } else if (status === 'Deactivated'){
              emailjs.send('service_j9gk41l', 'template_ofueynr', {
                to_name: fullName,
                to_email: email,
                reason: deactreason,
                message: "We have deactivated your account due to the following reason.\n\n"+ "Reason: " +  deactreason + "\n\nyou may request for reactivation by sending us an email at support@labradorpwd.com",
                from_name: 'Labrador PWD',
              }, '_YQcAYq48tPDPYaZ7')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            }
            else if (status === 'Pending'){
              emailjs.send('service_j9gk41l', 'template_ofueynr', {
                to_name: fullName,
                to_email: email,
                reason: deactreason,
                message: "We have not yet approve your application due to the following reason.\n\n"+ "Reason: " +  deactreason + "\n\nyou may contact our support, by sending us an email at support@labradorpwd.com",
                from_name: 'Labrador PWD',
              }, '_YQcAYq48tPDPYaZ7')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            }
          const date = new Date().getTime();
          const storageRef = ref(storage, `${fullName + date}`);
          await uploadBytesResumable(storageRef, photoURL).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                console.log(downloadURL);          
                console.log(userID);
                const userDocRef = doc(db, "users", currentUser.user.uid);
                await updateDoc(userDocRef, {
                  uid: currentUser.user.uid,
                  date: createdate,
                  displayName: fullName,
                  FullName:  fullName,
                  userID: userID,
                  email: email,
                  password: userID,
                  batchCode: batchCode,
                  disabilityCode: disabilityCode,
                  phoneNumber: phoneNumber,
                  landlineNumber: landlineNumber,
                  birthDate: birthDate,
                  sex: sex,
                  address: street + ' ' + barangay,
                  barangay: barangay,
                  street: street,
                  typeOfDisability: typeOfDisability,
                  causeOfDisability: causeOfDisability,
                  highestEducation: highestEducation,
                  employmentStatus: employmentStatus,
                  Mother: mother,
                  Father: father,
                  Guardian: guardian,
                  Physician: physician,
                  License: license,
                  ProcessingOfficer: processingOfficer,
                  ApprovingOfficer: approvingOfficer,
                  Encoder: encoder,
                  sss: sss,
                  gsis: gsis,
                  pagibig: pagibig,
                  psn: psn, 
                  philhealth: philhealth, 
                  dl: dl, 
                  gsis: gsis,
                  pagibig: pagibig, 
                  psn: psn, 
                  philhealth: philhealth,
                  occupation: occupation,
                  others: others,
                  Status : status,
                  deactreason : deactreason,
                  photoURL: photoURL === currentUser.user.photoURL ? photoURL : downloadURL,
                  file: file,
                  activestatus: 'offline',
                  userType: "app-account",
                });
                setLoading(false);
                alert('Successfully added user')
                localStorage.setItem("formSubmitted", "true");
                  navigate("/admin/applicationlist");
                });
            
              });
            } catch (error) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
        }
    };

    const handleCheckboxChange = (event) => {
      const value = event.target.value;
      if (typeOfDisability.includes(value)) {
        setTypeOfDisability(typeOfDisability.filter((v) => v !== value));
      } else {
        setTypeOfDisability([...typeOfDisability, value]);
      }
    };

   return (
    <div className="formContainer">
      {loading && 
        <div className="loading-modal">
          <div className="loading-content">
            <div className="spinner"></div>
              <p>Loading...</p>
          </div>
        </div>}
        {isExpanded && (
            <div className='photo-overlay' onClick={() => setIsExpanded(false)}>
                <div className='photo-wrapper'>
                <img src={currentUser.user.photoURL} alt='user' style={{width: '30%', height: '30%' }} />
                </div>
            </div>
            )}
        {/* <Header/> */}
  <div className="formWrapper">
    <div className="LabelWrapper">
    
      <form onSubmit={handleSubmit}>
        <div className="formlogo">
          <img src={MDSW} width = {150} draggable = {false}/>
        </div>
        <h1 className="pageTitle">APPLICATION FORM </h1>
        <p>ID REFERENCE NUMBER</p>
        <div className="FootForm">
          <div className="long-label">
            <label htmlFor="name">Full Name <span className="required">*</span></label>
            <input placeholder="E.g. Juan Dela Cruz" required type="text" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="HeadForm">
            
          <div className="row-label" >
            <div className="id-generated">
              <div className="id-generated-wraps">
              <label htmlFor="batchCode">Batch code</label>
              <input disabled placeholder= {batchCode} required type="text" name="batchCode"onChange={(e) => setBatchCode(e.target.value)}/>
                </div>
                <div className="id-generated-wraps">
                  <label htmlFor="userid">User ID</label>
                  <input disabled placeholder= {userID} required type="text" name="userid" onChange={(e) => setUserID(e.target.value)} />
                </div>
                <div className="id-generated-wraps">
                  <label htmlFor="disabilityCode">disablity code <span className="required">*</span></label>
                    <select required type="text" name="disabilityCode" value={disabilityCode} onChange={(e) => setDisabilityCode(e.target.value)}>
                      <option value="101">101 - Vision Impairment</option>
                      <option value="102">102 - Deaf or hard of hearing</option>
                      <option value="103">103 - Mental health conditions</option>
                      <option value="104">104 -  Intellectual disability</option>
                      <option value="105">105 - Acquired brain injury</option>
                      <option value="106">106 - Autism spectrum disorder</option>
                      <option value="107">107 -  Physical disability</option>
                    </select>
                </div>
              </div>
            </div>
            <div className="row-label">
              <h3>
                <label>NOTE: user password is set to userid by default, once approved, please change your password immediately.</label>
              </h3>
              </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="email">Email<span className="required">*</span></label>
              <input placeholder="example@example.com" required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="contact">Phone Number<span className="required">*</span></label>
              <input placeholder="09xxxxxxxxx" required type="tel" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="contact">Landline Number</label>
              <input placeholder="(075) 123 1234" type="tel" name="landlineNumber" value={landlineNumber} onChange={(e) => setLandlineNumber(e.target.value)} />
            </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="birthday">Birth Date<span className="required">*</span></label>
              <input required type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="gender">Gender <span className="required">*</span></label>
              <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div className="HeadForm">
          <div className="row-label">
            <label htmlFor="address">Home Address<span className="required">*</span></label>
            <input placeholder="House No./Apartment/building/Street/" required name="address" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className="row-label">
            <label htmlFor="barangay/town">Barangay/Town<span className="required">*</span></label>
                    <select required type="text" name="barangay/town" value={barangay} onChange={(e) => setBarangay(e.target.value)}>
                      <option value="Select">Select</option>
                      <option value="Bolo">Bolo</option>
                      <option value="Bongalon">Bongalon</option>
                      <option value="Dulig">Dulig</option>
                      <option value="Laois">Laois</option>
                      <option value="Magsaysay">Magsaysay</option>
                      <option value="Poblacion">Poblacion</option>
                      <option value="San Gonzalo">San Gonzalo</option>
                      <option value="San Jose">San Jose</option>
                      <option value="Tobuan">Tobuan</option>
                      <option value="Tobuan">Uyong</option>
                    </select>
          </div>
          </div>
          <div className="HeadForm">
          <div className="row-label">
                  <label htmlFor="typeOfDisability">Type of  Disability <span className="required">*</span></label>
                  <div className="checkbox-grid">
                    <div>
                      <input
                        type="checkbox"
                        id="vision"
                        name="typeOfDisability"
                        value="Vision Impairment"
                        checked={typeOfDisability.includes("Vision Impairment")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="vision">Vision Impairment </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="deaf"
                        name="typeOfDisability"
                        value="Deaf or hard of hearing"
                        checked={typeOfDisability.includes("Deaf or hard of hearing")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="deaf">Deaf or hard of hearing </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="mental"
                        name="typeOfDisability"
                        value="Mental health conditions"
                        checked={typeOfDisability.includes("Mental health conditions")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="mental">Mental health conditions </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="intellectual"
                        name="typeOfDisability"
                        value="Intellectual disability"
                        checked={typeOfDisability.includes("Intellectual disability")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="intellectual">Intellectual disability </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="brain"
                        name="typeOfDisability"
                        value="Acquired brain injury"
                        checked={typeOfDisability.includes("Acquired brain injury")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="brain">Acquired brain injury </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="autism"
                        name="typeOfDisability"
                        value="Autism spectrum disorder"
                        checked={typeOfDisability.includes("Autism spectrum disorder")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="autism">Autism spectrum disorder </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="physical"
                        name="typeOfDisability"
                        value="Physical disability"
                        checked={typeOfDisability.includes("Physical disability")}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor="physical">Physical disability </label>
                    </div>
                  </div>
          </div>
          <div className="row-label">
            <label htmlFor="specDis">Specificy Disability <span className="required">*</span></label>
            <input placeholder="E.g. Leg Trauma,…" required  type="text" name="specDis" value={specDis} onChange={(e) => setSpecDis(e.target.value)} />
          </div>
          <div className="row-label">
            <label htmlFor="causeOfDisability">Cause of Disability <span className="required">*</span></label>
            <input placeholder="e.g. Accident,…" required type="text" name="causeOfDisability" value={causeOfDisability} onChange={(e) => setCauseOfDisability(e.target.value)} />
          </div>
          </div>
          <div className="long-label">
            <label htmlFor="status">Highest Educational Attainment <span className="required">*</span></label>
            <select required type="text" name="highestEducation" value={highestEducation} onChange={(e) => setHighestEducation(e.target.value)}>
                  <option value="Select">Select</option>
                  <option value="Graduate/Masteral/Doctorate">Graduate/Master's/Doctor's</option>
                  <option value="Undergraduate/Vocational/Bacherlor's">Undergraduate/Vocational/Bacherlor's</option>
                  <option value="Senior Highschool">Senior Highschool</option>
                  <option value="Junior Highschool">Junior Highschool</option>
                  <option value="Elementary">Elementary</option>
                  <option value="N/A">Not Applicable</option>
                </select>
          </div>
        </div>
        <div className="row-label">
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="occupation">Occupation <span className="required">*</span></label>
              <input placeholder="E.g. Occupation,…" required  type="text" name="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="status">Status of Employment <span className="required">*</span></label>
              <select required type="text" name="Status" value={employmentStatus} onChange={(e) => setEmploymentStatus(e.target.value)}>
              <option value="Select">Select</option>
                <option value="Employed">Employed</option>
                <option value="Self Employe">Self Employed</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Freelancer/Contractor">Freelancer/Contractor</option>
                <option value="Temporary employed">Temporary employed</option>
                <option value="Intern/Apprentice">Intern/Apprentice</option>
                <option value="Seasonal employee">Seasonal employee</option>
                <option value="Student/Trainee">Student/Trainee</option>
                <option value="Volunteer/Non-profit worker">Volunteer/Non-profit worker</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
              </select>
            </div>
          </div>
          <p>ID REFERENCE NUMBER</p>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="sss_id">SSS ID</label>
              <input type="text" name="sss_id" value={sss} onChange={(e) => setSSS(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="gsis">GSIS ID</label>
              <input type="text" name="gsis" value={gsis} onChange={(e) => setGSIS(e.target.value)} />
              </div>
            <div className="row-label">
              <label htmlFor="pagibig">PAG-IBIG ID</label>
              <input type="text" name="pagibig" value={pagibig} onChange={(e) => setPagibig(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="psn">PSN ID</label>
              <input type="text" name="psn" value={psn} onChange={(e) => setPSN(e.target.value)} />
            </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="philhealth">PhilHealth ID</label>
              <input required  type="text" name="philhealth" value={philhealth} onChange={(e) => setPhilHealth(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="license">Driver's License ID</label>
              <input type="text" name="license" value={dl} onChange={(e) => setDL(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="others">Others</label>
              <input type="text" name="others" value={others} onChange={(e) => setOthers(e.target.value)} />
            </div>
          </div>
          <p>FAMILY BACKGROUND</p>
          <div className="long-label">
            <label htmlFor="father">FATHER'S NAME</label>
            <input type="text" name="father" value={father} onChange={(e) => setFather(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="mother">MOTHER'S NAME</label>
            <input type="text" name="mother" value={mother} onChange={(e) => setMother(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="guardian">GUARDIAN</label>
            <input type="text" name="guardian" value={guardian} onChange={(e) => setGuardian(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="emergency number">EMERGENCY CONTACT PERSON</label>
            <input type="text" name="emergency number" value={emergencyContactPerson} onChange={(e) => setEmergencyContactPerson(e.target.value)} />
          </div>
          <div className="long-label">
            <label htmlFor="emergency number">EMERGENCY CONTACT NUMBER</label>
            <input type="text" name="emergency number" value={emergencyContactNumber} onChange={(e) => setEmergencyContactNumber(e.target.value)} />
          </div>
          <p>OTHER RELEVANT INFORMATION</p>
          <div className="long-label">
            <label htmlFor="physician">CERTIFYING PHYSICIAN</label>
            <input type="text" name="physician" value={physician} onChange={(e) => setPhysician(e.target.value)} />
          </div>
          <div className="long-label">
              <label htmlFor="LicenseNumber">LICENSE NUMBER</label>
              <input type="text" name="LicenseNumber" value={license} onChange={(e) => setLicense(e.target.value)} />
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="ProcessingOfficer">PROCESSING OFFICER</label>
              <input  type="text" name="ProcessingOfficer" value={processingOfficer} onChange={(e) => setProcessingOfficer(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="approvingOfficer">APPROVING OFFICER</label>
              <input  type="text" name="approvingOfficer" value={approvingOfficer} onChange={(e) => setApprovingOfficer(e.target.value)} />
            </div>
            <div className="row-label">
                  <label htmlFor="status">USER STATUS <span className="required">*</span></label>
                    <select required type="text" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option value="Select">Select</option>
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Denied">Deny</option>
                      <option value="Deactivated">Deactivate</option>
                    </select>
                </div>
                {status !== 'Active' && <div className="row-label">
              <label htmlFor="approvingOfficer">REASON/S FOR DEACTIVATION </label>
              <input  type="text" name="approvingOfficer" value={deactreason} onChange={(e) => setdeactreason(e.target.value)} />
            </div>}
          </div>
          
          <label htmlFor="encoder">UPLOAD FILES <span className="required">*</span><h6>CERTIFICATE OF INDIGENCY, BIRTH CERTIFICATE, MEDICAL CERTIFICATE OR CERTIFICATE OF PHYSICIAN</h6></label>
          <div className="upload-file">
          <div className="addPortrait">
            <label htmlFor="img">
              <img src={addPortrait} alt="Add User Portrait" width={50} height ={50} draggable = {false} />
              <span>Add User Portrait <span className="required">*</span></span>
            </label>
            <input required style={{ display: "none" }} type="file" id="img"  onChange={(e) => setPhotoURL(e.target.files[0])} accept=".png, .jpg, .jpeg"/>
          </div>
          <div className="addPortrait">
            <label htmlFor="file">
              <img src={DocUpload} alt="Add User Portrait" width={50} height ={50} draggable = {false} />
              <span>Upload files <span className="required">*</span></span>
            </label>
            <input required style={{ display: "none" }} multiple type="file" id="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf, .xlsx, .csv, .txt, .doc, .xls, .png, .jpeg, .jpg, .docx, .odt"/>
          </div>
          </div>
          
          <img onClick={() => {setIsExpanded(true)}} src = {photoURL} style = {{width: '20%', height: '20%'}}/>
          <button onClick={downloadFileFromFirebase}>APPLICATION DOCUMENTS</button>
          <button disabled={loading} onClick = {handleSubmit}>UPDATE USER</button>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong, if error persist contact your developer</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApprovingForm;
