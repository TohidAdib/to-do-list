import axios from "axios";
import React, { Component } from "react";
import { useParams } from "react-router-dom";

class Post extends Component {
  state = {
    list: [],
    errors: [],
  };
  async componentDidMount() {
    const { id } = this.props.params;
    try {
      const response = await axios.get(`http://127.0.0.1:8080/list/${id}/`);
      this.setState({ list: response.data });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.setState({ errors: ["ther is no such a content"] });
      } else {
        this.setState({ errors: ["somthings wrong try again later"] });
      }
      // Handle error state or show error message
    }
  }
  render() {
    return (
      <div className="container">
        {this.state.errors.length == 0 ? (
          <div className="row">
            <div className="col-12 my-5 mx-auto d-flex flex-column justify-content-center align-items-center">
              <h1 className="mb-4 bg-light p-2 rounded-2 border-bottom border-dark shadow">
                {this.state.list.titel}
              </h1>
              <p className="h5 bg-light-subtle rounded-1 shadow">
                {this.state.list.descriptiopn}
              </p>
            </div>
          </div>
        ) : (
          <ul className="col-12 p-2 error">
            {this.state.errors.map((m) => (
              <li>{m}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const PostWrapper = (props) => {
  const params = useParams();
  return <Post {...props} params={params} />;
};

export default PostWrapper;
