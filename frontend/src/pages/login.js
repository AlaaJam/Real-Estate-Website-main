import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { HeaderContainer, FooterContainer } from "../containers";
import { Login as LoginBlock, Form } from "../components";
import { login } from "../redux/actions/authActions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(login(form.email, form.password));
      // redirect if you want, e.g. history.push("/dashboard")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Fragment>
      <HeaderContainer bg="false" />
      <LoginBlock>
        <LoginBlock.Container>
          <LoginBlock.Content>
            <LoginBlock.Header>
              <LoginBlock.Title>Login</LoginBlock.Title>
            </LoginBlock.Header>

            <LoginBlock.InnerContent>
              <Form onSubmit={onSubmit}>
                <Form.FormGroup>
                  <Form.Label>Email</Form.Label>
                  <Form.Input name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
                </Form.FormGroup>

                <Form.FormGroup>
                  <Form.Label>Password</Form.Label>
                  <Form.Input name="password" type="password" value={form.password} onChange={onChange} />
                </Form.FormGroup>

                {error && <p style={{ color: "crimson" }}>{error}</p>}

                <Form.FormGroup>
                  <Form.SubmitInput type="submit" value="Login" />
                </Form.FormGroup>
              </Form>
            </LoginBlock.InnerContent>

            <LoginBlock.Footer>
              <LoginBlock.Text>
                <LoginBlock.Anchor to="/forgot-password">Forgot Password?</LoginBlock.Anchor>
              </LoginBlock.Text>
              <LoginBlock.Text>
                Don’t have an account? <LoginBlock.Anchor to="/signup">Sign Up</LoginBlock.Anchor>
              </LoginBlock.Text>
            </LoginBlock.Footer>
          </LoginBlock.Content>
        </LoginBlock.Container>
      </LoginBlock>
      <FooterContainer />
    </Fragment>
  );
};

export default LoginPage;
