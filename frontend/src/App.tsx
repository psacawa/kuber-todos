import React from "react";
import { useCreateTodo, useDeleteTodo, useTodos } from "./client";
import {
  Button,
  CircularProgress,
  makeStyles,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Grid,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { TextField } from "formik-material-ui";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useQueryClient } from "react-query";

const useStyles = makeStyles(() => ({
  app: {
    margin: "auto",
  },
}));

function App() {
  const todoQuery = useTodos();
  const queryClient = useQueryClient();
  const deleteTodo = useDeleteTodo();
  const classes = useStyles();
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={6}>
          {todoQuery.isLoading ? (
            <CircularProgress />
          ) : (
            <List className={classes.app}>
              {todoQuery.data!.map((todo, idx) => (
                <ListItem key={idx}>
                  <ListItemText>{todo.text}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={(ev: React.MouseEvent<{}>) => {
                        deleteTodo.mutate({ id: todo.id });
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          <Grid container justify="center">
            <TodoSubmitForm />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

const validationSchema: yup.SchemaOf<{ text: string }> = yup.object().shape({
  text: yup.string().label("Todo").required(),
});

const TodoSubmitForm = () => {
  const createTodo = useCreateTodo();
  const queryClient = useQueryClient();
  return (
    <Formik
      initialValues={{ text: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, bag) => {
        bag.setSubmitting(true);
        await createTodo.mutateAsync(values);
        queryClient.invalidateQueries("todos");
        bag.setSubmitting(false);
        bag.resetForm();
      }}
    >
      <Form>
        <Field component={TextField} name="text" id="text"></Field>
        <Button type="submit">Submit</Button>
        {createTodo.isLoading && <CircularProgress />}
      </Form>
    </Formik>
  );
};

export default App;
