import axios from "axios";
import React, { Component } from "react";
import "../components/static/css/todolist.css";
import * as yup from "yup";
import { createRef } from "react";
import { Link } from "react-router-dom";

class ToDoList extends Component {
  state = {
    list: [],
    errors: [],

    data: {
      titel: "",
      descriptiopn: "",
    },
    updatedData: {
      titel: "",
      descriptiopn: "",
    },
  };

  async componentDidMount() {
    try {
      const response = await axios.get("http://127.0.0.1:8080/list/");
      this.setState({ list: response.data });
    } catch (error) {
      this.setState({
        errors: ["there is a problem here please try again later !"],
      });
    }
  }

  schema = yup.object().shape({
    titel: yup.string().required("the titel field can not be empty !"),
    descriptiopn: yup
      .string()
      .required("the descriptiopn field can not be empty !"),
  });

  validate = async () => {
    try {
      const result = await this.schema.validate(this.state.data, {
        abortEarly: false,
      });
      return result;
    } catch (error) {
      this.setState({ errors: error.errors });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const result = await this.validate();
    if (result) {
      try {
        await axios.post("http://127.0.0.1:8080/list/", result);
        const response = await axios.get("http://127.0.0.1:8080/list/");
        if (response){
          this.setState({
            list: response.data,
            data: { titel: "", descriptiopn: "" },
          });
        }
        this.setState({ errors: [] });
      } catch (error) {
        this.setState({
          errors: ["Failed to submit the form. Please try again."],
        });
      }
    }
  };

  handelChange = (e) => {
    const input = e.currentTarget;
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };
  handelChangeForUpdate = (e) => {
    const input = e.currentTarget;
    const updatedData = { ...this.state.updatedData };
    updatedData[input.name] = input.value;
    this.setState({ updatedData });
  };

  handelCheck = async (e) => {
    const input = e.currentTarget;
    if (input.checked) {
      input.closest(".box").remove();
      const id = input.getAttribute("pk");
      await axios.delete(`http://127.0.0.1:8080/list/${id}/`);
    }
  };

  handleSearch = (e) => {
    const input = e.currentTarget;
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      const title = box.querySelector(".hed").innerText;
      if (title.includes(input.value)) {
        box.classList.replace("display_none", "display_block");
      } else {
        box.classList.replace("display_block", "display_none");
      }
    });
  };

  update = async (e) => {
    const input = e.currentTarget;
    const copyInput = input.cloneNode(true);
    console.log(copyInput);
    const parent = input.closest(".box");
    input.remove();

    const nDiv = document.createElement("div");
    nDiv.classList.add("col-6");
    nDiv.classList.add("update_box");

    const nInputTitel = document.createElement("input");
    nInputTitel.classList.add("form-control");
    nInputTitel.classList.add("mt-2");
    nInputTitel.name = "titel";
    nInputTitel.value = this.state.updatedData.titel;
    nInputTitel.addEventListener("change", this.handelChangeForUpdate);

    const nInputDescriptiopn = document.createElement("textarea");
    nInputDescriptiopn.classList.add("form-control");
    nInputDescriptiopn.classList.add("my-2");
    nInputDescriptiopn.name = "descriptiopn";
    nInputDescriptiopn.value = this.state.updatedData.descriptiopn;
    nInputDescriptiopn.addEventListener("change", this.handelChangeForUpdate);

    const nBtn = document.createElement("button");
    nBtn.innerText = "send";
    nBtn.classList.add("btn");
    nBtn.classList.add("btn-primary");
    nBtn.classList.add("mt-3");
    nBtn.addEventListener("click", async (e) => {
      const id = parent.getAttribute("pk");
      const result = this.state.updatedData;
      try {
        await axios.put(`http://127.0.0.1:8080/list/${id}/`, result);
        const response = await axios.get("http://127.0.0.1:8080/list/");
        this.setState({
          list: response.data,
          updatedData: { titel: "", descriptiopn: "" },
        });
        this.setState({ errors: [] });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.setState({
            errors: ["please enter a valid titel or descriptiopn"],
          });
        } else {
          this.setState({ errors: ["somthings wrong try again later"] });
        }
      }
      nDiv.remove();
      copyInput.addEventListener("click", this.update);
      parent.appendChild(copyInput);
    });

    const nBtnExit = document.createElement("button");
    nBtnExit.innerText = "cancel";
    nBtnExit.classList.add("btn");
    nBtnExit.classList.add("btn-danger");
    nBtnExit.classList.add("mt-3");
    nBtnExit.classList.add("mx-3");
    nBtnExit.addEventListener("click",(e)=>{
        nDiv.remove();
        copyInput.addEventListener("click", this.update);
        parent.appendChild(copyInput);
    })

    nDiv.appendChild(nInputTitel);
    nDiv.appendChild(nInputDescriptiopn);
    nDiv.appendChild(nBtn);
    nDiv.appendChild(nBtnExit);
    parent.appendChild(nDiv);
  };

  render() {
    return (
      <>
        <div className="container mt-5">
          {this.state.errors.length != 0 && (
            <ul className="col-6 mx-auto p-2 error">
              {this.state.errors.map((m) => (
                <li>{m}</li>
              ))}
            </ul>
          )}
          <div className="row d-flex flex-column">
            <div className="col-6 m-auto">
              <input
                onChange={this.handleSearch}
                className="form-control"
                id="text"
                type="text"
                placeholder="search"
              />
            </div>
            <div className="col-6 m-auto">
              {this.state.list.map((m) => (
                <div pk={m.id} className="box mt-4 display_block">
                  <div className="titel d-flex gap-2">
                    <input
                      pk={m.id}
                      onChange={this.handelCheck}
                      type="checkbox"
                    />
                    <Link to={`post/${m.id}/`} className="hed">
                      {m.titel}
                    </Link>
                  </div>
                  <div className="row">
                    <span className="cpl-6">{m.descriptiopn}</span>
                    <span className="col-6">{m.created_at}</span>
                  </div>
                  <button
                    onClick={this.update}
                    className="btn btn-success mt-3"
                    type="button"
                  >
                    update
                  </button>
                </div>
              ))}
            </div>
            <form
              onSubmit={this.handleSubmit}
              className="col-6 mx-auto mt-4 d-flex flex-column"
            >
              <div className="form-group">
                <label className="form-label" htmlFor="titel">
                  titel:
                </label>
                <input
                  value={this.state.data.titel}
                  onChange={this.handelChange}
                  name="titel"
                  id="titel"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="descriptiopn">
                  descriptiopn:
                </label>
                <textarea
                  value={this.state.data.descriptiopn}
                  onChange={this.handelChange}
                  name="descriptiopn"
                  id="descriptiopn"
                  className="form-control"
                />
              </div>
              <button
                className="btn btn-lg btn-primary my-4 align-self-center"
                type="submit"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ToDoList;
