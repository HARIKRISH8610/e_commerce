import React, { useEffect, useState } from "react";
import "./style.css";
import Input from "../../utils/input/Input";
import Label from "../../utils/label/label";
import Button from "../../utils/button/Button";
import axios from "axios";

function Dashboard() {
  const [crudData, setCrudData] = useState({
    name: "",
    message: "",
    place: "",
    count: "",
  });
  const [apiData, setApiData] = useState(false);
  const [create, setCreate] = useState(false);
  const [patchId, setPatchId] = useState(false);

  const fnSubmit = () => {
    axios
      .post(`http://localhost:5000/api/v1/crud`, crudData)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/crud`).then((resp) => {
      console.log("initial response", resp);
      setApiData(resp.data.data);
    });
  }, []);
  useEffect(() => {
    if (patchId) {
      axios
        .get(`http://localhost:5000/api/v1/crud/${patchId}`)
        .then((resp) => {
          setCrudData(resp.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [patchId]);
  //   axios
  //   .put(`http://localhost:5000/api/v1/crud/${patchId}`, crudData)
  //   .then((resp) => console.log(resp))
  //   .catch((err) => console.log(err));
  return (
    <div>
      <h4>CRUD</h4>
      {!create && (
        <>
          <div className="flex-d justify-content-end mr-20">
            <Button
              name="Create"
              className="primary"
              onClick={() => setCreate(true)}
            />
          </div>
          <div className="p-3">
            {apiData && (
              <table className="table_crud">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Message</th>
                    <th>Count</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData &&
                    apiData.map((data, i) => (
                      <tr key={i + 2}>
                        <td>{data.name}</td>
                        <td>{data.place}</td>
                        <td>{data.message}</td>
                        <td>{data.count}</td>
                        <td>
                          <Button
                            name="Edit"
                            className="primary"
                            onClick={() => {
                              setCreate(true);
                              setPatchId(data._id);
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            name="Delete"
                            className="danger"
                            // onClick={() => setCreate(true)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
      {create && (
        <>
          <div className="crud_input_div">
            <div className="crud_inner_div">
              <div className="crud_input">
                <Label name="Name :" />
                <Input
                  type="text"
                  value={crudData.name}
                  onChange={(e) =>
                    setCrudData({ ...crudData, name: e.target.value })
                  }
                />
                <Label name="Message :" />
                <Input
                  type="text"
                  value={crudData.message}
                  onChange={(e) =>
                    setCrudData({ ...crudData, message: e.target.value })
                  }
                />
              </div>
              <div className="crud_input">
                <Label name="Place :" />
                <Input
                  type="text"
                  value={crudData.place}
                  onChange={(e) =>
                    setCrudData({ ...crudData, place: e.target.value })
                  }
                />
                <Label name="Count :" />
                <Input
                  type="number"
                  value={crudData.count}
                  onChange={(e) =>
                    setCrudData({ ...crudData, count: e.target.value })
                  }
                />
                <div className="flex-d  mt-10">
                  <Button
                    name="Submit"
                    className="primary mr-10"
                    onClick={() => fnSubmit()}
                  />
                  <Button
                    name="Cancel"
                    className="secondary"
                    onClick={() => setCreate(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
