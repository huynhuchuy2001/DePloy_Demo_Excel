import React,{useState} from "react";
import './App.css';
import * as XLSX from "xlsx";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
function App() {
  const [giangvien, setgiangvien] = useState([]);
  const [monthi, setmonthi] = useState([]);
  const [user,setUser] = useState({
    firstName : '',
    lastName : '',
    userName : '',
    email : '',
    Google_ID : '',
    image : '',
    accessToken : '',
    token_ID : ''
  })
  // read excel import from giangvien
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setgiangvien(d);
    });
  };
  // read excel import from monthi
  const readExcell = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      setmonthi(d);
    });
  };
  // post to collection giangviens
  const Import = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/import/giangvien", { ...giangvien })
    alert("ban da nhap data giang vien thanh cong");
  };
  // post to collection monthi
  const Importt = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/import/monthi", { ...monthi })
    alert("ban da nhap data mon thi thanh cong");
  };
  const CreateUser = async (e) =>{
    e.preventDefault();
    await axios.post("http://localhost:5000/import/user",{...user});
    alert("Ban da dang nhap thanh cong!");
  } 
  // setUser response login with google
  const responseGoogle = (response) => {
    setUser({
      firstName : response.profileObj.familyName,
      lastName : response.profileObj.givenName,
      fullName : response.profileObj.name,
      email : response.profileObj.email,
      Google_ID : response.profileObj.googleId,
      image : response.profileObj.imageUrl,
      accessToken : response.Zb.access_token,
      token_ID : response.tokenId
    })
    // console.log(response)
  };
  // clear console when logout
  const logout = () =>{
    alert("Logout Successfully!");
    console.clear();
  }
  return (
    <div className = "">
      <div className = "text">
        <span className = "name">Import Giảng Viên</span>
        <form onSubmit = {Import}>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
            }}
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div className = "textt">
        <span className = "namee">Import Môn Thi</span>
        <form onSubmit = {Importt}>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcell(file);
            }}
          />
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <div className = "login">
        <div className = "texttt">
          <span>Login With Google</span>
        </div>
          <GoogleLogin
              clientId="843229411433-dce21ks6062giislln1ndmer3voocdfp.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          <GoogleLogout
            className = "logout"
            clientId="843229411433-dce21ks6062giislln1ndmer3voocdfp.apps.googleusercontent.com"
            buttonText="Logout"
            onLogoutSuccess={logout}
          >
          </GoogleLogout>
          <form onSubmit = {CreateUser}>
            <button>Submit</button>
          </form>
      </div>
    </div>
  );
}

export default App;
