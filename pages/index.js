import Head from "next/head";
import Image from "next/image";
import { useReducer, useState } from "react";
import {
  FormGroup,
  Input,
  Label,
  Button,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import styles from "../styles/Home.module.css";

const defaultRegister = {
  name: "",
  phone: "",
  year: "",
  make: "",
  model: "",
  trim: "",
};

const reducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "form":
      newState[action.name] = action.value;
      return { ...newState };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, defaultRegister);
  const [modalLive, setModal] = useState(false);

  const handleFormChange = (input) => {
    dispatch({
      type: "form",
      name: input.target.name,
      value: input.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(state),
    }).then(() => {
      setModal(true);
    });
  };

  return (
    <>
      <Head>
        <title>Momentum Church Ministry</title>
      </Head>
      <div className={styles.heroContainer}>
        <div className={styles.imgContainer}>
          <Image src="/hero.jpg" layout="fill" />
        </div>
        <div className={styles.logoContainer}>
          <a href="#form" className={`${styles.button} btn`}>
            Register Vehicle
          </a>
        </div>
      </div>
      <div className={styles.register} id="form">
        <form
          className={styles.registerForm}
          onChange={handleFormChange}
          onSubmit={onSubmit}
        >
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input type="text" id="name" value={state.name} name="name" />
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone:</Label>
            <Input type="tel" id="phone" value={state.phone} name="phone" />
          </FormGroup>
          <FormGroup>
            <Label for="year">Year:</Label>
            <Input type="text" id="year" value={state.year} name="year" />
          </FormGroup>
          <FormGroup>
            <Label for="make">Make:</Label>
            <Input type="text" id="make" value={state.make} name="make" />
          </FormGroup>
          <FormGroup>
            <Label for="model">Model:</Label>
            <Input type="text" id="model" value={state.model} name="model" />
          </FormGroup>
          <FormGroup>
            <Label for="trim">Trim:</Label>
            <Input type="text" id="trim" value={state.trim} name="trim" />
          </FormGroup>
          <button className={`${styles.button} btn`}>Register Vehicle</button>
        </form>
        {modalLive && (
          <Modal
            isOpen={true}
            toggle={() => {
              setModal(false);
            }}
          >
            <ModalHeader
              toggle={() => {
                setModal(false);
              }}
            >
              {"You're Registered!"}
            </ModalHeader>
            <ModalBody>
              Thank you, {state.name}, for giving use an opportunity to serve!
              <br />
              <br />
              <br />
              If you have any questions, Contact Andrea Williams. <br />
              <a href="tel:2522597780">(252) 259 -7780</a>
              <br />
              See you October 1st at 10:00 am.
            </ModalBody>
          </Modal>
        )}
      </div>
    </>
  );
}
