import React,{useState} from "react";
import './App.css';
import * as XLSX from "xlsx";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
function App() {
  const [giangvien, setgiangvien] = useState([]);
  const [monthi, setmonthi] = useState([]);
  const [users,setusers] = useState({
    firstName : '',
    lastName : '',
    fullName : '',
    email : '',
    ID : '',
    image : '',
    accessToken : '',
    token_ID : '',
    Api : ''
  });
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
    alert("Bạn đã nhập data giảng viên thành công");
  };
  // post to collection monthi
  const Importt = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/import/monthi", { ...monthi })
    alert("Bạn đã nhập data môn thi thành công!");
  };
  // định dạng email
  var reg = /^([0-9]{13})+@student.tdmu.edu.vn$/i;
  const CreateUser = async (e) =>{
    e.preventDefault();
    if(reg.test(users.email)===true)
    {
      await axios.post("http://localhost:5000/import/user",{...users});
      alert("Bạn đã đăng nhập Google thành công!");
    }
    else{
      alert("Email của bạn không tồn tại trong cơ sở dữ liệu. Xin vui lòng đăng nhập lại!")
    }
  }
  // Create user login with facebook
  const LoginUser = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:5000/import/user",{...users});
    alert("Bạn đã đăng nhập Facebook thành công!")
  }
  // setUser response login with google
  const responseGoogle = (response) => {
    setusers({email : response.profileObj.email,
      fullName : response.profileObj.name,
      firstName : response.profileObj.familyName,
      lastName : response.profileObj.givenName,
      ID : response.profileObj.googleId,
      image : response.profileObj.imageUrl,
      accessToken : response.accessToken,
      token_ID : response.tokenObj.id_token,
      Api : 'Google'
    });
  };
  // clear console when logout
  const logout = () =>{
    alert("Logout Successfully!");
  };
  // serUser response login with facebook
  const responseFacebook = (response) => {
    setusers({
      email : response.email,
      fullName : response.name,
      firstName : '',
      lastName : '',
      ID : response.userID,
      image : response.picture.data.url,
      accessToken : response.accessToken,
      token_ID : response.signedRequest,
      Api : 'Facebook'
    })
  };
  return (
    <div className = "demo">
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
      <div className = "login-google">
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
            isSignedIn={false}
          >
          </GoogleLogout>
          <form onSubmit = {CreateUser}>
            <button>Submit</button>
          </form>
      </div>
      <div className ="login-facebook">
        <div className = "texttt">
          <span>Login With Facebook</span>
        </div>
        <FacebookLogin
          appId="480804935619019"
          autoLoad={true}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="my-facebook-button-class"
          icon="fa-facebook"
        />
        <form onSubmit = {LoginUser}>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
