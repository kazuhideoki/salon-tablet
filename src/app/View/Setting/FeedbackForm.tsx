import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ContactMail } from "@material-ui/icons";
//@ts-ignore
import { signin, signout, useSession, getSession } from "next-auth/client";
import { useUpdateUser } from "../../ActionCreator/user/useUpdateUser";
import { Store } from "../../Store/Store";
import { EditorContext } from "../../Store/EditorContext";
import { Divider, ListItem } from "@material-ui/core";
import { useSubmitFeedback } from "../../ActionCreator/useSubmitFeedback";
// import { T_submit_feedback } from "../../../pages/api/submit_feedback";

const useFeedbackFormProps = () => {
  const [contactFormTitle, setContactFormTitle] = React.useState('')
  const [contactFormContent, setContactFormContent] = React.useState('');
  const submitFeedback = useSubmitFeedback()

  const handleOnSubmit = async () => {
    // const result: T_submit_feedback = await submitFeedback({
    //   contactFormTitle,
    //   contactFormContent,
    // });
    const result = await submitFeedback({ contactFormTitle, contactFormContent });
    // console.log("FeedbackForm.tsxのresultは " + result);
    console.log("FeedbackForm.tsxのresultは " + result);
    

    // if (result.sent === true) {
    if (result.sent === true) {
      alert('送信されました。')
      setContactFormTitle('')
      setContactFormContent('')
    } else {
      alert("送信に失敗しました。");
    }
    // 完了したら 「完了メッセージ」と「フォーム消す」
  }

  return {
    contactFormTitle,
    setContactFormTitle,
    contactFormContent,
    setContactFormContent,
    handleOnSubmit,
  };
}

type Props = ReturnType<typeof useFeedbackFormProps>

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  content: {
    height: 300,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const FeedbackFormPresenter:React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ContactMail />
        </Avatar>
        <Typography component="h1" variant="h5">
          コンタクトフォーム
        </Typography>
        <Typography component="h2" variant="h6" color="primary">
          質問や要望、改善案など何でも気軽にメッセージください。
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="contact_form_title"
                label="タイトル"
                name="contact_form_title"
                value={props.contactFormTitle}
                onChange={(e) => props.setContactFormTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // className={classes.content}
                multiline
                rows={6}
                name="contact_form_content"
                variant="outlined"
                fullWidth
                id="contact_form_content"
                label="内容"
                value={props.contactFormContent}
                onChange={(e) => props.setContactFormContent(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => props.handleOnSubmit()}
            // disabled={}
          >
            送信
          </Button>
        </form>
      </div>
    </Container>
  );
}

export const FeedbackForm = () => {
  const props = useFeedbackFormProps();
  return <FeedbackFormPresenter {...props} />;
};