import React, { useEffect, useState } from "react";
import addPortrait from "../img/userIcon.png";
import DocUpload from '../img/document-file-page-paper-sheet-up-upload-icon-3.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import MDSW from '../img/DSWD-Logo.png'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import emailjs from '@emailjs/browser';
const AdminForm = ({}) => {


  const { currentUser } = useContext(AuthContext);
  const date = new Date();
  const year = date.getFullYear();
  const createdate = date.toLocaleDateString()
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userID, setUserID] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landlineNumber, setLandlineNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState('');
  const [address, setAddress] = useState('');
  const [typeOfDisability, setTypeOfDisability] = useState([]);
  const [causeOfDisability, setCauseOfDisability] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [sss, setSSS] = useState('n/a');
  const [gsis, setGSIS] = useState('n/a');
  const [pagibig, setPagibig] = useState('n/a');
  const [psn, setPSN] = useState('n/a');
  const [philhealth, setPhilHealth] = useState('n/a');
  const [dl, setDL] = useState('n/a');
  const [others, setOthers] = useState('n/a');
  const [father, setFather] = useState('n/a');
  const [mother, setMother] = useState('n/a');
  const [guardian, setGuardian] = useState('n/a');
  const [batchCode, setBatchCode] = useState(year);
  const [disabilityCode, setDisabilityCode] = useState('n/a');
  const [physician, setPhysician] = useState('n/a');
  const [license, setLicense] = useState('n/a');
  const [processingOfficer, setProcessingOfficer] = useState('n/a');
  const [approvingOfficer, setApprovingOfficer] = useState('n/a');
  const [encoder, setEncoder] = useState('n/a');
  const [specDis, setSpecDis] = useState('n/a');
  const [occupation, setOccupation] = useState('n/a');
  const [emergencyContactPerson, setEmergencyContactPerson] = useState('n/a');
  const [emergencyContactNumber, setEmergencyContactNumber] = useState('n/a');
  const [image, setImage] = useState(''); // not yet implemented as image upload was set as file for default in the recent update.
  const [file, setFile] = useState('');
  const [street, setStreet] = useState('')
  const [barangay, setBarangay] = useState('')
  const navigate = useNavigate();
  

  

  const generateNumbers = () => {
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    setUserID(randomNumber.toString());
  };

  useEffect(() => {
    generateNumbers()
    if (!currentUser) {
      navigate('/')
    }
  },[])
  
  
console.log(file)


const handleSubmit = async(e) => {
  setLoading(true);
  e.preventDefault();
  


  console.log(file)
  console.log('he');
  console.log(file)
  
      if (
        fullName.length === 0 ||
        email.length === 0 ||
        phoneNumber.length === 0 ||  
        birthDate === '' || 
        sex === 'Select Sex' || 
        typeOfDisability.length === 0 || 
        causeOfDisability.length === 0 || 
        highestEducation === 'Select' || 
        employmentStatus ===  'Select'||  
        disabilityCode.length === 0 ||
        image.length === 0 ||
        barangay.length === 0 ||
        street.length === 0) {
  alert('Please fill in all the required fields')
  setLoading(false);
  }else {
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, userID);
      const date = new Date().getTime();
      const imageStorageRef = ref(storage, `${fullName + date}`);
      const fileStorageRef = ref(storage, `${fullName + date}-file`);
    
      await Promise.all([
        uploadBytesResumable(imageStorageRef, image),
        uploadBytesResumable(fileStorageRef, file)
      ]);
    
      const [imageUrl, fileUrl] = await Promise.all([
        getDownloadURL(imageStorageRef),
        getDownloadURL(fileStorageRef)
      ]);
    
      await updateProfile(res.user, {
        displayName: fullName,
        photoURL: imageUrl
      });
    
      const userDocRef = doc(db, "users", res.user.uid);
      await setDoc(userDocRef, {
        uid: res.user.uid,
        date: createdate,
        year: year.toString(),
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
        specDis: specDis,
        emergencyContactPerson: emergencyContactPerson,
        emergencyContactNumber: emergencyContactNumber,
        Status : "New Application",
        userType: "app-account",
        photoURL: imageUrl,
        file: fileUrl,
      });
    
      await setDoc(doc(db, "userChats", res.user.uid), {});
      localStorage.setItem("formSubmitted", "true");
        emailjs.send('service_j9gk41l', 'template_lxnk7kh', {
          to_name: fullName,
          to_email: email,
          from_name: 'Labrador PWD',
        }, '_YQcAYq48tPDPYaZ7')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
      navigate("/form/Submitted");

    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
      alert('Successfully added user')
    }
  }

}

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
        {/* <Header/> */}
  <div className="formWrapper">
    <div className="LabelWrapper">
      <form onSubmit={handleSubmit}>
      <div className="formlogo">
          <img src={MDSW} width = {150} draggable = {false}/>
        </div>
        <h1 className="pageTitle">Application form</h1>
        
        <p>PERSONAL INFORMATION</p>
        <div className="FootForm">
          <div className="long-label">
            <label htmlFor="name">Full Name <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
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
                  <label htmlFor="disabilityCode">disablity code <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
                    <select required type="text" name="disabilityCode" value={disabilityCode} onChange={(e) => setDisabilityCode(e.target.value)}>
                      <option value="Select">Select</option>
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
              <label htmlFor="email">Email <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
              <input placeholder="example@example.com" required type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="contact">Phone Number <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
              <input placeholder="09xxxxxxxxx" required type="tel" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="contact">Landline Number</label>
              <input placeholder="(075) 123 1234" type="tel" name="landlineNumber" value={landlineNumber} onChange={(e) => setLandlineNumber(e.target.value)} />
            </div>
          </div>
          <div className="HeadForm">
            <div className="row-label">
              <label htmlFor="birthday">Birth Date <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
              <input required type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="gender">Gender <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
              <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Others</option>
              </select>
            </div>
          </div>
          <div className="HeadForm">
          <div className="row-label">
            <label htmlFor="address">Home Address<span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
            <input placeholder="House No./Apartment/building/Street/" required name="address" value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div className="row-label">
            <label htmlFor="barangay/town">Barangay/Town<span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
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
                  <label htmlFor="typeOfDisability">Type of  Disability <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
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
            <label htmlFor="specDis">Specificy Disability <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
            <input placeholder="E.g. Leg Trauma,…" required  type="text" name="specDis" value={specDis} onChange={(e) => setSpecDis(e.target.value)} />
          </div>
          <div className="row-label">
            <label htmlFor="causeOfDisability">Cause of Disability <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
            <input placeholder="e.g. Accident,…" required type="text" name="causeOfDisability" value={causeOfDisability} onChange={(e) => setCauseOfDisability(e.target.value)} />
          </div>
          </div>
          <div className="long-label">
            <label htmlFor="status">Highest Educational Attainment <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
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
              <label htmlFor="occupation">Occupation <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
              <input placeholder="E.g. Occupation,…" required  type="text" name="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} />
            </div>
            <div className="row-label">
              <label htmlFor="status">Status of Employment <span className="required">*</span><h6 className="tooltiptext">section required</h6></label>
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
              <label htmlFor="encoder">ENCODER</label>
              <input type="text" name="encoder" value={encoder} onChange={(e) => setEncoder(e.target.value)} />
            </div>
          </div>
          
          <label htmlFor="encoder">UPLOAD FILES <span className="required">*</span><h6>CERTIFICATE OF INDIGENCY, BIRTH CERTIFICATE, MEDICAL CERTIFICATE OR CERTIFICATE OF PHYSICIAN</h6></label>
          <div className="upload-file">
          <div className="addPortrait">
            <label htmlFor="img">
              <img src={addPortrait} alt="Add User Portrait" width={50} height ={50} draggable = {false} />
              <span>Add User Portrait <span className="required">*</span></span>
            </label>
            <input required style={{ display: "none" }} type="file" id="img" onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpg, .jpeg"/>
          </div>
          <div className="addPortrait">
            <label htmlFor="file">
              <img src={DocUpload} alt="Add User Portrait" width={50} height ={50} draggable = {false} />
              <span>Upload files <span className="required">*</span></span>
            </label>
            <input required style={{ display: "none" }}  type="file" id="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf, .xlsx, .csv, .txt, .doc, .xls, .png, .jpeg, .jpg, .docx, .odt"/>
          </div>
          </div>
          <button disabled={loading} onClick = {handleSubmit}>ADD USER</button>
          </div>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong, if error persist contact your developer</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
