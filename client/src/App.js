import React,{useState} from "react";
import './App.css';
import * as XLSX from "xlsx";
import axios from "axios";
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
function App() {
  const [giangvien, setgiangvien] = useState([]);
  const [monthi, setmonthi] = useState([]);
  const [users,setusers] = useState({
    firstName : '',
    lastName : '',
    fullName : '',
    email : '',
    Google_ID : '',
    image : '',
    accessToken : '',
    token_ID : ''
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
      alert("Bạn đã đăng nhập thành công!");
    }
    else{
      alert("Email của bạn không tồn tại trong cơ sở dữ liệu. Xin vui lòng đăng nhập lại!")
    }
  }
  // setUser response login with google
  const responseGoogle = (response) => {
    setusers({email : response.profileObj.email,
      fullName : response.profileObj.name,
      firstName : response.profileObj.familyName,
      lastName : response.profileObj.givenName,
      Google_ID : response.profileObj.googleId,
      image : response.profileObj.imageUrl,
      accessToken : response.accessToken,
      token_ID : response.tokenObj.id_token
    });
  };
  // clear console when logout
  const logout = () =>{
    alert("Logout Successfully!");
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
            isSignedIn={false}
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
