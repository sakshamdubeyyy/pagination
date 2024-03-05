import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableComp from './components/TableComp';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentView = data.slice(indexOfFirstRow, indexOfLastRow) 

  const getData = async () => {
    let res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
    setData(res.data);
  }

  useEffect(() => {
    getData();
  },[])

  console.log(data);

  return (
    <div className="App">
      <h3>Employee Data Table</h3>
      <div className='table'>
        <table className='tableData'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentView.map(d => (
              <tr id={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='toggle'>
        <button className='toggleButton' onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
        <span className='pageNum' key={currentPage}>{currentPage}</span>
        <button className='toggleButton' onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
