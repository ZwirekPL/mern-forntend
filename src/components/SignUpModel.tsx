import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { User } from "../models/user";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.module.css";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

const SignUpModel = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await NotesApi.signUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            className={stylesUtils.width100}
            type="submit"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModel;
