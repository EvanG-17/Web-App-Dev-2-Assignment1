import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { getActor } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import img from '../../images/Sigma-grindset-patrick-bateman.jpeg'


const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "#55C2C3"
  };

export default function FilterActorsCard(props) {

  const { error, isLoading, isError } = useQuery("popular", getActor);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  return (
    <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "#55C2C3"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the actors.
        </Typography>
        <TextField
      sx={{...formControl}}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.nameFilter}
      onChange={handleTextChange}
    />
      </CardContent>
    </Card>
  );
}