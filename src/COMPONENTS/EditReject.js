import React, { useState,useEffect } from "react";
import styles from "../CSS/EditArticle.module.scss";
import Navbar from "./Navbar";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import categories from "../Masters/Categories";
import Multiselect from "multiselect-react-dropdown";

const EditArticle = () => {
  const location = useLocation();
  // console.log(location.state);

  const navigate = useNavigate();

  ///////////////////////////////// To take user input ///////////////////////////////////////

  let initialValues = {
    _id: location?.state._id,
    category: location?.state.category,
    title: location?.state.title,
    sub_heading: "Sub Heading",
    short_details: location?.state.short_details,
    body: location?.state.body,
    image: location?.state.image,
    url: location?.state.url,
    tags: location?.state.tags,
    news_priority: location?.state.news_priority,
    news_sections: "newsSection",
    change_byline: false,
    author_name: location?.state.author_name,

    source: location?.state.source,
  };

  const [values, setValues] = useState(initialValues);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////// To send Update request ///////////////////////////////////////

  const UpdateHandeler = () => {
    let formdata = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (key === "tags") {
          formdata.append(key, JSON.stringify(selectedTags));
        } else{
        formdata.append(key, values[key]);
        }
      }
    }
    // console.log(values);
    // console.log(formdata);
    axios({
      method: "put",
      url: `http://174.138.101.222:8080/UpdateArticle`,
      data: values,
      // headers: {
      //   "content-type": "multipart/form-data",
      // },
    })
      .then(async (response) => {
        alert(response.data.message);
        navigate("/news-approval");
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };
  ///////////////////////////////// To send axios request ///////////////////////////////////////








///////////////////////////// /////get api getmastercategories/////////////////////////////////////////////////////////////

const [category, setCategory] = useState([]);
useEffect(() => {
  fetch("http://174.138.101.222:8080/getmastercategories").then((result) => {
    result.json().then((resp) => {
      setCategory(resp.data);
    });
  });
}, []);
console.log(category);

////////////////////////////////////////////////// /////get api getmastercategories/////////////////////////////////////////////////////////////












/////////////////////get api tag///////////////////////////////////////////////////


const [tags, setTags] = useState([]);

useEffect(() => {
  const getcountrydata = async () => {
    const getcountryname = [];

    const reqData = await fetch("http://174.138.101.222:8080/getmastertag");
    const resData = await reqData.json();
    // console.log(resData.data);
    // setCountry(resData.data)

    for (let i = 0; i < resData.data.length; i++) {
      getcountryname.push(resData.data[i].tag_name);
    }

    setTags(getcountryname);

    // console.log(getcountryname);
  };

  getcountrydata();
}, []);

// //  ///////////////////////// /////////////////////get api tag///////////////////////////////////////////////////








  return (
    <>
      <Navbar />
      <div className="parentContainer">
        <h1>
          <span onClick={() => navigate(-1)} className="pointer">
            <HiOutlineArrowSmallLeft />
          </span>
          <span>Edit Reject</span>
        </h1>

        <FormControl className="FormControl">
          <InputLabel
            style={{ fontFamily: "Rooboto" }}
            id="demo-simple-select-helper-label"
          >
            Categories
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            placeholder="Category"
            name="category"
            style={{ fontFamily: "Rooboto" }}
            value={values.category}
            onChange={handleInputChange}
          >
            {category.map((item) => {
              return (
                <MenuItem value={item.categories_Name_English}>
                  {item.categories_Name_English}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className="ckeditor FormControl">
          <p className="cktitle ">Title *</p>
          <CKEditor
            editor={Editor}
            config={{
              fontFamily: {
                options: [
                  "default",
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                  "bhaskar, chanakya",
                ],
              },
              language: "en",
            }}
            data={values.title}
            name="title"
            value={values.title}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                title: data,
              });
            }}
          />
        </div>

        <div className="ckeditor">
          <p className="cktitle">Summary / Short Details *</p>
          <CKEditor
            editor={Editor}
            config={{
              fontFamily: {
                options: [
                  "default",
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                  "bhaskar, chanakya",
                ],
              },
            }}
            data={values.short_details}
            name="short_details"
            value={values.short_details}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                short_details: data,
              });
            }}
          />
        </div>
        <div className={(styles.ckeditorBody, styles.ckeditor)}>
          <p className="cktitle">Body *</p>
          <CKEditor
            editor={Editor}
            config={{
              fontFamily: {
                options: [
                  "default",
                  "Ubuntu, Arial, sans-serif",
                  "Ubuntu Mono, Courier New, Courier, monospace",
                  "bhaskar, chanakya",
                ],
              },
            }}
            data={values.body}
            name="body"
            value={values.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setValues({
                ...values,
                body: data,
              });
            }}
          />
        </div>

        <img
          src={location.state.image}
          style={{
            height: "300px",
            width: "92%",
            objectFit: "contain",
            margin: "auto",
            border: "1px solid black",
          }}
        />

        {/* <TextField
            id="outlined-basic"
            variant="outlined"
            type="file"
            className="FormControl"
            label="Image"
            // value={values.image}
            name="image"
            onChange={handleInputChange}
          /> */}

        <TextField
          id="outlined-basic"
          className="FormControl"
          label="Url"
          variant="outlined"
          name="url"
          value={values.url}
          onChange={handleInputChange}
        />
        {/* <TextField
          id="outlined-basic"
          label="Tags/Keywords"
          variant="outlined"
          className="FormControl"
          name="tags"
          value={values.tags}
          onChange={handleInputChange}
        /> */}
        <FormControl className="FormControl" method="post">
           <InputLabel
            style={{ fontFamily: "Rooboto" }}
            id="demo-simple-select-helper-label"
          >
          </InputLabel> 
          {/* <Select
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Tag"
            placeholder="Tags/Keywords"
            name="tags"
            style={{ fontFamily: "Roboto" }}
            // multiple // Enable multiple selections
            value={values.data}
            // value={selectedTags} // Set the selected tags from state
            onChange={handleInputChange}
          >
            {data?.data?.map((item) => (
              <MenuItem key={item._id} value={item.tag_name}>
                {item.tag_name}
              </MenuItem>
            ))}
          
         </Select>    */}

          {/* <Multiselect
            isObject={false}
            onRemove={(event) => {
              console.log(event);
            }}
            onSelect={(event) => {
              console.log(event);
            }}
            options={tags}
            showCheckbox
            // labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Tag"
            placeholder="Tags/Keywords"
            name="tags"
            style={{ fontFamily: "Roboto" }}
            // multiple // Enable multiple selections
            value={values.tags}
            // value={selectedTags} // Se t the selected tags from state
            onChange={handleInputChange}
          ></Multiselect> */}
          <Multiselect
            isObject={false}
            onSelect={(selectedList) => setSelectedTags(selectedList)}
            onRemove={(selectedList) => setSelectedTags(selectedList)}
            options={tags}
            showCheckbox 
            value={selectedTags}
            
          />
        </FormControl>
        <FormControl className="FormControl">
          <InputLabel id="demo-simple-select-helper-label">
            News Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="PLATFORM"
            name="news_priority"
            value={values.news_priority}
            onChange={handleInputChange}
          >
            <MenuItem value={"Breaking"}>Breaking</MenuItem>
            <MenuItem value={"Imported"}>Imported</MenuItem>
            <MenuItem value={"Normal"}>Normal</MenuItem>
            <MenuItem value={"Feature"}>Feature</MenuItem>
          </Select>
        </FormControl>

        {values.change_byline ? (
          <TextField
            id="outlined-basic"
            label="Author  Name"
            variant="outlined"
            className="FormControl"
            name="author_name"
            value={values.author_name}
            onChange={handleInputChange}
          />
        ) : (
          <FormControl className="FormControl">
            <InputLabel id="demo-simple-select-helper-label">
              Change Byline
            </InputLabel>

            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Change Byline"
              name="change_byline"
              value={values.change_byline}
              onChange={handleInputChange}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        )}

        <TextField
          id="outlined-basic"
          label="Source"
          className="FormControl"
          variant="outlined"
          name="source"
          value={values.source}
          onChange={handleInputChange}
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="News Sections"
          className=" FormControl"
        />

        <Button
          variant="contained"
          className="FormControl "
          onClick={() => {
            UpdateHandeler();
          }}
        >
          Update Reject
        </Button>
      </div>
    </>
  );
};

export default EditArticle;
