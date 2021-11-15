import React,{useState} from "react";
import './App.css';
import * as XLSX from "xlsx";
import axios from "axios";
function App() {
  const [giangvien, setgiangvien] = useState([]);
  const [monthi, setmonthi] = useState([]);
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
    await axios.post("http://localhost:5001/import/giangvien", { ...giangvien })
    alert("ban da nhap data giang vien thanh cong");
  };
  // post to collection monthi
  const Importt = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5001/import/monthi", { ...monthi })
    alert("ban da nhap data mon thi thanh cong");
  };
  console.log(monthi);
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
          <button>Submit</button>
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
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
